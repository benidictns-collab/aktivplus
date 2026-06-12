import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

// GET /api/users — list all users (admin only)
export async function GET(req: NextRequest) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const admin = await db.user.findUnique({ where: { id: userId } });
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 });
    }

    const users = await db.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        blocked: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { properties: true, applications: true, favorites: true },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('GET /api/users error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

// POST /api/users — create a new user (admin only)
export async function POST(req: NextRequest) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const admin = await db.user.findUnique({ where: { id: userId } });
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 });
    }

    const body = await req.json();
    const { name, email, phone, password, role } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Пароль должен быть не менее 6 символов' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Пользователь с таким email уже существует' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name: name || null,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: role || 'client',
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        blocked: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('POST /api/users error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
