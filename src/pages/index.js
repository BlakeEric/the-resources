import React from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default function Home({ data }) {
  return (
    <Layout>
      <main>
        <table>
          <tr>
            <th>Name</th>
            <th css={css`
              text-align: right;
            `}>Type</th>
          </tr>
          <tbody>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <tr key={node.id}>
                <td>
                  <Link to={node.fields.slug} >
                    {node.frontmatter.title}
                  </Link>
                </td>
                <td css={css`
                  text-align: right;
                `}>
                  <Link to={node.fields.slug} >
                    {node.frontmatter.type}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            type
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
