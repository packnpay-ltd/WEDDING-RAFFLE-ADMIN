"use client";
import { useActionState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { login, verify } from "../actions/auth.actions";
import { ActionForm } from "@/components/ui/action-form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

export function Login() {
  const [state, submit, pending] = useActionState(login, { message: "" });
  useEffect(() => {
    if (state.message)
      toast.add({
        title: state.message,
        type: state.ok ? "success" : "error",
      });
  }, [state]);
  return (
    <div className="auth">
      <aside className="auth-brand">
        <p className="wordmark">
          The celebration
          <small>Administration</small>
        </p>
        <div>
          <span className="eyebrow">The wedding celebration</span>
          <h1>
            The evening,
            <br />
            in your care.
          </h1>
          <p>
            Entries, prizes, and the live draw. Quiet tools for the people
            running the celebration.
          </p>
        </div>
        <div className="auth-footer">
          <span className="mono">With a little help from Osusu</span>
          <ShieldCheck size={18} />
        </div>
      </aside>
      <main className="auth-main">
        <span className="eyebrow">Staff access only</span>
        {state.challengeId ? (
          <>
            <h2>Check your email.</h2>
            <p className="intro">
              Enter the six-digit code. It expires in ten minutes.
            </p>
            <ActionForm action={verify} label="Verify and sign in">
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
              <p>
                To request another code, return to sign-in after one minute.
              </p>
            </ActionForm>
            <button
              className="text-button"
              type="button"
              onClick={() => window.location.reload()}
            >
              Return to sign-in
            </button>
          </>
        ) : (
          <>
            <h2>Welcome back.</h2>
            <p className="intro">
              Sign in to look after the guest list and run the draw.
            </p>
            <form action={submit} className="stack">
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
              <button type="submit" data-slot="button" disabled={pending}>
                {pending ? "Sending code…" : "Continue securely"}
              </button>
              <p role="status">{state.message}</p>
            </form>
          </>
        )}
        <p className="auth-note">
          <ShieldCheck
            size={15}
            style={{ verticalAlign: "middle", marginRight: 6 }}
          />
          Access is for authorised event staff. Sign-in is confirmed with a
          one-time code.
        </p>
      </main>
    </div>
  );
}
