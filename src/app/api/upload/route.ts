import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Недопустимый формат файла. Допускаются JPEG, PNG, WebP' },
        { status: 400 }
      );
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Файл слишком большой (макс. 10 МБ)' },
        { status: 400 }
      );
    }

    // Read file as ArrayBuffer and store in PostgreSQL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageAsset = await db.imageAsset.create({
      data: {
        data: buffer,
        mimeType: file.type || 'image/jpeg',
        size: buffer.length,
      },
    });

    // Return the URL served by /api/images/[id]
    const url = `/api/images/${imageAsset.id}`;

    console.log('[upload] File saved to DB:', imageAsset.id, 'size:', buffer.length);

    return NextResponse.json({ url, id: imageAsset.id });
  } catch (error) {
    console.error('[upload] Error:', error);
    return NextResponse.json(
      { error: 'Не удалось загрузить файл' },
      { status: 500 }
    );
  }
}
