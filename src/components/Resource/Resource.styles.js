import { css } from '@emotion/core'
import { rhythm } from "../../utils/typography"

export const resourceDetailStyles = css`
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
    padding: ${rhythm(.5)};
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
      margin: 0;
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
    button, span {
      display: inline-block;
      font-size: 13px;
    }
    .right {
        float: right;
    }
  }
`