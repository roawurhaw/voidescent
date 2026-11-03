"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { CartContents } from "./CartContents";

export function CartDrawer() {
  const { isOpen, close, itemCount, hydrated } = useCart();
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // <dialog> gives us the focus trap, Esc to close and an inert page for free.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // Close when the page changes (e.g. after following a link inside the drawer).
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    closeRef.current();
  }, [pathname]);

  return (
    <dialog
      ref={ref}
      className="drawer"
      aria-labelledby="drawer-title"
      onClose={close}
      onClick={(e) => {
        // A click on the backdrop lands on the dialog element itself.
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="drawer__panel">
        <header className="drawer__head">
          <h2 id="drawer-title" className="drawer__title">
            Your cart{hydrated && itemCount > 0 ? ` (${itemCount})` : ""}
          </h2>
          <button type="button" className="icon-button" onClick={close} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        <CartContents onNavigate={close} />
      </div>
    </dialog>
  );
}
