import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap not-found">
      <h1>Lost in the void</h1>
      <p>This page doesn&rsquo;t exist, or it moved.</p>
      <Link href="/collections/scents" className="button">
        Shop the scents
      </Link>
    </div>
  );
}
