import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const favorites = await db.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error('Favorites GET error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const { propertyId } = await req.json();
    if (!propertyId) return NextResponse.json({ error: 'propertyId обязателен' }, { status: 400 });

    const existing = await db.favorite.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });

    if (existing) {
      // Toggle off — remove
      await db.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ isFavorite: false });
    }

    // Toggle on — add
    await db.favorite.create({
      data: { userId, propertyId },
    });
    return NextResponse.json({ isFavorite: true });
  } catch (error) {
    console.error('Favorites POST error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const { propertyId } = await req.json();
    if (!propertyId) return NextResponse.json({ error: 'propertyId обязателен' }, { status: 400 });

    await db.favorite.deleteMany({ where: { userId, propertyId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Favorites DELETE error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
