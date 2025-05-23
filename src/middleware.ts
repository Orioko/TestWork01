import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/api/auth'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));

  // Пропускаем проверку для публичных путей
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Для всех остальных путей проверяем авторизацию на клиенте
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
