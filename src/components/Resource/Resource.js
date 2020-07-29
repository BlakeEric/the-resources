import React, { useContext, useEffect } from 'react'
import { ResourceContext } from '../ResourceContext/ResourceContext'
import { Button } from 'theme-ui'
import { resourceDetailStyles } from "./Resource.styles"

export default function Resource(props) {

  const context = useContext(ResourceContext)

  /**
   * return true if the current item's details should be showing
   */
  const isToggled = context.currentToggledItemId === props.id


  /**
   * return true if the current item's details should be showing
   */
  const isInBookmarks = context.bookmarks.includes(props.id)

  /**
   * add/remove click handler to close detail window
   * when user clicks outside of the container
   */
  useEffect(() => {

    if(isToggled) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Specify how to clean up after this effect:
    return function cleanup() {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  /**
   * Set the wrapper ref
   */
  let wrapperRef;
  const setWrapperRef = (node) => {
    wrapperRef = node;
  }

  /**
   * Set Trigger ref
   */
  let triggerRef;
  const setTriggerRef = (node) => {
    triggerRef = node;
  }

  /**
   * Close detail tab if clicked on outside
   */
  const handleClickOutside = (event) => {
    if (
      wrapperRef &&
      triggerRef &&
      !wrapperRef.contains(event.target) &&
      !triggerRef.contains(event.target)
    ) {
      context.setToggledItemId(null)
    }
  }

  /**
   * Open detail tab is currently closed, and vice versa
   */
  const handleToggle = (e) => {

    e.preventDefault();

    if (isToggled) {
      context.setToggledItemId(null)
    } else {
      context.setToggledItemId(props.id)
    }
  }


  return (
    <tr key={props.id}>
      <td>
        <div className="resourceDetails-wrapper" css={resourceDetailStyles}>
          <a
            href={props.frontmatter.url}
            onClick={(e) => handleToggle(e)}
            target="_blank" rel="noreferrer noopener"
            ref={setTriggerRef}
          >
            {props.frontmatter.name}
          </a>
          {isToggled &&
            <aside
              className={`resourceDetails ${props.showDetailsAbove ? 'up' : ''}`}
              ref={setWrapperRef}
            >
              <h4>{props.frontmatter.name}</h4>
              <div dangerouslySetInnerHTML={{ __html: props.html }} />
              <div className="controls">
                <a className="btn-view" href={props.frontmatter.url} target="_blank" rel="noreferrer noopener">View Now &rarr;</a>
                {isInBookmarks
                  ? <span className="right">Bookmarked! <Button variant="warning" onClick={() => context.removeFromBookmarks(props.id)}>Remove</Button></span>
                  : <Button variant="secondary" className="right" onClick={() => context.addToBookmarks(props.id)}>Add to bookmarks</Button>
                }
              </div>
            </aside>
          }
        </div>
      </td>
      <td>
        {props.frontmatter.format}
      </td>
      <td>
        {props.frontmatter.focus}
      </td>
      <td>
        {props.frontmatter.skillLevel.length === 3 ? 'All' : props.frontmatter.skillLevel.join(', ')}
      </td>
    </tr>
  )

}

Resource.defaultProps = {
  setToggledItemId: () => {}
}


