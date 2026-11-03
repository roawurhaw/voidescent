import { IS_PREVIEW, SITE } from "@/lib/site";

// Makes it obvious this deployment is a redesign draft, not the shop itself.
export function PreviewBar() {
  if (!IS_PREVIEW) return null;
  return (
    <div className="preview-bar" role="note">
      Redesign preview. To order, visit <a href={SITE.url}>voidescent.com</a>.
    </div>
  );
}
