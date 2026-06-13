import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // The "filename" is now an ImageAsset ID (cuid)
    // Prevent directory traversal (shouldn't happen with cuid but be safe)
    if (filename.includes('/') || filename.includes('..')) {
      return NextResponse.json({ error: 'Некорректный идентификатор' }, { status: 400 });
    }

    // Fetch image from PostgreSQL
    const imageAsset = await db.imageAsset.findUnique({
      where: { id: filename },
    });

    if (!imageAsset) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 404 });
    }

    // Return image with proper content type and caching
    return new NextResponse(imageAsset.data, {
      status: 200,
      headers: {
        'Content-Type': imageAsset.mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': imageAsset.size.toString(),
      },
    });
  } catch (error) {
    console.error('[images] Error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
