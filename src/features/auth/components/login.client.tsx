"use client";
import { useActionState, useEffect } from "react";
import { login, verify } from "../actions/auth.actions";
import { ActionForm } from "@/components/ui/action-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
export function Login() {
  const [state, submit, pending] = useActionState(login, { message: "" });
  useEffect(() => {
    if (state.message)
      toast.add({ title: state.message, type: state.ok ? "success" : "error" });
  }, [state]);
  return (
    <main className="shell max-w-lg! pt-20!">
      <p className="eyebrow mb-5">The wedding celebration · Admin</p>
      <h1 className="text-5xl! mb-8">Welcome back.</h1>
      <div className="panel">
        {state.challengeId ? (
          <>
            <h2 className="mb-5">Check your email</h2>
            <ActionForm action={verify} label="Verify & sign in">
              <input
                type="hidden"
                name="challengeId"
                value={state.challengeId}
              />
              <label>
                Six-digit code
                <Input
                  name="code"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  autoComplete="one-time-code"
                  required
                />
              </label>
              <p className="text-sm">
                Your code expires in 10 minutes. To request another, return to
                sign-in after one minute.
              </p>
            </ActionForm>
            <Button
              className="mt-4"
              variant="ghost"
              onClick={() => window.location.reload()}
            >
              Return to sign-in
            </Button>
          </>
        ) : (
          <form action={submit} className="space-y-5">
            <label>
              Email address
              <Input
                name="email"
                type="email"
                required
                autoComplete="username"
              />
            </label>
            <label>
              Password
              <Input
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </label>
            <Button type="submit" disabled={pending}>
              {pending ? "Sending code…" : "Continue securely"}
            </Button>
            <p role="status">{state.message}</p>
          </form>
        )}
      </div>
    </main>
  );
}
