import { Helmet } from "react-helmet-async";
import { siteUrl, candidate } from "@/config/site";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  /** Defaults to /og-image.jpg (1200x630 share card — see README). */
  image?: string;
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: candidate.fullName,
  alternateName: candidate.brandName,
  jobTitle: `Candidate for ${candidate.office}`,
  url: siteUrl,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: `${candidate.brandName} ${candidate.electionYear} Campaign`,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
};

export function SEO({ title, description, path, image = "/og-image.jpg" }: SEOProps) {
  const url = `${siteUrl}${path}`;
  const fullTitle = `${title} | ${candidate.brandName} for Dagoretti North MP`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      <script type="application/ld+json">
        {JSON.stringify(personJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationJsonLd)}
      </script>
    </Helmet>
  );
}
