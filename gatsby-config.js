module.exports = {
  siteMetadata: {
    title: "Dmitry Anisov Blog",
    siteUrl: `https://www.dimanis.dev`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Space Grotesk",
              variants: ["300", "400", "500", "600", "700", "800", "900"],
              fontDisplay: 'swap',
            },
            {
              family: "Fira Code",
              variants: ["400"],
              fontDisplay: 'swap',
            }
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [],
      },
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
