import { type Article as ArticleData, articleImage } from "@/lib/blog";
import "./Article.css";

export default function Article({ article, html }: { article: ArticleData; html: string }) {
  const date = new Date(article.published + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <div id="shopify-section-main" className="shopify-section">
      <article className="v-article">
        {article.image && (
          <div className="v-article__hero">
            <img src={articleImage(article.image.file, 2000)} alt={article.image.alt} width={article.image.width} height={article.image.height} loading="eager" />
          </div>
        )}
        <div className="v-article__body">
          <header className="v-article__header">
            <h1>{article.title}</h1>
            <p className="v-article__meta">
              <time dateTime={article.published}>{date} </time>
              <span>·</span>
              {article.author}
            </p>
          </header>
          <div className="v-article__content rte" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>
    </div>
  );
}
