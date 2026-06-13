import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    const upload = await db.upload.findUnique({
      where: { filename },
    });

    if (!upload) {
      return NextResponse.json({ error: 'Не найдено' }, { status: 404 });
    }

    // Decode base64 and return as image
    const buffer = Buffer.from(upload.data, 'base64');

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': upload.mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('[images] Error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
