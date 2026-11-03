"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";

// Opens the visitor's own mail app with the message filled in, so it works
// without a mail server. Swap for a POST to your helpdesk when you have one.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const order = String(data.get("order") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = order ? `Order ${order}` : `Question from ${name || "the website"}`;
    const body = `${message}\n\n${name}${order ? `\nOrder: ${order}` : ""}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="c-name">Name</label>
        <input id="c-name" name="name" className="input" autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" required className="input" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="c-order">
          Order number <span className="field__optional">(optional)</span>
        </label>
        <input id="c-order" name="order" className="input" inputMode="numeric" />
      </div>
      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" required rows={6} className="input" />
      </div>
      <button type="submit" className="button">
        Send message
      </button>
      {sent && (
        <p className="contact-form__note" role="status">
          Your mail app should open with the message ready to send. If it didn't, email us at{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      )}
    </form>
  );
}
