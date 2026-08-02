import { NextRequest, NextResponse } from 'next/server';

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="AMA Migrant Desk - Live Desk (staff only)"' },
  });
}

export function middleware(request: NextRequest) {
  const username = process.env.LIVE_DESK_USERNAME;
  const password = process.env.LIVE_DESK_PASSWORD;

  // If credentials aren't configured, fail closed rather than leaving
  // the staff conversation log open to the public.
  if (!username || !password) {
    return unauthorized();
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Basic ')) {
    return unauthorized();
  }

  const decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8');
  const separatorIndex = decoded.indexOf(':');
  const providedUser = decoded.slice(0, separatorIndex);
  const providedPass = decoded.slice(separatorIndex + 1);

  if (providedUser !== username || providedPass !== password) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/live-desk/:path*', '/api/conversations/:path*'],
};
