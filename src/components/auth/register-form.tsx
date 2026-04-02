"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";

import { PasswordRequirements } from "@/components/auth/password-requirements";
import { isPasswordStrong } from "@/lib/password-validation";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Informe seu nome.";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Informe seu e-mail.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Informe um e-mail válido.";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Informe sua senha.";
      isValid = false;
    } else if (!isPasswordStrong(password)) {
      newErrors.password = "A senha não atende aos requisitos mínimos.";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirme sua senha.";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setFormError("");
      setSuccessMessage("");

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.message || "Erro ao criar conta.");
        return;
      }

      setSuccessMessage(
        "Conta criada com sucesso! Redirecionando para o login..."
      );

      setTimeout(() => {
        router.push("/");
      }, 1800);
    } catch {
      setFormError("Erro inesperado. Tente novamente.");
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
              Novo cadastro
            </Badge>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground xl:text-5xl">
                Crie sua conta
              </h1>

              <p className="max-w-md text-base leading-7 text-muted-foreground">
                Cadastre-se para acessar a plataforma StockSales e começar a
                gerenciar estoque, vendas e operação do seu negócio.
              </p>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <Card className="bg-background">
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Cadastro seguro
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Regras de senha reforçadas para proteger o acesso.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Acesso profissional
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Estrutura pronta para uso real e evolução da plataforma.
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
                  Criar conta
                </h2>
                <p className="text-sm text-muted-foreground">
                  Preencha os dados abaixo para se cadastrar.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  id="name"
                  label="Nome"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  error={errors.name}
                  disabled={isLoading}
                />

                <Input
                  id="email"
                  type="email"
                  label="E-mail"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={errors.email}
                  disabled={isLoading}
                />

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Senha
                  </label>

                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={isLoading}
                        className="pr-12"
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-5 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        aria-label={
                          showPassword ? "Ocultar senha" : "Mostrar senha"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <span className="text-sm text-destructive">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </div>

                <PasswordRequirements password={password} />

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    Confirmar senha
                  </label>

                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        disabled={isLoading}
                        className="pr-12"
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-5 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        aria-label={
                          showConfirmPassword
                            ? "Ocultar confirmação de senha"
                            : "Mostrar confirmação de senha"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {errors.confirmPassword && (
                      <span className="text-sm text-destructive">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
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
                      Criando conta...
                    </span>
                  ) : (
                    "Criar conta"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Já possui uma conta?{" "}
                <Link
                  href="/"
                  className="font-medium text-primary hover:underline"
                >
                  Entrar
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}