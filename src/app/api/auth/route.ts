import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { login, getCurrentUser } from '@/utils/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await login(body.email, body.password);

    const cookieStore = await cookies();
    cookieStore.set('token', response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ user: response.user });
  } catch {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await getCurrentUser(token.value);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  return NextResponse.json({ success: true });
}
