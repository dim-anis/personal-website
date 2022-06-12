const siteMetadata = {
  title: "Dmitry Anisov Blog",
  description: "Trying to make the WEB a better place and sharing what I'm learning while doing that.",
  image: "",
  siteUrl: "https://www.dimanis.dev",
  siteLanguage: "en-US",
  siteLocale: "en_us",
  social: {
    twitter: "@DmitryAnisov"
  },
  authorName: "Dmitry Anisov",
}

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-transformer-remark",
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/fonts/*': [
            'Cache-Control: public',
            'Cache-Control: max-age=365000000',
            'Cache-Control: immutable',
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          posts: require.resolve(`./src/pages/blog/{mdx.slug}.js`)
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path:`${__dirname}/posts`,
      }
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /icons/
        }
      }
    },
  ],
};
