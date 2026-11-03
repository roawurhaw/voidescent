import Image from "next/image";
import { IMAGES } from "@/lib/images";

// The bottle hangs from the top of the hero the way it hangs from a mirror.
// On load it swings and settles, then keeps a slow sway, as it does on a drive.
// Both stop for people who prefer reduced motion.
export function HangingBottle() {
  const img = IMAGES.heroBottle;
  return (
    <div className="hang">
      <span className="hang__glow" aria-hidden="true" />
      <div className="hang__swing">
        <div className="hang__inner">
          <span className="hang__cord" aria-hidden="true" />
          <div className="hang__bottle">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              priority
              sizes="(min-width: 860px) 400px, 52vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
