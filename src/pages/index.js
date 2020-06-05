import React from "react"
import { graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import { css } from '@emotion/core'
import Layout from "../components/Layout/Layout"
import Seo from "../components/Seo/Seo"
import ResourceList from "../components/ResourceList/ResourceList"

export default function Home({ data }) {
  return (
    <Layout>
      <Seo />
      <header css={headerStyles}>
        <h2>One-up your coding skills and industry know-how using these free tools, courses, and articles.</h2>
        <p>Know a resource that should be added to the list?<a className="btn btn-gray" href="mailto:blake@blakelundquist.dev?subject=A new resource for theresources.dev!">recommend a resource</a></p>
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
  padding: ${rhythm(1)} 0;
  @media (min-width: 700px) {
    padding: ${rhythm(2)} 0;
  }
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
    &.btn-gray {
      display: block;
      margin-top: ${rhythm(1)};
      background: #f3f3f4;
      color: #1d1f20;
    }
  }
`

export const query = graphql`
  query {
    resources: allMarkdownRemark(sort: { fields: [frontmatter___name], order: ASC }) {
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
