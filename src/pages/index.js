import React from "react"
import { graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import { css } from '@emotion/core'
import Layout from "../components/Layout"
import ResourceList from "../components/ResourceList"

export default function Home({ data }) {
  return (
    <Layout>
      <header css={headerStyles}>
        <h2>One-up your coding skills and industry knowhow using these great tools, courses, and articles.</h2>
        <p><a className="btn btn-accent" href="#resources">View the resources</a> or <a className="btn btn-gray" href="mailto:blake@blakelundquist.dev">recommend a resource</a></p>
      </header>
      <main>
        <ResourceList
          resources={data.resources.edges}
          formats={data.formatData.distinct}
          focuses={data.focusData.distinct}
          skillLevels={data.skillLevelData.distinct}
        />
      </main>
    </Layout>
  )
}


const headerStyles = css`
  text-align: center;
  padding: ${rhythm(2)} 0;
  main {
    padding: 0 ${rhythm(.5)}
  }
  h2 {
    line-height: 1.5;
  }
  a.btn {
    display: block;
    margin: auto;
    max-width: 300px;
    @media (min-width: 600px) {
      display: inline-block;
    }
    text-transform: lowercase;
    transition: all 0.2s ease;
    font-size: ${rhythm(.5)};
    letter-spacing: 1px;
    line-height: 1.5;
    border-radius: 5px;
    text-transform: uppercase;
    text-decoration: none;
    padding: ${rhythm(.3)} ${rhythm(.5)};
    opacity: 1;
    &:hover, &:focus {
      opacity: .85;
    }
    &.btn-accent {
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05);
      background-color: #6aa7fa;
      background-image: linear-gradient(to bottom right, #6aa7fa, #7b4caf);
      color: white;
    }
    &.btn-gray {
      background: #f3f3f4;
      color: #1d1f20;
    }
  }
`

export const query = graphql`
  query {
    resources: allMarkdownRemark(sort: { fields: [fields___slug], order: ASC }) {
      totalCount
      edges {
        node {
          id
          html
          frontmatter {
            url
            name
            format
            focus
            skillLevel
          }
          fields {
            slug
          }
        }
      }
    },
    focusData: allMarkdownRemark {
      distinct(field: frontmatter___focus)
    },
    formatData: allMarkdownRemark {
      distinct(field: frontmatter___format)
    }
    skillLevelData: allMarkdownRemark {
      distinct(field: frontmatter___skillLevel)
    }
  }
`
