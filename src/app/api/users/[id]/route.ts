import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

// GET /api/users/[id] — get a single user (admin only)
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminId = req.cookies.get('session_user_id')?.value;
    if (!adminId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const admin = await db.user.findUnique({ where: { id: adminId } });
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 });
    }

    const { id } = await params;
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        blocked: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { properties: true, applications: true, favorites: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('GET /api/users/[id] error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

// PATCH /api/users/[id] — update user (admin only)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminId = req.cookies.get('session_user_id')?.value;
    if (!adminId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const admin = await db.user.findUnique({ where: { id: adminId } });
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 });
    }

    const { id } = await params;

    // Prevent self-modification of role/blocking
    if (id === adminId) {
      return NextResponse.json({ error: 'Нельзя изменить собственную роль или статус' }, { status: 400 });
    }

    const body = await req.json();
    const { name, email, phone, role, blocked, password } = body;

    // Check user exists
    const existing = await db.user.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    // Prevent blocking/modifying other admins
    if (existing.role === 'admin' && id !== adminId) {
      return NextResponse.json({ error: 'Нельзя изменить другого администратора' }, { status: 403 });
    }

    // Check email uniqueness if changing email
    if (email && email !== existing.email) {
      const emailTaken = await db.user.findUnique({ where: { email } });
      if (emailTaken) {
        return NextResponse.json({ error: 'Пользователь с таким email уже существует' }, { status: 409 });
      }
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name || null;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone || null;
    if (role !== undefined) updateData.role = role;
    if (blocked !== undefined) updateData.blocked = blocked;
    if (password) {
      if (password.length < 6) {
        return NextResponse.json({ error: 'Пароль должен быть не менее 6 символов' }, { status: 400 });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await db.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        blocked: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('PATCH /api/users/[id] error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

// DELETE /api/users/[id] — delete user (admin only)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminId = req.cookies.get('session_user_id')?.value;
    if (!adminId) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });

    const admin = await db.user.findUnique({ where: { id: adminId } });
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 });
    }

    const { id } = await params;

    // Prevent self-deletion
    if (id === adminId) {
      return NextResponse.json({ error: 'Нельзя удалить собственный аккаунт' }, { status: 400 });
    }

    // Check user exists
    const existing = await db.user.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    // Prevent deleting other admins
    if (existing.role === 'admin') {
      return NextResponse.json({ error: 'Нельзя удалить администратора' }, { status: 403 });
    }

    await db.user.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/users/[id] error:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
