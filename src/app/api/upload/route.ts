import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

// Upload directory — works in both sandbox and PaaS
const UPLOAD_DIR = process.env.UPLOAD_DIR || join(process.cwd(), 'upload');

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

    // Generate unique filename with original extension
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${uuidv4()}.${ext}`;

    // Ensure upload directory exists
    await mkdir(UPLOAD_DIR, { recursive: true });

    // Write file to disk
    const filePath = join(UPLOAD_DIR, filename);
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    // Return the URL served by /api/images/[filename]
    const url = `/api/images/${filename}`;

    console.log('[upload] File saved:', filename, 'size:', file.size);

    return NextResponse.json({ url, filename });
  } catch (error) {
    console.error('[upload] Error:', error);
    return NextResponse.json(
      { error: 'Не удалось загрузить файл' },
      { status: 500 }
    );
  }
}
