import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useSiteMetadata } from "../../hooks/useSiteMetadata"
import SchemaOrg from "./SchemaOrg"

export const SEO = (
  { 
    description, 
    lang, 
    meta, 
    title, 
    image, 
    url, 
    article, 
    datePublished, 
    dateModified, 
  }) => {
  const defaults = useSiteMetadata();

  const metaDescription = description || defaults.description
  const defaultTitle = defaults?.title

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
        link={[
          { rel: `icon`, content: `/favicon.ico`, sizes: `any` },
          { rel: `icon`, content: `/icon.svg`, type: `image/svg+xml` },
          { rel: `apple-touch-icon`, content: `/apple-touch-icon.png` },
          { rel: `manifest`, content: `/manifest.webmanifest` }
        ]}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property:`og:url`,
            content: url
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:image`,
            content: image || defaults.image,
          },
          {
            property: `og:image:alt`,
            content: description
          },
          {
            property: `og:type`,
            content: article ? `article` : `website`,
          },
          {
            property: `og:site_name`,
            content: `Dmitry Anisov`
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: defaults?.social?.twitter || ``,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          {
            name: `twitter:image`,
            content: image,
          },
          {
            name: `twitter:image:alt`,
            content: metaDescription
          }
        ].concat(meta)}
      />
    <SchemaOrg 
      article={article} 
      datePublished={datePublished} 
      dateModified={dateModified} 
      url={url} 
      description={description} 
      title={title} 
      image={image} />
    </>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}