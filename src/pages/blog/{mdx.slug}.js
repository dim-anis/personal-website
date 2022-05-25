import * as React from "react";
import Layout from "../../components/layout";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import styled from "styled-components";
import ArticleHero from "../../components/articleHero";

import { SEO } from "../../components/SEO";

import { P, H2, H3, CodeBlock, BlockQuote, InlineCode, UL, LI, A } from "../../components/mdxComponents";
import { useSiteMetadata } from "../../hooks/useSiteMetadata";

const components = {
  p: P,
  h2: H2,
  h3: H3,
  ul: UL,
  li: LI,
  a: A,
  blockquote: BlockQuote,
  pre: (props) => <div {...props} />,
  code: CodeBlock,
  "p.inlineCode": InlineCode,
};

const Main = styled.main`
  width: 100%;
  padding: 2rem 1rem;
  max-width: 675px;
  margin: auto;
`;

const BlogPost = ({ data, location }) => {
  const { 
    siteUrl
  } = useSiteMetadata();
  
  //removing an extra "/" from the "path" variable
  const path = location.href ? location.pathname.slice(1) : "";

  return (
    <Layout
      pageTitle={data.mdx.frontmatter.title}
    >
      <SEO 
        description={data.mdx.frontmatter.description}
        title={data.mdx.frontmatter.title} 
        url={`${siteUrl}${path}`} 
        type={"article"}
      />
      <Main>
        <ArticleHero
          title={data.mdx.frontmatter.title}
          subtitle={data.mdx.frontmatter.subtitle}
          tags={data.mdx.frontmatter.tags}
        />
        <MDXProvider components={components}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </MDXProvider>
      </Main>
    </Layout>
  );
};

export const query = graphql`
  query MyQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date
        description
        title
        subtitle
        tags
      }
      id
      body
    }
  }
`;

export default BlogPost;
