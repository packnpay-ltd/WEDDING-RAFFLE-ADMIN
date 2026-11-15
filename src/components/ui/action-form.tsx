"use client";
import { useActionState, useEffect } from "react";
import { Button } from "./button";
import { toast } from "./toast";
export type FormState = {
  message: string;
  ok?: boolean;
  ticket?: string;
  challengeId?: string;
};
export function ActionForm({
  action,
  children,
  label = "Save",
  initial = { message: "" },
}: {
  action: (state: FormState, data: FormData) => Promise<FormState>;
  children: React.ReactNode;
  label?: string;
  initial?: FormState;
}) {
  const [state, submit, pending] = useActionState(action, initial);
  useEffect(() => {
    if (state.message)
      toast.add({ title: state.message, type: state.ok ? "success" : "error" });
  }, [state]);
  return (
    <form action={submit} className="space-y-4">
      {children}
      <Button type="submit" disabled={pending} className="h-11 px-6">
        {pending ? "Please wait…" : label}
      </Button>
      <div aria-live="polite">
        {state.message && (
          <p className={state.ok ? "text-green-800" : "text-red-800"}>
            {state.message}
          </p>
        )}
        {state.ticket && <p className="ticket">{state.ticket}</p>}
      </div>
    </form>
  );
}
