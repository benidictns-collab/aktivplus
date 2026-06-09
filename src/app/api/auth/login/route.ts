import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
      include: {
        favorites: { orderBy: { createdAt: 'desc' } },
        applications: { orderBy: { createdAt: 'desc' } },
        messages: { orderBy: { createdAt: 'desc' } },
        properties: {
          orderBy: { createdAt: 'desc' },
          include: {
            manager: { select: { id: true, name: true, email: true, phone: true } },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 });
    }

    if (user.blocked) {
      return NextResponse.json({ error: 'Аккаунт заблокирован. Обратитесь к администратору.' }, { status: 403 });
    }

    // Return user without password, parse images JSON for properties
    const { password: _, ...safeUser } = user;
    const parsedUser = {
      ...safeUser,
      properties: (safeUser.properties || []).map((p: any) => ({
        ...p,
        images: JSON.parse(p.images),
      })),
    };

    const response = NextResponse.json({
      user: parsedUser,
      message: 'Вход выполнен успешно',
    });

    // Set a simple session cookie (httpOnly for security)
    response.cookies.set('session_user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    response.cookies.set('session_user_role', user.role, {
      httpOnly: false, // Frontend needs to read role
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
