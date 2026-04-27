"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

import { PasswordRequirements } from "@/components/auth/password-requirements";
import { isPasswordStrong } from "@/lib/password-validation";

export function SettingsForm() {
  const { data: session } = useSession();

  // 👤 PROFILE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [initialName, setInitialName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");

  const [profileErrors, setProfileErrors] = useState({
    name: "",
    email: "",
  });

  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  // 🔐 PASSWORD
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // 🔹 carregar dados da sessão
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");

      setInitialName(session.user.name || "");
      setInitialEmail(session.user.email || "");
    }
  }, [session]);

  const isProfileChanged =
    name !== initialName || email !== initialEmail;

  // ===============================
  // 👤 VALIDATE PROFILE
  // ===============================
  function validateProfile() {
    const newErrors = {
      name: "",
      email: "",
    };

    let isValid = true;

    setProfileError("");
    setProfileSuccess("");

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

    setProfileErrors(newErrors);
    return isValid;
  }

  // ===============================
  // 🔐 VALIDATE PASSWORD
  // ===============================
  function validatePassword() {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    let isValid = true;

    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Informe a senha atual.";
      isValid = false;
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "Informe a nova senha.";
      isValid = false;
    } else if (!isPasswordStrong(newPassword)) {
      newErrors.newPassword = "A senha não atende aos requisitos.";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirme a nova senha.";
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
      isValid = false;
    }

    setPasswordErrors(newErrors);
    return isValid;
  }

  // ===============================
  // 👤 UPDATE PROFILE
  // ===============================
  async function handleProfile(e: React.FormEvent) {
    e.preventDefault();

    if (!validateProfile()) return;
    if (!isProfileChanged) return;

    try {
      setLoadingProfile(true);
      setProfileError("");
      setProfileSuccess("");

      const res = await fetch("/api/settings/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setProfileError(data.message || "Erro ao atualizar.");
        return;
      }

      setProfileSuccess("Dados atualizados com sucesso!");

      setInitialName(name);
      setInitialEmail(email);
    } catch {
      setProfileError("Erro inesperado.");
    } finally {
      setLoadingProfile(false);
    }
  }

  // ===============================
  // 🔐 UPDATE PASSWORD
  // ===============================
  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();

    if (!validatePassword()) return;

    try {
      setLoadingPassword(true);
      setPasswordError("");
      setPasswordSuccess("");

      const res = await fetch("/api/settings/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.message || "Erro ao atualizar senha.");
        return;
      }

      setPasswordSuccess("Senha atualizada com sucesso!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setPasswordError("Erro inesperado.");
    } finally {
      setLoadingPassword(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 👤 PROFILE */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Perfil</h2>

          <form onSubmit={handleProfile} className="space-y-4">
            <Input
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={profileErrors.name}
            />

            <Input
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={profileErrors.email}
            />

            {profileError && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {profileError}
              </div>
            )}

            {profileSuccess && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
                {profileSuccess}
              </div>
            )}

            <Button
              type="submit"
              disabled={!isProfileChanged || loadingProfile}
              className="w-full"
            >
              {loadingProfile ? (
                <span className="flex items-center gap-2">
                  <Loader size="sm" />
                  Salvando...
                </span>
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 🔐 PASSWORD */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Segurança</h2>

          <form onSubmit={handlePassword} className="space-y-4">
            <Input
              label="Senha atual"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              error={passwordErrors.currentPassword}
            />

            <div className="relative">
              <Input
                label="Nova senha"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={passwordErrors.newPassword}
              />

              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-9 text-muted-foreground"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <PasswordRequirements password={newPassword} />

            <div className="relative">
              <Input
                label="Confirmar senha"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={passwordErrors.confirmPassword}
              />

              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-3 top-9 text-muted-foreground"
              >
                {showConfirm ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {passwordError && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
                {passwordSuccess}
              </div>
            )}

            <Button
              type="submit"
              disabled={loadingPassword}
              className="w-full"
            >
              {loadingPassword ? (
                <span className="flex items-center gap-2">
                  <Loader size="sm" />
                  Atualizando...
                </span>
              ) : (
                "Alterar senha"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}