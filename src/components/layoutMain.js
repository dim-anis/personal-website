import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = ({ pageTitle, title, children }) => {
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
    <>
      <title>{pageTitle} | {data.site.siteMetadata.title}</title>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout;
