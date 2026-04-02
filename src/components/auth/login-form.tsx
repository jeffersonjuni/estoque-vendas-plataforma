'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    let isValid = true;

    setEmailError('');
    setPasswordError('');
    setFormError('');

    if (!email.trim()) {
      setEmailError('Informe seu e-mail.');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Informe sua senha.');
      isValid = false;
    }

    return isValid;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setFormError('');

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setFormError('E-mail ou senha inválidos.');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setFormError('Não foi possível realizar o login. Tente novamente.');
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
              Plataforma de Gestão
            </Badge>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground xl:text-5xl">
                StockSales
              </h1>

              <p className="max-w-md text-base leading-7 text-muted-foreground">
                Gerencie estoque, vendas e operação em um só lugar com uma
                plataforma moderna, organizada e preparada para crescimento.
              </p>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <Card className="bg-background">
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Controle de Estoque
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Organize entradas, saídas e disponibilidade dos produtos.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background">
                <CardContent className="space-y-2 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    Gestão de Vendas
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Registre vendas e acompanhe a movimentação do negócio.
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
                  Login
                </h2>
                <p className="text-sm text-muted-foreground">
                  Acesse sua conta para continuar na plataforma.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <Input
                  id="email"
                  type="email"
                  label="E-mail"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={emailError}
                  disabled={isLoading}
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground"
                    >
                      Senha
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-primary transition hover:opacity-80 hover:underline"
                    >
                      Esqueci minha senha
                    </Link>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={isLoading}
                        className="pr-12"
                        autoComplete="current-password"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-5 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        aria-label={
                          showPassword ? 'Ocultar senha' : 'Mostrar senha'
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {passwordError && (
                      <span className="text-sm text-destructive">
                        {passwordError}
                      </span>
                    )}
                  </div>
                </div>

                {formError && (
                  <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {formError}
                  </div>
                )}

                <Button type="submit" size="lg" fullWidth disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader size="sm" />
                      Entrando...
                    </span>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Não possui uma conta?{' '}
                <Link
                  href="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Criar conta
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
