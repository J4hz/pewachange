import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found | Ombaka for Dagoretti North MP</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="bg-paper py-24 sm:py-32">
        <div className="shell max-w-xl text-center">
          <img src="/logo-mark.png" alt="" width={96} height={96} className="mx-auto h-24 w-24" />
          <h1 className="heading mt-6 text-4xl sm:text-5xl">
            We couldn&rsquo;t find that page
          </h1>
          <p className="mt-4 text-lg text-ink/75">
            The link may be old or mistyped. Ukurasa huu haupatikani.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
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
