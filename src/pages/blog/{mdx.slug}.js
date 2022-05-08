import * as React from "react";
import Layout from "../../components/layoutMain";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import styled from "styled-components";
import ArticleHero from "../../components/articleHero";

import { P, H2, CodeBlock, BlockQuote, InlineCode } from "../../components/mdxComponents";

const components = {
  p: P,
  h2: H2,
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

const BlogPost = ({ data }) => {
  return (
    <Layout
      pageTitle={data.mdx.frontmatter.title}
    >
      <Main>
				<ArticleHero
          title={data.mdx.frontmatter.title}
          subtitle={"subtitle"}
          tag={"javascript"}
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
      }
      id
      body
    }
  }
`;

export default BlogPost;
