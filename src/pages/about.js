import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

export default function About({ data }) {
  return (
    <Layout>
      <h1>About {data.site.siteMetadata.title}</h1>
      <p>
        This site contains a list of great resources for improving your engineering skills
      </p>
    </Layout>
  )
}


export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
