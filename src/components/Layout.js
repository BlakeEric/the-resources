import React from "react"
import { css, Global } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"

export const PureLayout = ({ data, children }) => (
  <div css={wrapperStyles}>
    <Global styles={globalStyles} />
    <nav>
      <Link to={`/`}>
        <h3
          css={css`
            margin-bottom: ${rhythm(2)};
            display: inline-block;
            font-style: normal;
          `}
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
      <Link
        to={`/about/`}
        css={css`
          float: right;
        `}
      >
        About
      </Link>
    </nav>
    <div className="page">
      {children}
    </div>
    <footer css={footerStyles}>
      <span>
        ©Blake Lundquist {new Date().getFullYear()}
      </span>
      <ul>
        <li>
          <a href="mailto:blake@blakelundquist.dev">Recommend a resource</a></li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/BlakeEric/the-resources">
            View source code for this website
          </a>
        </li>
      </ul>
    </footer>
  </div>
)

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <PureLayout data={data}>{ children }</PureLayout>
  )
}



const globalStyles = css`
  body {
    min-height: 100vh;
    padding: 0 ${rhythm(.25)};
  }
`


const wrapperStyles = css`
  margin: ${rhythm(.5)} auto;
  max-width: 900px;
  padding: ${rhythm(1)} ${rhythm(.5)};
  background: white;
  @media (min-width: 600px) {
    padding: ${rhythm(1.5)};
  }
  .page {
    min-height: 60vh;
  }
`


const footerStyles = css`
  margin-top: ${rhythm(2)};
  font-size: ${rhythm(.575)};
  @media (min-width: 600px) {
    display: flex;
    justify-content: space-between;
  }
  span {
    display: inline-block;
    margin-bottom: ${rhythm(.25)};
  }
  ul {
    list-style: none;
    margin: 0;
    @media (min-width: 600px) {
     text-align: right;
    }
    li {
      margin-bottom: ${rhythm(.25)};
      line-height: 1.25;
    }
  }
`
