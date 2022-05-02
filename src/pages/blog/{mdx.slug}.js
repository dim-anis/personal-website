import * as React from "react";
import Layout from "../../components/layoutMain";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import styled from "styled-components";

import { P, H2, CodeBlock } from "../../components/mdxComponents";

const components = {
  p: P,
  h2: H2,
  pre: (props) => <div {...props} />,
  code: CodeBlock,
};

const Main = styled.main`
  width: 100%;
  padding: 2rem 1rem;
  max-width: 675px;
  margin: auto;
`;

const StyledH1 = styled.h1`
	font-size: calc(2.5rem);
	text-align: center;
	margin-top: 1rem;
	margin-bottom: 2rem;
`;

const BlogPost = ({ data }) => {
  return (
    <Layout
      pageTitle={data.mdx.frontmatter.title}
    >
      <Main>
				<StyledH1>{data.mdx.frontmatter.title}</StyledH1>
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
