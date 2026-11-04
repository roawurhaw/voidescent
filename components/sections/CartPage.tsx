import Script from "next/script";
import { cartJson } from "@/lib/cart";
import { money } from "@/lib/catalog";
import "./CartPage.css";

const FREE_SHIPPING_NL = 2500;

export default function CartPage({ cart }: { cart: ReturnType<typeof cartJson> }) {
  const total = cart.total_price;
  return (
    <>
      <section id="shopify-section-voide_cart" className="shopify-section">
        <section id="voide-cart">
          <div className="voide-page-width cart__inner">
            <div className="cart__header">
              <h1 className="cart__title">
                Your Cart
              </h1>
            </div>
            {cart.items.length === 0 ? (
              <div className="cart__empty">
                <p>
                  Your cart is currently empty.
                </p>
                <a href="/collections/scents" className="btn-primary">
                  Shop Fragrances
                </a>
              </div>
            ) : (
              <>
                <div className="shipping-bar__container">
                  {total >= FREE_SHIPPING_NL ? (
                    <div className="shipping-bar__message">
                      You&apos;ve unlocked{" "}
                      <strong>
                        Free Shipping!
                      </strong>
                    </div>
                  ) : (
                    <div className="shipping-bar__message">
                      You are only{" "}
                      <strong>
                        {money(FREE_SHIPPING_NL - total)}
                      </strong>
                      {" "}away from Free Shipping!
                    </div>
                  )}
                  <div className="shipping-bar__progress-bg">
                    <div className="shipping-bar__progress-fill" style={{ width: `${Math.min(100, Math.floor((total / FREE_SHIPPING_NL) * 100))}%` }} />
                  </div>
                </div>
                <form action="/cart/update" method="post" id="cart-form" className="cart__form">
                  <div className="cart__items">
                    {cart.items.map((item, i) => (
                      <div className="cart__item" key={item.key}>
                        <a href={item.url} className="item__media" tabIndex={-1} aria-hidden="true">
                          <img src={item.image} alt={item.product_title} loading="lazy" />
                        </a>
                        <div className="item__details">
                          <a href={item.url} className="item__title">
                            {item.product_title}
                          </a>
                          <div className="item__price">
                            {money(item.final_line_price)}
                          </div>
                        </div>
                        <div className="item__actions">
                          <div className="qty__box">
                            <button type="button" className="qty__btn qty__minus" aria-label="Decrease quantity">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </svg>
                            </button>
                            {" "}
                            <input className="qty__input" type="number" name="updates[]" defaultValue={item.quantity} min="0" id={`updates_${item.key}`} data-index={i + 1} />
                            {" "}
                            <button type="button" className="qty__btn qty__plus" aria-label="Increase quantity">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </svg>
                            </button>
                          </div>
                          <a href={`/cart/change?id=${item.key}&quantity=0`} className="item__remove">
                            Remove
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart__footer">
                    <div className="cart__subtotal">
                      <span>
                        Subtotal
                      </span>
                      {" "}
                      <strong>
                        {money(total)}
                      </strong>
                    </div>
                    <p className="cart__tax-note">
                      Taxes and shipping calculated at checkout.
                    </p>
                    <button type="button" className="btn-primary checkout-btn">
                      Proceed to Checkout
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
      </section>
      <Script src="/theme/cart-page.js" />
    </>
  );
}
