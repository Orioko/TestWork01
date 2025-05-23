import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { username, password } = data;

  if (username === 'test' && password === 'test') {
    return NextResponse.json({
      token: 'mock-jwt-token',
      user: { name: 'John Doe', email: 'john.doe@example.com' },
    });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
