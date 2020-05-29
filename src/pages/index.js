import React from "react"
import { graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Layout from "../components/Layout"
import ResourceList from "../components/ResourceList"

export default function Home({ data }) {
  return (
    <Layout>
      <header style={{textAlign: "center", padding: `${rhythm(3)} 0`}}>
        <h2>One-up your coding skills and industry knowhow using these great tools, courses, and articles.</h2>
        <p><a href="#resources"><strong>View the resources</strong></a> or <a href="mailto:blake@blakelundquist.dev"><strong>recommend a resource</strong></a></p>
      </header>
      <main>
        <ResourceList resources={data.allMarkdownRemark.edges} />
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [fields___slug], order: ASC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            format
            focus
            skillLevel
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
