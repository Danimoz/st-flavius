import { requireAdminSession } from '@/libs/admin-auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminSession();
  return children;
}
