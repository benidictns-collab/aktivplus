---
Task ID: 5
Agent: main
Task: Add admin user management (CRUD, block/unblock, role change)

Work Log:
- Added `blocked` Boolean field (default: false) to User model in Prisma schema
- Ran `prisma db push` to apply schema migration
- Updated /api/admin/route.ts to include `blocked` field and `_count` in user query
- Updated /api/auth/me/route.ts to check blocked status and return 403 if blocked
- Updated /api/auth/login/route.ts to check blocked status before allowing login
- Created /api/users/route.ts with GET (list all users) and POST (create user) endpoints
- Created /api/users/[id]/route.ts with GET, PATCH, DELETE endpoints for user CRUD
- Added user management state variables and handlers to CabinetPage.tsx
- Replaced basic admin users table with comprehensive user management UI including:
  - Add user form with name, email, phone, password, role fields
  - Edit user functionality
  - Block/Unblock toggle with confirmation
  - Delete user with confirmation
  - Role change dropdown (client/manager/admin)
  - User avatars, status badges, property counts
  - Manager stats section
  - Enhanced applications section

Stage Summary:
- Admin can now fully manage users: add, edit, delete, block/unblock, change roles
- Blocked users cannot log in (returns "Аккаунт заблокирован" error)
- All API endpoints tested and working
- Build compiles successfully
