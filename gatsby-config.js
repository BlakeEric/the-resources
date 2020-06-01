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
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `TheResources.dev`,
          short_name: `TheResources.dev`,
          start_url: `/`,
          background_color: `#f7f0eb`,
          theme_color: `#0acc9e`,
          display: `standalone`,
          icon: `src/images/icon.png`,
        },
      },
   ],
 }
