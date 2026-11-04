// Pages that use Shopify's plain page template (title + body from Shopify admin), copied from the live store.
// About and Contact have their own designed templates in app/pages/about and app/pages/contact.
export const PAGES: Record<string, { title: string; description: string; html: string }> = {
  "scents": {
    title: "Scents",
    description: "Explore the three Voidescent car scents: Nebula, Heavens and Descent. Fragrance oil in a glass bottle with a wooden diffuser cap, 4–6 weeks of scent per bottle. Free shipping in the Netherlands from €25 and in Belgium from €40.",
    html: "<p>Explore the three Voidescent car scents: Nebula, Heavens and Descent. Fragrance oil in a glass bottle with a wooden diffuser cap, 4–6 weeks of scent per bottle. Free shipping in the Netherlands from €25 and in Belgium from €40.</p>",
  },
  "legal-notice": {
    title: "Legal Notice",
    description: "Information under EU e-commerce rules Trade name: VOIDESCENT Business address: Romboutslaan 502, 3312 KP Dordrecht, Netherlands Contact Email: info@voidescent.com Phone: +31 6 18996571 Business registration Chamber of Commerce (KvK) number: 42080719 Complaints Not happy with something? Email info@voidescent.com and we ",
    html: "<p><strong>Information under EU e-commerce rules</strong></p>\n<p><strong>Trade name:</strong> VOIDESCENT</p>\n<p><strong>Business address:</strong> Romboutslaan 502, 3312 KP Dordrecht, Netherlands</p>\n<h3>Contact</h3>\n<ul>\n<li>\n<strong>Email:</strong> <a href=\"mailto:info@voidescent.com\">info@voidescent.com</a>\n</li>\n<li>\n<strong>Phone:</strong> +31 6 18996571</li>\n</ul>\n<h3>Business registration</h3>\n<ul>\n<li>\n<strong>Chamber of Commerce (KvK) number:</strong> 42080719</li>\n</ul>\n<h3>Complaints</h3>\n<p>Not happy with something? Email <a href=\"mailto:info@voidescent.com\">info@voidescent.com</a> and we will find a solution together.</p>",
  },
};
