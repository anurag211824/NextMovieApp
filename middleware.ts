import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;
  
  // Define protected routes that require authentication
  const protectedRoutes = [
    '/favmovie',
    '/genre',
    '/profile',
    '/movie'
  ];
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // If it's a protected route, check for authentication
  if (isProtectedRoute) {
    // Get the authToken cookie
    const authToken = request.cookies.get('authToken');
    
    // If no auth token exists, redirect to login
    if (!authToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    
    // Verify the token is valid (not empty and properly formatted)
    try {
      const tokenValue = authToken.value;
      
      // Check if token is valid JSON and not empty
      if (!tokenValue || tokenValue.trim() === '') {
        throw new Error('Invalid token');
      }
      
      // Parse the token to verify it's valid JSON
      const username = JSON.parse(tokenValue);
      
      // Check if username exists and is not empty
      if (!username || typeof username !== 'string' || username.trim() === '') {
        throw new Error('Invalid username in token');
      }
      
      // If we get here, the token is valid - continue to the protected route
      return NextResponse.next();
      
    } catch (error) {
      // If token parsing fails, clear the invalid cookie and redirect to login
      console.log(error);
      
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('authToken');
      return response;
    }
  }
  
  // For non-protected routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};