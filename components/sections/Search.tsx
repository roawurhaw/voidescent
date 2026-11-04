import type { SearchResult } from "@/lib/search";

// The theme's search template (Shopify Skeleton). results is undefined until a search was made.
export default function Search({ q, results }: { q: string; results?: SearchResult[] }) {
  return (
    <div id="shopify-section-main" className="shopify-section">
      <h1>
        Search
      </h1>
      <form action="/search" method="get" role="search">
        <input type="search" size={50} name="q" defaultValue={q} placeholder="Search articles, pages, or products" />
        {" "}
        <button type="submit">
          Search
        </button>
      </form>
      {results && (
        <>
          <p>
            {results.length} {results.length === 1 ? "result" : "results"} found for {q}
          </p>
          <div className="search-results">
            {results.map((r) => (
              <div className="search-result" key={r.url}>
                {r.image && (
                  <a className="image search-result__image" href={r.url}>
                    <img
                      src={r.image.src(400)}
                      alt={r.image.alt}
                      width="400"
                      height={Math.round((400 * r.image.height) / r.image.width)}
                    />
                  </a>
                )}
                <div className="search-result__content">
                  <p>
                    <a href={r.url} title="">
                      {r.title}
                    </a>
                    {r.price && <> {r.price}</>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
