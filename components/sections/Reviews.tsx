import Script from "next/script";
import { photo, type Product } from "@/lib/catalog";
import "./Judgeme.css";
import "./Reviews.css";

// Judge.me review widget. The data below is the snapshot Shopify embedded on the live page (no reviews yet);
// Judge.me's own script renders it and loads further pages from api.judge.me.
export default function Reviews({ product }: { product: Product }) {
  const image = photo(product.photos[0].file, 640);
  const widgetData = {
    number_of_reviews: 0,
    average_rating: "0.00",
    number_of_questions: 0,
    product_name: product.title,
    product_external_id: product.productId,
    product_coupons_enabled: true,
    image_url: image,
    histogram: [5, 4, 3, 2, 1].map((rating) => ({ rating, frequency: 0, percentage: 0, extra_class: null })),
    review_keywords: null,
    product_medals: [],
    custom_form_filters_and_averages: null,
    photo_gallery: null,
    review_summary_text: "Be the first to write a review",
    ai_summary_text: "",
    sort_key: "created_at",
    multi_language_sorting_enabled: false,
    reviews: [],
    pagination: { total_pages: 0, current_page: 1, per_page: 5 },
  };
  return (
    <>
      <section id="shopify-section-reviews" className="shopify-section">
        <div className="voide-apps voide-page-width">
          <div id="shopify-block-AcmpGbUVwczFCQmppd__judge_me_reviews_review_widget_JwJxxq" className="shopify-block shopify-app-block">
            <div style={{ clear: "both" }} />
            <div id="judgeme_product_reviews" className="jdgm-widget jdgm-review-widget" data-product-title={product.title} data-id={product.productId} data-product-id={product.productId} data-widget="review" data-shop-reviews="false" data-shop-reviews-count="0" data-cart-eligible-template="false" data-shop-average-rating="0.00" data-shop-review-count="0" data-empty-state="empty_widget" data-entry-point="review_widget.js" data-entry-key="review-widget/main.js" data-block-id="AcmpGbUVwczFCQmppd__judge_me_reviews_review_widget_JwJxxq" data-is-awesome="true" data-customer-logged-in="false" style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div className="jdgm-legacy-widget-content" style={{ display: "none" }}>
                <div className="jdgm-rev-widg" data-updated-at="2026-10-30T13:38:59Z" data-average-rating="0.00" data-number-of-reviews="0" data-number-of-questions="0" data-image-url={image}>
                  <div className="jdgm-rev-widg__header">
                    <h2 className="jdgm-rev-widg__title">
                      Customer Reviews
                    </h2>
                    <div className="jdgm-rev-widg__summary">
                      <div className="jdgm-rev-widg__summary-stars">
                        <span className="jdgm-rev-widg__summary-stars-img" aria-label="Average rating is 0.00 stars" role="img">
                          <span className="jdgm-star jdgm--off" />
                          <span className="jdgm-star jdgm--off" />
                          <span className="jdgm-star jdgm--off" />
                          <span className="jdgm-star jdgm--off" />
                          <span className="jdgm-star jdgm--off" />
                        </span>
                      </div>
                      <div className="jdgm-rev-widg__summary-text">
                        Be the first to write a review
                      </div>
                    </div>
                    <a style={{ display: "none" }} href="#" className="jdgm-write-rev-link" role="button">
                      Write a review
                    </a>
                    <div className="jdgm-histogram jdgm-temp-hidden">
                      <div className="jdgm-histogram__row" data-rating="5" data-frequency="0" data-percentage="0">
                        <div className="jdgm-histogram__star" role="button" aria-label="0% (0) reviews with 5 star rating" tabIndex={0}>
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--on" />
                        </div>
                        <div className="jdgm-histogram__bar">
                          <div className="jdgm-histogram__bar-content" style={{ width: "0%" }}>
                          </div>
                        </div>
                        <div className="jdgm-histogram__percentage">
                          0%
                        </div>
                        <div className="jdgm-histogram__frequency">
                          (0)
                        </div>
                      </div>
                      <div className="jdgm-histogram__row" data-rating="4" data-frequency="0" data-percentage="0">
                        <div className="jdgm-histogram__star" role="button" aria-label="0% (0) reviews with 4 star rating" tabIndex={0}>
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--off" />
                        </div>
                        <div className="jdgm-histogram__bar">
                          <div className="jdgm-histogram__bar-content" style={{ width: "0%" }}>
                          </div>
                        </div>
                        <div className="jdgm-histogram__percentage">
                          0%
                        </div>
                        <div className="jdgm-histogram__frequency">
                          (0)
                        </div>
                      </div>
                      <div className="jdgm-histogram__row" data-rating="3" data-frequency="0" data-percentage="0">
                        <div className="jdgm-histogram__star" role="button" aria-label="0% (0) reviews with 3 star rating" tabIndex={0}>
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--off" />
                          <span className="jdgm-star jdgm--off" />
                        </div>
                        <div className="jdgm-histogram__bar">
                          <div className="jdgm-histogram__bar-content" style={{ width: "0%" }}>
                          </div>
                        </div>
                        <div className="jdgm-histogram__percentage">
                          0%
                        </div>
                        <div className="jdgm-histogram__frequency">
                          (0)
                        </div>
                      </div>
                      <div className="jdgm-histogram__row" data-rating="2" data-frequency="0" data-percentage="0">
                        <div className="jdgm-histogram__star" role="button" aria-label="0% (0) reviews with 2 star rating" tabIndex={0}>
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--off" />
                          <span className="jdgm-star jdgm--off" />
                          <span className="jdgm-star jdgm--off" />
                        </div>
                        <div className="jdgm-histogram__bar">
                          <div className="jdgm-histogram__bar-content" style={{ width: "0%" }}>
                          </div>
                        </div>
                        <div className="jdgm-histogram__percentage">
                          0%
                        </div>
                        <div className="jdgm-histogram__frequency">
                          (0)
                        </div>
                      </div>
                      <div className="jdgm-histogram__row" data-rating="1" data-frequency="0" data-percentage="0">
                        <div className="jdgm-histogram__star" role="button" aria-label="0% (0) reviews with 1 star rating" tabIndex={0}>
                          <span className="jdgm-star jdgm--on" />
                          <span className="jdgm-star jdgm--off" />
                          <span className="jdgm-star jdgm--off" />
                          <span className="jdgm-star jdgm--off" />
                          <span className="jdgm-star jdgm--off" />
                        </div>
                        <div className="jdgm-histogram__bar">
                          <div className="jdgm-histogram__bar-content" style={{ width: "0%" }}>
                          </div>
                        </div>
                        <div className="jdgm-histogram__percentage">
                          0%
                        </div>
                        <div className="jdgm-histogram__frequency">
                          (0)
                        </div>
                      </div>
                      <div className="jdgm-histogram__row jdgm-histogram__clear-filter" data-rating="null" tabIndex={0} />
                    </div>
                    <div className="jdgm-rev-widg__sort-wrapper" />
                  </div>
                  <div className="jdgm-rev-widg__body">
                    <div className="jdgm-rev-widg__reviews" />
                    <div className="jdgm-paginate" data-per-page="5" data-url="https://api.judge.me/reviews/reviews_for_widget?legacy_widget=true" style={{ display: "none" }} />
                  </div>
                  <div className="jdgm-rev-widg__paginate-spinner-wrapper">
                    <div className="jdgm-spinner" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <script type="application/json" id="jdgm-widget-data" dangerouslySetInnerHTML={{ __html: JSON.stringify(widgetData) }} />
      <Script src="/theme/judgeme.js" />
    </>
  );
}
