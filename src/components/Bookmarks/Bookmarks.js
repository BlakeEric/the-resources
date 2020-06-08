import React, { useContext } from "react"
import { css } from '@emotion/core'
import { rhythm } from "../../utils/typography"
import { ResourceContext } from '../ResourceContext/ResourceContext'

export default function Bookmarks() {

  const context = useContext(ResourceContext)

  const items = context.resources.filter(item => context.bookmarks.includes(item.node.id))

  return (
    <section className="bookmarks" css={styles}>
      <h3>My Bookmarks</h3>
      {items.length > 0 ?
        <ul>
          {items.map((item, i) =>
            <li key={`bookmarksItem-${i}`}>
              <a className="btn-view" href={item.node.frontmatter.url} target="_blank" rel="noreferrer noopener">{item.node.frontmatter.name}</a> <button className="btn-remove" onClick={() => context.removeFromBookmarks(item.node.id)}>×</button>
            </li>
          )}
        </ul>
      :
        <p>Select and item to bookmark it.</p>
      }

    </section>
  )
}

const styles = css`
  position: sticky;
  top: calc(50% - 20%);
  width: 300px;
  max-width: 100%;
  border-radius: 5px;
  padding: ${rhythm(.25)} ${rhythm(.325)};
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05);
  border: 1px solid #eaeaea;
  h3 {
    letter-spacing: 1px;
    line-height: 1.5;
    border-radius: 5px;
    text-transform: uppercase;
    font-weight: 300;
    margin-bottom: ${rhythm(.25)};
    font-size: ${rhythm(.5)};
  }
  p {
    margin-bottom: 0;
    font-size: ${rhythm(.525)};
  }
  ul {
    font-size: ${rhythm(.525)};
    list-style: none;
    margin: 0;
    display: block;
  }
  li {
    width: 100%;
    margin: 0;
    display: block;
    border-bottom: 1px solid #eaeaea;
    position: relative;
    line-height: 1.25;
    padding: ${rhythm(.125)} 23px ${rhythm(.25)} 0;
    &:last-child {
      border-bottom: none;
    }
  }
  .btn-remove {
    position: absolute;
    right: 0;
    height: 22px;
    width: 22px;
    background: white;
    border: none;
    padding: 0;
    text-align: center;
    margin-left: ${rhythm(.125)};
    color: #ce3030;
    border-radius: 50%;
    &:hover, &:focus {
      background-image: linear-gradient(to bottom right,#ce3030,#ef6666);
      color: white;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05);
    }
  }
`
