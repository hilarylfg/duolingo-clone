"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { authService } from "@/shared/services";
import { CheckCircle, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.passwordRepeat) {
      setError("Пароли не совпадают");
      return;
    }

    if (formData.password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }

    setIsLoading(true);

    try {
      await authService.register(formData);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center duo-hero p-4">
        <Card className="w-full max-w-md border-none bg-white/90 shadow-[0_35px_80px_rgba(20,84,50,0.12)]">
          <CardContent className="space-y-6 py-12 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-duo-green/10">
              <CheckCircle className="h-10 w-10 text-duo-green" />
            </div>
            <div>
              <h2 className="mb-2 text-3xl font-black text-duo-ink">Готово! 🎉</h2>
              <p className="text-duo-ink/70">
                Проверьте почту для подтверждения аккаунта.
              </p>
            </div>
            <p className="text-sm text-duo-ink/50">Перенаправляем на страницу входа...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center duo-hero p-4">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="flex items-center justify-center gap-3">
          <div className="rounded-[24px] bg-duo-green px-4 py-2 text-2xl font-black text-white">
            Duo
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-duo-ink/60">
              Language Lab
            </p>
            <p className="text-2xl font-black text-duo-ink">Регистрация</p>
          </div>
        </Link>

        <Card className="border-none bg-white/90 shadow-[0_35px_80px_rgba(20,84,50,0.12)]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-center text-3xl font-black">Начните учиться сегодня</CardTitle>
            <CardDescription className="text-center text-base">
              Создайте аккаунт и откройте доступ ко всем курсам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-duo-ink/70">Имя</label>
                <Input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-duo-ink/70">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-duo-ink/70">Пароль</label>
                <Input
                  type="password"
                  placeholder="Минимум 6 символов"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-duo-ink/70">Повторите пароль</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.passwordRepeat}
                  onChange={(e) => setFormData({ ...formData, passwordRepeat: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="rounded-2xl border-2 border-duo-error/20 bg-duo-error/10 px-4 py-3 text-sm font-semibold text-duo-error">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="duo"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Создаём аккаунт...
                  </>
                ) : (
                  "Создать аккаунт"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-duo-ink/60">
              Уже есть аккаунт?{" "}
              <Link href="/login" className="font-bold text-duo-green hover:underline">
                Войти
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
