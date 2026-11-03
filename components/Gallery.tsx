"use client";

import Image from "next/image";
import { useState } from "react";
import type { Img } from "@/lib/images";

export function Gallery({ images, name }: { images: Img[]; name: string }) {
  const [index, setIndex] = useState(0);
  const current = images[index];
  return (
    <div className="gallery">
      <div className="gallery__main">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          sizes="(min-width: 960px) 50vw, 100vw"
          priority={index === 0}
        />
      </div>
      {images.length > 1 && (
        <div className="gallery__thumbs" role="group" aria-label={`${name} photos`}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className="gallery__thumb"
              aria-pressed={i === index}
              aria-label={`Show photo ${i + 1}: ${img.alt}`}
              onClick={() => setIndex(i)}
            >
              <Image src={img.src} alt="" width={img.width} height={img.height} sizes="88px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
