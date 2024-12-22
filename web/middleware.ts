import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log('Middleware executing for path:', request.nextUrl.pathname);

  // Public paths that don't require authentication
  const publicPaths = ['/auth/login', '/auth/signup'];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  try {
    const { data: session } = await betterFetch<Session>(
      "/get-session",
      {
        baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
        credentials: 'include'
      },
    );
       
    // Redirect to home if logged in and trying to access auth pages
    if (session && isPublicPath) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect to login if not logged in and trying to access protected routes
    if (!session && !isPublicPath) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    // Only redirect to login for unauthenticated errors
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);  
    }
    // For other errors, allow the request to continue
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
