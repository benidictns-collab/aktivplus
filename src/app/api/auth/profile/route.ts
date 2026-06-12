import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const data = await req.json();
    const { name, phone, email } = data;

    if (email) {
      const existing = await db.user.findUnique({ where: { email } });
      if (existing && existing.id !== userId) {
        return NextResponse.json({ error: 'Email уже занят' }, { status: 409 });
      }
    }

    const updated = await db.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
      },
    });

    const { password: _, ...safeUser } = updated;
    return NextResponse.json({ user: safeUser });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
