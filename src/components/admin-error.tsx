"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth";
export function AdminError({ reset }: { reset: () => void }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Unable to load the desk</h2>
      </div>
      <div className="panel-body space-y-5">
        <p>Please try again. If your session has expired, return to sign-in.</p>
        <Button onClick={reset}>Try again</Button>
        <form action={logout}>
          <Button type="submit" variant="outline">
            Return to sign-in
          </Button>
        </form>
      </div>
    </section>
  );
}
