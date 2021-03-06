import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          buildTime(formatString: "YYYY-MM-DD")
          siteMetadata {
            description
            title
            image
            siteUrl
            siteLanguage
            siteLocale
            authorName
            social {
              twitter
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}

