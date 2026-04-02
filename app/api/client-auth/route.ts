import { NextRequest, NextResponse } from 'next/server';
import {
  CLIENT_ACCESS_COOKIE,
  CLIENT_ACCESS_VALUE,
  getClientPortalPassword,
} from '@/lib/clientAccess';

const COOKIE_MAX_AGE = 60 * 60 * 12;

function createSuccessResponse() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: CLIENT_ACCESS_COOKIE,
    value: CLIENT_ACCESS_VALUE,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });

  return response;
}

function clearAccessCookie() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: CLIENT_ACCESS_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}

export async function POST(request: NextRequest) {
  const configuredPassword = getClientPortalPassword();

  if (!configuredPassword) {
    return NextResponse.json(
      { error: 'CLIENT_PORTAL_PASSWORD is not configured on the server.' },
      { status: 500 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof payload !== 'object' || payload === null || !('password' in payload)) {
    return NextResponse.json({ error: 'A password is required.' }, { status: 400 });
  }

  const { password } = payload as { password?: unknown };

  if (typeof password !== 'string' || password.trim().length === 0) {
    return NextResponse.json({ error: 'A password is required.' }, { status: 400 });
  }

  if (password !== configuredPassword) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  return createSuccessResponse();
}

export function DELETE() {
  return clearAccessCookie();
}
