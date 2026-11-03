import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";
import { UNIT_PRICE, type Scent } from "@/lib/catalog";
import { euro } from "@/lib/money";

export function ScentCard({ scent, priority = false }: { scent: Scent; priority?: boolean }) {
  const img = scent.images[0];
  const href = `/products/${scent.handle}`;
  return (
    <article className="scent-card" style={{ ["--oil" as string]: scent.oil }}>
      <Link href={href} className="scent-card__media" tabIndex={-1} aria-hidden="true">
        <Image
          src={img.src}
          alt=""
          width={img.width}
          height={img.height}
          sizes="(min-width: 960px) 30vw, (min-width: 640px) 45vw, 90vw"
          priority={priority}
        />
      </Link>
      <div className="scent-card__body">
        <p className="scent-card__family">
          <span className="oil-dot" aria-hidden="true" />
          {scent.family}
        </p>
        <h3 className="scent-card__name">
          <Link href={href}>{scent.name}</Link>
        </h3>
        <p className="scent-card__notes">
          {scent.notes.top}, {scent.notes.heart.toLowerCase()}, {scent.notes.base.toLowerCase()}
        </p>
        <div className="scent-card__buy">
          <p className="price">{euro(UNIT_PRICE)}</p>
          <AddToCartButton
            line={{ type: "single", scent: scent.handle }}
            className="button button--small"
            ariaLabel={`Add ${scent.name} to cart`}
          />
        </div>
      </div>
    </article>
  );
}
