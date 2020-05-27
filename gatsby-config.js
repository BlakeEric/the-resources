/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

 module.exports = {
   siteMetadata: {
      title: "TheResources.dev",
    },
   plugins: [
     `gatsby-plugin-emotion`,
     `gatsby-transformer-remark`,
     // `gatsby-plugin-preact`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `src`,
          path: `${__dirname}/src/resources`,
        },
      },
      {
        resolve: `gatsby-plugin-typography`,
        options: {
         pathToConfigModule: `src/utils/typography`,
        },
      },
   ],
 }
