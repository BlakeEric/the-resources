/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

 module.exports = {
   siteMetadata: {
      title: "TheResources.dev",
      titleTemplate: "%s",
      description: "One-up your coding skills and industry know-how using these free tools, courses, and articles.",
      url: "https://theresources.dev", // No trailing slash allowed!
      image: "src/images/icon.png", // Path to your image you placed in the 'static' folder
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
