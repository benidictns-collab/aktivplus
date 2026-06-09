import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        favorites: { orderBy: { createdAt: 'desc' } },
        applications: { orderBy: { createdAt: 'desc' } },
        messages: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    const { password: _, ...safeUser } = user;

    return NextResponse.json({ user: safeUser });
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
