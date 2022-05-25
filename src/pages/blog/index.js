import * as React from "react";
import Layout from "../../components/layout.js";
import Main from "../../components/main";
import PostPreview from "../../components/postPreview";
import { graphql } from "gatsby";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="Blog">
      <Main title="Blog">
        {data.allMdx.nodes.map((item) => (
          <PostPreview
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
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          description
          title
        }
        id
        slug
      }
    }
  }
`;

export default BlogPage;
