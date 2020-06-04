import React, { Component } from 'react';
import { css } from '@emotion/core'
import { rhythm } from "../utils/typography"

/**
 * Component that alerts if you click outside of it
 */
export default class ResourceDetail extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }


  /**
 * Alert if clicked on outside of element
 */
handleClickOutside = (event) => {
  if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
    this.props.onClickOutside(event)
  }
}

  render() {
    return (
      <aside className="resourceDetails" css={resourceDetailStyles} ref={this.setWrapperRef}>
        <h4>{this.props.name}</h4>
        <div dangerouslySetInnerHTML={{ __html: this.props.html }} />
        <a href={this.props.url} target="_blank" rel="noreferrer noopener">View Now</a>
      </aside>
    )
  }
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
  z-index: 1000;
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
