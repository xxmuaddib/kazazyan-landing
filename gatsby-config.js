/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Haik Kazazyan`,
    siteUrl: `https://www.yourdomain.tld`,
    image: `/src/images/logo.svg`,
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "2WI7Oc_IDSeCBh3mkUJ2jZEIfXA48TT4p_XqLBAgNLo",
        spaceId: "rkkxen7p7pv8",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Bricolage Grotesque",
              variants: ["100", "300", "400", "500", "700", "900"],
              display: "swap",
            },
          ],
        },
        formats: ["woff2", "woff"],
        usePreload: true,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.png",
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
