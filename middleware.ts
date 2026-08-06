import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = [
  '/agents/live-desk',
  '/agents/callbacks',
  '/api/conversations',
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const authHeader = req.headers.get('authorization');
  const username = process.env.LIVE_DESK_USERNAME;
  const password = process.env.LIVE_DESK_PASSWORD;

  if (!username || !password) {
    return new NextResponse('Authentication not configured', { status: 503 });
  }

  if (authHeader) {
    const base64 = authHeader.replace('Basic ', '');
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    const [u, p] = decoded.split(':');
    if (u === username && p === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="AMA Migrant Desk Agent Portal"',
    },
  });
}

export const config = {
  matcher: [
    '/agents/live-desk/:path*',
    '/agents/callbacks/:path*',
    '/api/conversations/:path*',
  ],
};
