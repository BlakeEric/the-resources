import React from 'react'
// import { Link } from "gatsby"
import { css } from '@emotion/core'
import { rhythm } from "../utils/typography"

export default function Resource(props) {

  const handleClick = (e) => {
    e.preventDefault();

    if (props.isToggled) {
      props.setToggledItemId(null)
    } else {
      props.setToggledItemId(props.id)
    }
  }


  return (
    <tr key={props.id}>
      <td>
        <a href="#resources" onClick={(e) => handleClick(e)}>
          {props.frontmatter.name}
        </a>
        {props.isToggled &&
          <div css={css`position: relative`}>
            <aside className="resourceDetails" css={resourceDetailStyles}>
              <h4>{props.frontmatter.name}</h4>
              <div dangerouslySetInnerHTML={{ __html: props.html }} />
              <a href={props.frontmatter.url}>View Now</a>
            </aside>
          </div>
        }
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
  isToggled: false,
  setToggledItemId: () => {}
}

const resourceDetailStyles = css`
  position: absolute;
  left: 0;
  max-width: 90vw;
  width: 300px;
  top: 5px;
  left: -${rhythm(.25)};
  background: white;
  border-radius: 5px;
  box-shadow: 2px 2px 12px 1px rgba(0,0,0,0.25);
  padding: ${rhythm(.25)};
  z-index: 10000;
  border: 1px solid #e4e4e4;
  &:after {
    content: "";
    height: 12px;
    width: 12px;
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    transform: rotate(-45deg);
    transform-origin: 0 0;
    left: ${rhythm(1)};
    border-right: 1px solid #e4e4e4;
    border-top: 1px solid #e4e4e4;
  }
  h4 {
    margin-bottom: ${rhythm(.25)};
  }
  p {
    color: black;
  }
  p:last-child {
    margin: 0;
  }
`
