import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Header from "../components/header";

const Layout = ({ pageTitle, title, nowaves, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <title>{pageTitle} | {data.site.siteMetadata.title}</title>
      <Header />
      {children}
    </div>
  )
}

export default Layout;
