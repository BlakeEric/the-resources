import React from "react"
import { Link } from "gatsby"
import { Global, css } from '@emotion/core'
import typography from "../utils/typography"

export default function ResourceList({ resources }) {
  return (
    <table id="resources">
      <Global
        styles={css`
          table {
            font-size: ${typography.rhythm(.575)};
          }
          th {
            font-family: ${typography.options.headerFontFamily.toString()};
          }
          th, td {
            padding-top: 0.25rem;
            padding-bottom: calc(0.25rem - 1px);
          }
        `}
      />
      <thead>
        <tr>
          <th>Name</th>
          <th>Focus</th>
          <th css={css`
            text-align: right;
          `}>Format</th>
        </tr>
      </thead>
      <tbody>
        {resources.map(({ node }) => (
          <tr key={node.id}>
            <td>
              <Link to={node.fields.slug} >
                {node.frontmatter.title}
              </Link>
            </td>
            <td>
              <Link to={node.fields.slug} >
                {node.frontmatter.focus}
              </Link>
            </td>
            <td css={css`
              text-align: right;
            `}>
              <Link to={node.fields.slug} >
                {node.frontmatter.format}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
