import * as React from "react";
import { Helmet } from "react-helmet";

import { useSiteMetadata } from "../../hooks/useSiteMetadata"

const SchemaOrg = ({ article, datePublished, dateModified, url, description, title, image }) => {

  const defaults = useSiteMetadata();

  const schemaWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: defaults.url,
    headline: defaults.title,
    inLanguage: defaults.siteLanguage,
    mainEntityOfPage: defaults.siteUrl,
    description: defaults.description,
    name: defaults.title,
    author: {
      '@type': 'Person',
      name: defaults.authorName,
    },
    copyrightHolder: {
      '@type': 'Person',
      name: defaults.authorName,
    },
    copyrightYear: '2022',
    creator: {
      '@type': 'Person',
      name: defaults.authorName,
    },
    publisher: {
      '@type': 'Person',
      name: defaults.authorName,
    },
    datePublished: '',
    dateModified: defaults.buildTime,
    image: {
      '@type': 'ImageObject',
      url: `${defaults.siteUrl}${defaults.image}`,
    },
  }

  let schemaBlogPosting = null;

  if (article) {
    schemaBlogPosting = {
      ...schemaWebPage,
      '@type': 'BlogPosting',
      datePublished: datePublished,
      dateModified: dateModified,
      description: description,
      headline: title,
      url: url,
      name: title,
      image: {
        '@id': 'ImageObject',
        name: image
      },
      mainEntityOfPage: url
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(article ? schemaBlogPosting : schemaWebPage)}</script>
    </Helmet>
  )
}

export default SchemaOrg;

