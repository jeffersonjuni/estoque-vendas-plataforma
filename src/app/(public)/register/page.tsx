import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { RegisterForm } from "@/components/auth/register-form";

export default async function RegisterPage() {
  const session = await getAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
}