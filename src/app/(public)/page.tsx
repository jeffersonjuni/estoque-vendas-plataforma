import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { LoginForm } from "@/components/auth/login-form";

export default async function HomePage() {
  const session = await getAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}