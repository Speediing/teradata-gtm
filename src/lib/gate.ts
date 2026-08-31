import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE, isValidSession } from "@/lib/auth";

export async function requireSiteAccess(pathname: string = "/") {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIE)?.value;
  if (await isValidSession(token)) {
    return;
  }
  const next = encodeURIComponent(pathname);
  redirect(`/login?next=${next}`);
}
