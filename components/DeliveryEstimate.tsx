"use client";

import { useEffect, useState } from "react";
import { addBusinessDays, DISPATCH_DAYS } from "@/lib/shipping";

const fmt = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" });

// Rendered after mount so the server and browser never disagree about "today".
export function DeliveryEstimate() {
  const [range, setRange] = useState<string | null>(null);
  useEffect(() => {
    const now = new Date();
    // Ships in 1–2 business days, then about one more day in transit.
    const from = addBusinessDays(now, DISPATCH_DAYS.min + 1);
    const to = addBusinessDays(now, DISPATCH_DAYS.max + 1);
    setRange(`${fmt.format(from)} – ${fmt.format(to)}`);
  }, []);
  if (!range) return null;
  return <li>Arrives around {range} in the Netherlands</li>;
}
