import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
import { HangingBottle } from "@/components/HangingBottle";
import { NewsletterForm } from "@/components/Newsletter";
import { ScentCard } from "@/components/ProductCard";
import { RedStar } from "@/components/RedStar";
import { COMPARISON, STEPS, WHY } from "@/components/Sections";
import { BOTTLE, BUNDLE, packFullPrice, PACKS, packSavings, SCENT_ORDER, SCENTS, UNIT_PRICE } from "@/lib/catalog";
import { IMAGES } from "@/lib/images";
import { euro } from "@/lib/money";
import { DISPATCH_DAYS } from "@/lib/shipping";

export default function Home() {
  const trio = PACKS.trio;
  const six = PACKS.six;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <RedStar />
        <div className="wrap hero__grid">
          <div className="hero__text">
            <h1 id="hero-title" className="hero__title">
              <span>May your space</span>
              <span>have a scent</span>
            </h1>
            <p className="hero__body">
              Car hanger fragrances for people who think every drive deserves an atmosphere. Inspired by the cosmos,
              made for your car.
            </p>
            <div className="hero__actions">
              <Link href="#scents" className="button">
                Shop the scents
              </Link>
              <Link href="#story" className="button button--quiet">
                Read our story
              </Link>
            </div>
            <ul className="hero__facts">
              <li>{BOTTLE.volume} glass bottle</li>
              <li>Lasts {BOTTLE.longevity}</li>
              <li>
                Ships from Dordrecht in {DISPATCH_DAYS.min}–{DISPATCH_DAYS.max} days
              </li>
            </ul>
          </div>
          <HangingBottle />
        </div>
      </section>

      <section id="scents" className="section" aria-labelledby="scents-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="scents-title">Three scents, three moods</h2>
            <p>
              One bottle is {euro(UNIT_PRICE)}. All three are {euro(trio.price)}, and a box of six is{" "}
              {euro(six.price)}: buy three, get three free.
            </p>
          </div>

          <div className="scents">
            {SCENT_ORDER.map((h) => (
              <ScentCard key={h} scent={SCENTS[h]} />
            ))}
          </div>

          <article className="bundle" aria-labelledby="bundle-title">
            <Link href={`/products/${BUNDLE.handle}`} className="bundle__media" tabIndex={-1} aria-hidden="true">
              <Image
                src={IMAGES.bundleOrbit.src}
                alt=""
                width={IMAGES.bundleOrbit.width}
                height={IMAGES.bundleOrbit.height}
                sizes="(min-width: 760px) 40vw, 90vw"
              />
            </Link>
            <div className="bundle__body">
              <h3 id="bundle-title" className="bundle__name">
                <Link href={`/products/${BUNDLE.handle}`}>{BUNDLE.name}</Link>
              </h3>
              <p className="bundle__tagline">{BUNDLE.tagline} Switch with your mood, or keep one in every car.</p>
              <p className="bundle__price">
                <strong>{euro(trio.price)}</strong>
                <s aria-label={`Was ${euro(packFullPrice(trio))}`}>{euro(packFullPrice(trio))}</s>
                <span className="bundle__save">You save {euro(packSavings(trio))}</span>
              </p>
              <ul className="bundle__list">
                {SCENT_ORDER.map((h) => (
                  <li key={h} style={{ ["--oil" as string]: SCENTS[h].oil }}>
                    <span className="oil-dot" aria-hidden="true" />
                    {SCENTS[h].name}
                    <span>{SCENTS[h].family.toLowerCase()}</span>
                  </li>
                ))}
              </ul>
              <div className="bundle__actions">
                <AddToCartButton
                  line={{ type: "pack", pack: "trio", picks: { nebula: 1, heavens: 1, descent: 1 } }}
                  label="Add all three to cart"
                />
                <Link href={`/products/${BUNDLE.handle}`} className="button button--quiet">
                  Build a box of six
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="wrap">
          <h2 id="why-title" className="section-title">
            Why Voidescent
          </h2>
          <dl className="facts">
            {WHY.map((item) => (
              <div key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>

          <table className="compare">
            <caption>Next to a typical car scent</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">What we compare</span>
                </th>
                <th scope="col" className="us">
                  Voidescent
                </th>
                <th scope="col">Typical car scent</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.topic}>
                  <th scope="row">{row.topic}</th>
                  <td className="us">{row.us}</td>
                  <td className="them">{row.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="wrap how">
          <div className="how__media">
            <Image
              src={IMAGES.nebulaCar.src}
              alt={IMAGES.nebulaCar.alt}
              width={IMAGES.nebulaCar.width}
              height={IMAGES.nebulaCar.height}
              sizes="(min-width: 860px) 40vw, 100vw"
            />
          </div>
          <div>
            <h2 id="how-title">Hang it, tilt it, drive</h2>
            <ol className="steps">
              {STEPS.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="story" className="section" aria-labelledby="story-title">
        <div className="wrap story">
          <div className="prose">
            <h2 id="story-title">The ever lingering scent</h2>
            <p>
              Voidescent started with one belief: your car is an extension of who you are. The music you play and the
              route you take all tell a story. The scent you choose should too.
            </p>
            <p>
              We make car hanger fragrances with concentrated fragrance oil, inspired by the mystery and beauty of the
              cosmos. Each bottle is a small scent experience: clean, lingering and easy to love.
            </p>
            <p>
              Three scents, three moods. <strong>Nebula</strong> is soft and floral, <strong>Heavens</strong> is creamy
              sandalwood and <strong>Descent</strong> is sweet coffee and vanilla.
            </p>
            <p>
              <Link href="/pages/about">More about us</Link>
            </p>
          </div>
          <div className="story__media">
            <Image
              src={IMAGES.trio.src}
              alt={IMAGES.trio.alt}
              width={IMAGES.trio.width}
              height={IMAGES.trio.height}
              sizes="(min-width: 860px) 40vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="orbit-title">
        <div className="wrap orbit">
          <div className="orbit__media">
            <Image
              src={IMAGES.mystery.src}
              alt={IMAGES.mystery.alt}
              width={IMAGES.mystery.width}
              height={IMAGES.mystery.height}
              sizes="(min-width: 640px) 30vw, 240px"
            />
          </div>
          <div>
            <h2 id="orbit-title">New scents drop here first</h2>
            <p>Get first access to new scents and restocks.</p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
