// The contact route (app/contact/route.ts) is the only live code that takes visitor input.
// `npm test` compiles it to .test-build first (Node 20 can't run TypeScript directly).
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, before, test } from "node:test";
import route from "../.test-build/route.js";

const { POST } = route;
const received = [];
const hook = createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    received.push(JSON.parse(body));
    res.end("ok");
  });
});
before(() => new Promise((r) => hook.listen(0, r)));
after(() => hook.close());
const useHook = () => (process.env.CONTACT_WEBHOOK_URL = `http://127.0.0.1:${hook.address().port}/`);

function post(fields, referer = "http://localhost/pages/contact") {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.append(k, v);
  return POST(new Request("http://localhost/contact", { method: "POST", body: form, headers: { referer } }));
}

test("rejects a bad email", async () => {
  useHook();
  const res = await post({ form_type: "contact", "contact[email]": "not-an-email" });
  assert.equal(res.status, 400);
});

test("drops bot posts that fill the hidden website field, without forwarding them", async () => {
  useHook();
  received.length = 0;
  const res = await post({ form_type: "contact", "contact[email]": "a@b.nl", website: "spam.example" });
  assert.equal(res.status, 303);
  assert.equal(received.length, 0);
});

test("says the form isn't connected when no webhook is set", async () => {
  delete process.env.CONTACT_WEBHOOK_URL;
  const res = await post({ form_type: "contact", "contact[email]": "a@b.nl" });
  assert.equal(res.status, 503);
});

test("forwards a contact message and sends the visitor back to the form", async () => {
  useHook();
  received.length = 0;
  const res = await post({ form_type: "contact", "contact[email]": "a@b.nl", "contact[Order Number]": "#1001" });
  assert.equal(res.status, 303);
  assert.equal(res.headers.get("location"), "http://localhost/pages/contact?contact_posted=true#voide-contact-form");
  assert.deepEqual(received, [{ type: "contact", email: "a@b.nl", "Order Number": "#1001", page: "/pages/contact" }]);
});

test("forwards a newsletter sign-up from the pop-up", async () => {
  useHook();
  received.length = 0;
  const res = await post({ form_type: "customer", "contact[email]": "a@b.nl", "contact[tags]": "newsletter" }, "http://localhost/");
  assert.equal(res.headers.get("location"), "http://localhost/?customer_posted=true#ep-form");
  assert.equal(received[0].type, "customer");
});
