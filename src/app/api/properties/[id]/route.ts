import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /api/properties/[id] — single property
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = await db.property.findUnique({
      where: { id: parseInt(id) },
      include: {
        manager: {
          select: { id: true, name: true, email: true, phone: true },
        },
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Объект не найден' }, { status: 404 });
    }

    return NextResponse.json({
      property: {
        ...property,
        images: JSON.parse(property.images),
      },
    });
  } catch (error) {
    console.error('GET /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

// PATCH /api/properties/[id] — update property (owner manager or admin)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'manager' && user.role !== 'admin')) {
      return NextResponse.json({ error: 'Недостаточно прав' }, { status: 403 });
    }

    const { id } = await params;
    const propertyId = parseInt(id);

    const existing = await db.property.findUnique({ where: { id: propertyId } });
    if (!existing) {
      return NextResponse.json({ error: 'Объект не найден' }, { status: 404 });
    }

    // Only the manager who created it or admin can edit
    if (user.role !== 'admin' && existing.managerId !== userId) {
      return NextResponse.json({ error: 'Недостаточно прав' }, { status: 403 });
    }

    const body = await req.json();
    const updateData: any = {};

    const allowedFields = [
      'title', 'price', 'area', 'rooms', 'district', 'type', 'dealType',
      'status', 'description', 'address', 'floor', 'parking', 'renovation',
      'balcony', 'year', 'schools', 'gardens', 'shops', 'transport', 'parks', 'medicine',
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (body.images !== undefined) {
      updateData.images = JSON.stringify(body.images);
    }

    const property = await db.property.update({
      where: { id: propertyId },
      data: updateData,
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
    console.error('PATCH /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

// DELETE /api/properties/[id] — delete property (owner manager or admin)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = req.cookies.get('session_user_id')?.value;
    if (!userId) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user || (user.role !== 'manager' && user.role !== 'admin')) {
      return NextResponse.json({ error: 'Недостаточно прав' }, { status: 403 });
    }

    const { id } = await params;
    const propertyId = parseInt(id);

    const existing = await db.property.findUnique({ where: { id: propertyId } });
    if (!existing) {
      return NextResponse.json({ error: 'Объект не найден' }, { status: 404 });
    }

    if (user.role !== 'admin' && existing.managerId !== userId) {
      return NextResponse.json({ error: 'Недостаточно прав' }, { status: 403 });
    }

    await db.property.delete({ where: { id: propertyId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
