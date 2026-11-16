import { Skeleton } from "@/components/ui/skeleton";
import type { AdminSection } from "../types";

function Heading() {
  return (
    <div className="page-heading">
      <div className="space-y-4">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-9 w-64 max-w-full" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
    </div>
  );
}
function FormFields() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-11 w-full" />
        </div>
      ))}
      <Skeleton className="h-11 w-36" />
    </div>
  );
}
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="panel">
      <div className="panel-head space-y-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-48" />
      </div>
      <div className="panel-body">{children}</div>
    </div>
  );
}
export function PageSkeleton({
  section = "overview",
}: {
  section?: AdminSection;
}) {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      aria-busy="true"
      className="section [&_[data-slot=skeleton]]:bg-[var(--line)]"
    >
      <span className="sr-only">Loading page content…</span>
      <div aria-hidden="true">
        {section === "overview" ? (
          <>
            <Heading />
            <div className="stats">
              {[0, 1, 2].map((i) => (
                <div className="stat space-y-5" key={i}>
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-12 w-16" />
                  <Skeleton className="h-3 w-40 max-w-full" />
                </div>
              ))}
            </div>
          </>
        ) : section === "entries" ? (
          <Panel>
            <div className="grid-2 mb-6">
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="space-y-5">
              {Array.from({ length: 7 }, (_, i) => (
                <div className="grid grid-cols-4 gap-4 border-b pb-4" key={i}>
                  {[0, 1, 2, 3].map((j) => (
                    <Skeleton className="h-4 w-full" key={j} />
                  ))}
                </div>
              ))}
            </div>
          </Panel>
        ) : section === "prizes" ? (
          <div className="grid-2">
            <Panel>
              <FormFields />
            </Panel>
            <Panel>
              <div className="space-y-5">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </Panel>
          </div>
        ) : section === "winners" ? (
          <Panel>
            <div className="winner-grid">
              {[0, 1, 2].map((i) => (
                <div className="winner space-y-5" key={i}>
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-7 w-40" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </Panel>
        ) : section === "audit" ? (
          <Panel>
            <div className="space-y-6">
              {Array.from({ length: 8 }, (_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          </Panel>
        ) : (
          <Panel>
            <FormFields />
          </Panel>
        )}
      </div>
    </div>
  );
}
export function AdminLayoutSkeleton() {
  return (
    <div className="gate">
      <div className="w-full max-w-lg">
        <PageSkeleton />
      </div>
    </div>
  );
}
