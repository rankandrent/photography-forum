import Link from "next/link";

export default function NotFound() {
  return (
    <section className="phero">
      <div className="container">
        <span className="tk-eyebrow phero__eyebrow">404</span>
        <h1>This page doesn&apos;t exist</h1>
        <p className="phero__sub">The page may have moved. Try the services list or go back home.</p>
        <div className="hero__actions">
          <Link href="/" className="btn">Back to home</Link>
          <Link href="/services/" className="btn btn--outline">View services</Link>
        </div>
      </div>
    </section>
  );
}
