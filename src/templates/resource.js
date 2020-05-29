import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

export default function Resource({ data }) {
  const resource = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{resource.frontmatter.name}</h1>
        <a css={css`display: inline-block;margin-bottom: ${rhythm(.5)}`} target="_blank" rel="noopener noreferrer" href={resource.frontmatter.url}>View &rarr;</a>
        <div dangerouslySetInnerHTML={{ __html: resource.html }} />
      </div>
      <Link to="/">&larr; Back</Link>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        name
        url
      }
    }
  }
`
