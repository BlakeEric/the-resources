import React, { useContext } from "react"
import "./Bookmarks.css"
import { ResourceContext } from '../ResourceContext/ResourceContext'
import { Button } from 'theme-ui'

export default function Bookmarks() {

  const context = useContext(ResourceContext)

  const items = context.resources.filter(item => context.bookmarks.includes(item.node.id))

  return (
    <section className="bookmarks">
      <h3>My Bookmarks</h3>
      {items.length > 0 ?
        <ul>
          {items.map((item, i) =>
            <li key={`bookmarksItem-${i}`} style={{position: "relative"}}>
              <a 
                className="btn-view" 
                href={item.node.frontmatter.url} 
                target="_blank" rel="noreferrer noopener"
              >
                {item.node.frontmatter.name}
              </a> 
              <Button 
                className="btn-remove"
                variant="warning" 
                onClick={() => context.removeFromBookmarks(item.node.id)}
              >×</Button>
            </li>
          )}
        </ul>
      :
        <p>Select and item to bookmark it.</p>
      }
    </section>
  )
}
