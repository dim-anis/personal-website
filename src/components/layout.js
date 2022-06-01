import * as React from "react";

import Header from "./header";
import Footer from "./footer";
import { useSiteMetadata } from "../hooks/useSiteMetadata";
import { SEO } from "./SEO/SEO";

const Layout = ({ children, pageTitle }) => {

  const {
    description,
    image,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
  } = useSiteMetadata();

  return (
    <>
      <SEO 
        title={pageTitle}
        description={description || null}
        image={image || null}
        pathname={siteUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
      />
      <Header /> 
      {children}
      <Footer />
    </>
  )
}

export default Layout;
