import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 });
    }

    const [users, applications, messages] = await Promise.all([
      db.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: { id: true, email: true, name: true, phone: true, role: true, createdAt: true },
      }),
      db.application.findMany({
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, email: true } } },
      }),
      db.message.findMany({
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, email: true } } },
      }),
    ]);

    return NextResponse.json({ users, applications, messages });
  } catch (error) {
    console.error('Admin GET error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
