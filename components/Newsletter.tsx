"use client";

import { useState, type FormEvent } from "react";

type Status = { kind: "idle" | "sending" | "done" | "error"; message?: string };

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (res.ok) {
        setStatus({ kind: "done", message: "You're on the list. We'll email you when a new scent drops." });
        setEmail("");
      } else {
        setStatus({ kind: "error", message: data.error ?? "Sign-up failed. Try again in a moment." });
      }
    } catch {
      setStatus({ kind: "error", message: "Couldn't reach the server. Check your connection and try again." });
    }
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="button" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Subscribing" : "Subscribe"}
      </button>
      <p className={`newsletter-form__status ${status.kind === "error" ? "is-error" : ""}`} aria-live="polite">
        {status.message ?? "Only new scents, restocks and offers. Unsubscribe anytime."}
      </p>
    </form>
  );
}
