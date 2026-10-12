import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found | Ombaka for Dagoretti North MP</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="bg-cream-soft py-20 sm:py-28">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-berry">
            404
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink">
            We couldn&rsquo;t find that page
          </h1>
          <p className="mt-4 text-ink/80">
            The link may be old or mistyped. Ukurasa huu haupatikani.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn-primary">
              Go to the homepage
            </Link>
            <Link to="/get-involved" className="btn-secondary">
              Get involved
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
