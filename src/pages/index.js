import * as React from "react";
import Layout from "../components/layout";
import Main from "../components/main";
import PostPreview from "../components/postPreview";
import { graphql } from "gatsby";

const IndexPage = ({ data }) => {
  return (
    <Layout pageTitle="Latest">
      <Main title="Latest">
        {data.allMdx.nodes.map((item) => (
          <PostPreview
            key={item.id}
            title={item.frontmatter.title}
            description={item.frontmatter.description}
            to={`/blog/${item.slug}`}
          />
        ))}
      </Main>
    </Layout>
  );
};

export const data = graphql`
  query {
    allMdx(sort: {fields: frontmatter___datePublished, order: DESC}) {
      nodes {
        frontmatter {
          title
          description
        }
        id
        slug
      }
    }
  }
`;

export default IndexPage;
