"use client";

import { useEffect, useState } from "react";

export function DrawRequest() {
  const [id, setId] = useState("");
  useEffect(() => setId(crypto.randomUUID()), []);
  return <input type="hidden" name="request" value={id} />;
}
