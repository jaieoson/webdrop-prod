// <root>/middleware.ts
import type { NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware"

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/adm')) {
    // This logic is only applied to /about
   
    
      
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // This logic is only applied to /dashboard
  }
}