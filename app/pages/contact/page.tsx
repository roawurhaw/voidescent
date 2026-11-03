import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Questions about an order or a scent? Email ${SITE.email}. We reply ${SITE.replyTime}.`,
  alternates: { canonical: "/pages/contact" },
};

export default function ContactPage() {
  return (
    <div className="wrap page">
      <h1 className="page__title">Get in touch</h1>
      <p className="lede page__intro">
        Questions about an order or a scent? Send us a message and we&rsquo;ll reply {SITE.replyTime}.
      </p>

      <div className="page-grid">
        <ContactForm />
        <aside className="card">
          <h2>Other ways to reach us</h2>
          <address>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
            <br />
            <br />
            Voidescent
            <br />
            {SITE.address.street}
            <br />
            {SITE.address.postcode} {SITE.address.city}
            <br />
            {SITE.address.country}
            <br />
            KvK {SITE.kvk}
          </address>
        </aside>
      </div>
    </div>
  );
}
