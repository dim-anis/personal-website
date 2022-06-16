const siteMetadata = {
  title: "Dmitry Anisov Blog",
  description: "Trying to make the web a better place and sharing what I'm learning while doing that.",
  image: "/og-image.png",
  siteUrl: "http://dmitryanisov.com",
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
    "gatsby-plugin-advanced-sitemap",
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `${siteMetadata.siteUrl}`,
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml}`,
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-netlify`,
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
      // options: {
      //   gatsbyRemarkPlugins: [
      //     {
      //       resolve: `gatsby-remark-autolink-headers`,
      //       options: {
      //         icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="100%" viewBox="0 0 640 512"><title>Link</title><path d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z"/></svg>`
      //       }
      //     }
      //   ]
      // }
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
