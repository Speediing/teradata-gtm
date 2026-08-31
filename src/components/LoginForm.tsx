"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";
  const errored = params.get("error") === "1";
  const [password, setPassword] = useState("");
  const [error, setError] = useState(errored);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(false);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ password, next }),
    });
    setPending(false);
    if (!response.ok) {
      setError(true);
      return;
    }
    const data = (await response.json()) as { next?: string };
    router.replace(data.next || "/");
    router.refresh();
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      {error ? <p className="login-error">Wrong password. Try again.</p> : null}
      <button type="submit" disabled={pending}>
        {pending ? "Checking" : "Open the site"}
      </button>
    </form>
  );
}
