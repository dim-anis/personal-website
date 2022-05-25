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
            title={item.frontmatter.title}
            description={item.frontmatter.date}
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
          date
          title
        }
        id
        slug
      }
    }
  }
`;

export default IndexPage;
