import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // Auth or other middleware logic goes here.
  // Return NextResponse.redirect(...) or NextResponse.next().
}

export const config = {
  matcher: [],
};
