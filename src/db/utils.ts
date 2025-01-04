// src/db/utils.ts
import { db } from './index';
import { 
  Users, 
  Calls, 
  Checkpoints,
  type User,
  type Call,
  type Checkpoint 
} from './schema';
import { eq } from 'drizzle-orm';

export const dbUtils = {
  // User operations
  async getUserById(id: number): Promise<User | undefined> {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.id, id));
    return result[0];
  },

  // Call operations
  async createCall(userId: number): Promise<Call[]> {
    return await db
      .insert(Calls)
      .values({
        userId,
        status: 'active',
        projectContext: {},
        vsCodeState: {}
      })
      .returning();
  },

  // Checkpoint operations
  async createCheckpoint(
    callId: number, 
    name: string, 
    codeState: Record<string, unknown>
  ): Promise<Checkpoint[]> {
    return await db
      .insert(Checkpoints)
      .values({
        callId,
        name,
        codeState,
        projectState: {},
        aiContext: {}
      })
      .returning();
  },
};