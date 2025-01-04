// app/api/trial-session/route.ts
import { db } from '@/src/db';
import { TrialSessions } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { deviceId, action } = await request.json();

    if (!deviceId) {
      return NextResponse.json({ error: 'Device ID required' }, { status: 400 });
    }

    // Get existing session
    const existingSession = await db
      .select()
      .from(TrialSessions)
      .where(eq(TrialSessions.deviceId, deviceId))
      .execute();

    const session = existingSession[0];

    switch (action) {
      case 'check':
        if (!session) {
          return NextResponse.json({ 
            timeRemaining: 120,
            hasUsedTrial: false 
          });
        }

        const totalTimeUsed = session.totalTime || 0;
        if (totalTimeUsed >= 120) {
          return NextResponse.json({ 
            hasUsedTrial: true,
            message: 'Trial expired'
          });
        }

        return NextResponse.json({
          timeRemaining: 120 - totalTimeUsed,
          hasUsedTrial: false
        });

      case 'start':
        if (session) {
          // Check if existing session has time remaining
          const totalTimeUsed = session.totalTime || 0;
          if (totalTimeUsed >= 120) {
            return NextResponse.json({ 
              hasUsedTrial: true,
              message: 'Trial expired'
            });
          }

          // Resume session
          await db
            .update(TrialSessions)
            .set({ 
              startedAt: new Date(),
              pausedAt: null,
              isExpired: false
            })
            .where(eq(TrialSessions.deviceId, deviceId));

          return NextResponse.json({
            hasUsedTrial: false,
            timeRemaining: 120 - totalTimeUsed,
            message: 'Session resumed'
          });
        }

        // Create new session
        await db.insert(TrialSessions).values({
          deviceId,
          sessionHash: crypto.randomUUID(),
          startedAt: new Date(),
          totalTime: 0,
          isExpired: false,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        });

        return NextResponse.json({
          hasUsedTrial: false,
          timeRemaining: 120,
          message: 'Trial started'
        });

      case 'stop':
        if (!session) {
          return NextResponse.json({ error: 'No active session' }, { status: 400 });
        }

        const now = new Date();
        const startTime = session.startedAt ? new Date(session.startedAt) : now;
        const newTimeUsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        const totalTime = (session.totalTime || 0) + newTimeUsed;
        const isExpired = totalTime >= 120;

        await db
          .update(TrialSessions)
          .set({ 
            pausedAt: now,
            totalTime,
            isExpired
          })
          .where(eq(TrialSessions.deviceId, deviceId));

        return NextResponse.json({
          timeUsed: totalTime,
          isExpired,
          message: isExpired ? 'Trial expired' : 'Session paused'
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Trial session error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}