import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const messages = await db.message.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Messages GET error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: 'Текст сообщения обязателен' }, { status: 400 });

    const message = await db.message.create({
      data: {
        userId,
        text,
        fromManager: false,
      },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Messages POST error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
