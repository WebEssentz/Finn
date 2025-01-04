import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected and auth routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/call(.*)',
  '/history(.*)',
  '/settings(.*)',
  '/user(.*)',
  '/api/protected/(.*)'
]);

const isAuthRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)'
]);

const isPublicRoute = createRouteMatcher([
  '/(.*)',
  '/about(.*)',
  '/pricing(.*)',
  '/blog(.*)',
  '/docs(.*)',
  '/sso-callback(.*)',
  '/terms(.*)',
  '/privacy(.*)',
  '/api/public/(.*)'
]);

// middleware.ts
export default clerkMiddleware(async (auth, req) => {
  const session = await auth();

  // Allow sign-out callback to process
  if (req.nextUrl.pathname.startsWith('/sign-out-callback')) {
    return NextResponse.next();
  }

  // Allow SSO callback to process
  if (req.nextUrl.pathname.startsWith('/sso-callback')) {
    return NextResponse.next();
  }

  // If user is logged in and tries to access auth pages or root, redirect to dashboard
  if (session?.userId && (isAuthRoute(req) || req.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If user is not logged in and tries to access protected routes, redirect to sign-in
  if (!session?.userId && (isProtectedRoute(req))) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};