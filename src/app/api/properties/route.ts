import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /api/properties — list all properties (public)
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const managerId = url.searchParams.get('managerId');

    const where = managerId ? { managerId } : {};

    const properties = await db.property.findMany({
      where,
      include: {
        manager: {
          select: { id: true, name: true, email: true, phone: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Parse images JSON for each property
    const parsed = properties.map((p) => ({
      ...p,
      images: JSON.parse(p.images),
    }));

    return NextResponse.json({ properties: parsed });
  } catch (error) {
    console.error('GET /api/properties error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

// POST /api/properties — create a new property (manager or admin only)
export async function POST(req: NextRequest) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'manager' && user.role !== 'admin')) {
      return NextResponse.json({ error: 'Недостаточно прав' }, { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      price,
      area,
      rooms,
      district,
      type,
      dealType,
      status,
      description,
      images,
      address,
      floor,
      parking,
      renovation,
      balcony,
      year,
      schools,
      gardens,
      shops,
      transport,
      parks,
      medicine,
    } = body;

    if (!title || !price || !area || !rooms || !district || !type || !description || !address) {
      return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 });
    }

    const property = await db.property.create({
      data: {
        title,
        price,
        area,
        rooms,
        district,
        type,
        dealType: dealType || 'sale',
        status: status || 'Продажа',
        description,
        images: JSON.stringify(images || []),
        address,
        floor: floor || null,
        parking: parking || null,
        renovation: renovation || null,
        balcony: balcony || null,
        year: year || null,
        schools: schools || '',
        gardens: gardens || '',
        shops: shops || '',
        transport: transport || '',
        parks: parks || '',
        medicine: medicine || '',
        managerId: userId,
      },
      include: {
        manager: {
          select: { id: true, name: true, email: true, phone: true },
        },
      },
    });

    return NextResponse.json({
      property: {
        ...property,
        images: JSON.parse(property.images),
      },
    });
  } catch (error) {
    console.error('POST /api/properties error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
