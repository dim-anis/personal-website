import * as React from "react";

import styled from "styled-components";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import Layout from "../../components/layout";
import ArticleHero from "../../components/articleHero";
import { P, H2, H3, BlockQuote, InlineCode, UL, LI, A } from "../../components/mdxComponents/mdxComponents";
import CodeBlock from "../../components/mdxComponents/CodeBlock";

import { useSiteMetadata } from "../../hooks/useSiteMetadata";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colorBackground};
  overflow: auto;
  border-radius: 5px;
  margin-bottom: 1.5rem;

  pre[class*='language-'] {
    background-color: transparent;
    float: left;
    min-width: 100%;
  }
`;

const components = {
  p: P,
  h2: H2,
  h3: H3,
  ul: UL,
  li: LI,
  a: A,
  blockquote: BlockQuote,
  pre: (props) => <Wrapper {...props} />,
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
  const defaults = useSiteMetadata();
  
  const path = location.href ? location.pathname : "";

  return (
    <Layout
      pageTitle={data.mdx.frontmatter.title}
      description={data.mdx.frontmatter.description}
      url={`${defaults.siteUrl}${path}`} 
      article={true}
      datePublished={data.mdx.frontmatter.datePublished}
      dateModified={data.mdx.frontmatter.dateModified}
      //image={}
    >
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
        datePublished
        dateModified
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
