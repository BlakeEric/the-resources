import React from 'react'
import { css } from '@emotion/core'
import { rhythm } from "../../utils/typography"


export default class Resource extends React.Component {


  componentDidUpdate() {
    if(this.props.isToggled) {
      document.addEventListener('mousedown', this.handleClickOutside);
    } else {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  /**
   * Set Trigger ref
   */
  setTriggerRef = (node) => {
    this.triggerRef = node;
  }

  /**
   * Close detail tab if clicked on outside
   */
  handleClickOutside = (event) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      !this.triggerRef.contains(event.target)
    ) {
      this.props.setToggledItemId(null)
    }
  }

  /**
   * Open detail tab is currently closed, and vice versa
   */
  handleToggle = (e) => {

    e.preventDefault();

    if (this.props.isToggled) {
      this.props.setToggledItemId(null)
    } else {
      this.props.setToggledItemId(this.props.id)
    }
  }

  render() {
    return (
      <tr key={this.props.id} style={{overflow: "visible"}}>
        <td>
        <div className="resourceDetails-wrapper" css={resourceDetailStyles}>
          <a
            href={this.props.frontmatter.url}
            onClick={(e) => this.handleToggle(e)}
            target="_blank" rel="noreferrer noopener"
            ref={this.setTriggerRef}
          >
            {this.props.frontmatter.name}
          </a>
          {this.props.isToggled &&

              <aside
                className={`resourceDetails ${this.props.showDetailsAbove ? 'up' : ''}`}
                ref={this.setWrapperRef}
              >
                <h4>{this.props.frontmatter.name}</h4>
                <div dangerouslySetInnerHTML={{ __html: this.props.html }} />
                <a href={this.props.frontmatter.url} target="_blank" rel="noreferrer noopener">View Now</a>
              </aside>

          }
          </div>
        </td>
        <td>
          {this.props.frontmatter.format}
        </td>
        <td>
          {this.props.frontmatter.focus}
        </td>
        <td>
          {this.props.frontmatter.skillLevel.length === 3 ? 'All' : this.props.frontmatter.skillLevel.join(', ')}
        </td>
      </tr>

    )
  }

}

Resource.defaultProps = {
  isToggled: false,
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
      margin: 0;
    }
  }
`
