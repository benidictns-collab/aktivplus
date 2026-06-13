import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';

// Upload directory — matches upload route
const UPLOAD_DIR = process.env.UPLOAD_DIR || join(process.cwd(), 'upload');

// MIME type map
const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // Prevent directory traversal attacks
    if (filename.includes('/') || filename.includes('..')) {
      return NextResponse.json({ error: 'Некорректное имя файла' }, { status: 400 });
    }

    const filePath = join(UPLOAD_DIR, filename);

    // Check file exists
    let fileStat;
    try {
      fileStat = await stat(filePath);
    } catch {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 404 });
    }

    // Read file
    const buffer = await readFile(filePath);

    // Determine content type from extension
    const ext = '.' + filename.split('.').pop()?.toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': fileStat.size.toString(),
      },
    });
  } catch (error) {
    console.error('[images] Error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
