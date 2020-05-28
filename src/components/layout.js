import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"

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
    <div
      css={css`
        margin: 0 auto;
        max-width: 900px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
    >
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
      {children}
      <footer
        css={css`
          padding-top: ${rhythm(1)};
          margin-top: ${rhythm(2)};
          border-top: 1px solid hsla(0,0%,0%,0.12);
          font-size: ${rhythm(.575)};
          @media (min-width: 600px) {
            display: flex;
            justify-content: space-between;
          }
        `}>
        <span css={css`display: inline-block; margin-bottom: ${rhythm(.5)};`}>
          ©Blake Lundquist {new Date().getFullYear()}
        </span>
        <ul
          css={css`
            list-style: none;
            margin: 0;
            @media (min-width: 600px) {
             text-align: right;
            }
          `}>
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
}
