import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1 css={css`display: inline-block; margin-right: ${rhythm(.25)}`}>{post.frontmatter.title}</h1>
        <a target="_blank" rel="noopener noreferrer" href={post.frontmatter.url}>[View]</a>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
        title
        url
      }
    }
  }
`
