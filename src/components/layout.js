import * as React from "react";
import styled from "styled-components";

import Header from "./header";
import Footer from "./footer";
import { useSiteMetadata } from "../hooks/useSiteMetadata";
import { SEO } from "./SEO";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex: 1;
`;

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
    <Container>
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
    </Container>
  )
}

export default Layout;
