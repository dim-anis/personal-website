import * as React from "react";

import Header from "./header";
import Footer from "./footer";
import { useSiteMetadata } from "../hooks/useSiteMetadata";
import { SEO } from "./SEO/SEO";

const Layout = ({ 
  children, 
  pageTitle, 
  article, 
  description, 
  url, 
  datePublished, 
  dateModified, 
  image }) => {

  const defaults = useSiteMetadata();
  
  return (
    <>
      <SEO 
        title={pageTitle}
        description={description || defaults.description}
        image={image || defaults.image || null}
        url={url ? url : defaults.siteUrl}
        siteLanguage={defaults.siteLanguage}
        siteLocale={defaults.siteLocale}
        twitterUsername={defaults.twitterUsername}
        article={article ? true : false}
        datePublished={datePublished}
        dateModified={dateModified}
      />
      <Header /> 
      {children}
      <Footer />
    </>
  )
}

export default Layout;
