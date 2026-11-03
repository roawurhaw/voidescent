"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { lineKey, MAX_QUANTITY, sanitizeLines, type CartLine, type CartState, type NewLine } from "@/lib/cart";
import { DEFAULT_COUNTRY, SHIPPING, type CountryCode } from "@/lib/shipping";

const STORAGE_KEY = "voidescent:cart:v1";

type Action =
  | { type: "hydrate"; state: CartState }
  | { type: "add"; line: NewLine; quantity: number }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "country"; country: CountryCode }
  | { type: "discount"; code: string | null };

const initial: CartState = { lines: [], country: DEFAULT_COUNTRY, discountCode: null };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "add": {
      const key = lineKey(action.line);
      const existing = state.lines.find((l) => l.key === key);
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.key === key ? { ...l, quantity: Math.min(MAX_QUANTITY, l.quantity + action.quantity) } : l,
          ),
        };
      }
      const line = { ...action.line, key, quantity: action.quantity } as CartLine;
      return { ...state, lines: [...state.lines, line] };
    }
    case "setQuantity":
      if (action.quantity < 1) return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.key === action.key ? { ...l, quantity: Math.min(MAX_QUANTITY, action.quantity) } : l,
        ),
      };
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };
    case "country":
      return { ...state, country: action.country };
    case "discount":
      return { ...state, discountCode: action.code };
  }
}

type CartContextValue = {
  state: CartState;
  hydrated: boolean;
  itemCount: number;
  add: (line: NewLine, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  setCountry: (country: CountryCode) => void;
  setDiscountCode: (code: string | null) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Short message for the screen-reader live region. */
  announcement: string;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // Load the saved cart once, in the browser only.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<CartState>;
        const country = saved.country && saved.country in SHIPPING ? saved.country : DEFAULT_COUNTRY;
        dispatch({
          type: "hydrate",
          state: {
            lines: sanitizeLines(saved.lines),
            country,
            discountCode: typeof saved.discountCode === "string" ? saved.discountCode : null,
          },
        });
      }
    } catch {
      // Storage blocked or corrupt: start with an empty cart.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Private mode or storage full: the cart still works for this visit.
    }
  }, [state, hydrated]);

  const add = useCallback((line: NewLine, quantity = 1) => {
    dispatch({ type: "add", line, quantity });
    setAnnouncement("Added to cart");
    setOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      hydrated,
      itemCount: state.lines.reduce((n, l) => n + l.quantity, 0),
      add,
      setQuantity: (key, quantity) => dispatch({ type: "setQuantity", key, quantity }),
      remove: (key) => {
        dispatch({ type: "remove", key });
        setAnnouncement("Removed from cart");
      },
      setCountry: (country) => dispatch({ type: "country", country }),
      setDiscountCode: (code) => dispatch({ type: "discount", code: code ? code.trim().toUpperCase() : null }),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      announcement,
    }),
    [state, hydrated, add, isOpen, announcement],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
