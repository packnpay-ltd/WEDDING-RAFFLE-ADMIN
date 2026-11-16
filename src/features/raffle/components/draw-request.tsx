"use client";

import { useEffect, useRef } from "react";

export function DrawRequest() {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (input.current) input.current.value = crypto.randomUUID();
  }, []);
  return <input ref={input} type="hidden" name="request" defaultValue="" />;
}
