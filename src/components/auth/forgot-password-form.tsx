"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    let isValid = true;

    setEmailError("");
    setFormError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setEmailError("Informe seu e-mail.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Informe um e-mail válido.");
      isValid = false;
    }

    return isValid;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setFormError("");
      setSuccessMessage("");

      // 🔹 Futuramente aqui entra a integração real com backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage(
        "Se existir uma conta com este e-mail, enviaremos as instruções de recuperação."
      );
    } catch {
      setFormError("Não foi possível processar sua solicitação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2">
        <div className="hidden flex-col justify-center lg:flex">
          <div className="space-y-6">
            <Badge variant="outline" className="w-fit">
              Recuperação de acesso
            </Badge>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground xl:text-5xl">
                Esqueceu sua senha?
              </h1>

              <p className="max-w-md text-base leading-7 text-muted-foreground">
                Informe seu e-mail para iniciar o processo de recuperação de acesso
                da plataforma StockSales.
              </p>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <Card className="bg-background">
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Processo seguro
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Fluxo preparado para redefinição segura de senha.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Experiência consistente
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Interface alinhada com login e criação de conta.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-8 space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Recuperar senha
                </h2>
                <p className="text-sm text-muted-foreground">
                  Digite seu e-mail para continuar.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    label="E-mail"
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    error={emailError}
                    disabled={isLoading}
                    className="pr-10"
                  />

                  <Mail className="pointer-events-none absolute right-3 top-10.5 h-5 w-5 text-muted-foreground" />
                </div>

                {formError && (
                  <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {formError}
                  </div>
                )}

                {successMessage && (
                  <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    {successMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                  className="transition-all duration-200 hover:scale-[1.01]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader size="sm" />
                      Enviando...
                    </span>
                  ) : (
                    "Enviar instruções"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Lembrou sua senha?{" "}
                <Link
                  href="/"
                  className="font-medium text-primary hover:underline"
                >
                  Voltar para login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}