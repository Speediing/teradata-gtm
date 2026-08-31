import { requireSiteAccess } from "@/lib/gate";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSiteAccess("/");
  return children;
}
