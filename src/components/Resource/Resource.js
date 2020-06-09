import React, { useContext, useEffect } from 'react'
import { css } from '@emotion/core'
import { rhythm } from "../../utils/typography"
import { ResourceContext } from '../ResourceContext/ResourceContext'


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
    <tr key={props.id} style={{overflow: "visible"}}>
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
                  ? <span style={{float: "right"}}>Bookmarked! <button className="btn-remove" onClick={() => context.removeFromBookmarks(props.id)}>Remove</button></span>
                  : <button className="btn-add" onClick={() => context.addToBookmarks(props.id)}>Add to bookmarks</button>
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

const resourceDetailStyles = css`
  position: relative;
  .resourceDetails {
    position: absolute;
    left: 0;
    max-width: 90vw;
    width: 300px;
    top: 110%;
    left: -${rhythm(.25)};
    background: white;
    border-radius: 5px;
    box-shadow: 2px 2px 12px 1px rgba(0,0,0,0.25);
    padding: ${rhythm(.25)};
    z-index: 1000;
    border: 1px solid #e4e4e4;
    &:after {
      content: "";
      height: 12px;
      width: 12px;
      position: absolute;
      top: 0;
      background: white;
      transform: rotate(-45deg);
      transform-origin: 0 0;
      left: ${rhythm(.5)};
      border-right: 1px solid #e4e4e4;
      border-top: 1px solid #e4e4e4;
    }
    &.up {
      top: auto;
      bottom: 110%;
      &:after {
        top: auto;
        bottom: 0;
        transform: rotate(45deg);
        transform-origin: 0 100%;
        border-right: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        border-top: 0;
      }
    }
    h4 {
      margin-bottom: ${rhythm(.25)};
    }
    p {
      color: black;
    }
    p:last-child {
      margin-bottom: ${rhythm(.5)};
    }
    .btn-view {
      padding-right: ${rhythm(.25)};
    }
    .btn-add {
      float:right;
      padding-right: ${rhythm(.25)};
      background-image: linear-gradient(to bottom right, #37e6bd, #0acc9e);
      border: none;
      padding: 0 ${rhythm(.25)};
      color: white;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05);
      border-radius: 3px;
    }
    .btn-remove {
      padding-right: ${rhythm(.25)};
      background-image: linear-gradient(to bottom right, #ce3030, #ef6666);
      border: none;
      padding: 0 ${rhythm(.25)};
      color: white;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05);
      border-radius: 3px;
    }
  }
`
