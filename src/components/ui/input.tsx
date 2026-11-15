import * as React from "react";
export function Input({
  className = "",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={`flex h-11 w-full rounded-lg border bg-transparent px-3 text-base shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
