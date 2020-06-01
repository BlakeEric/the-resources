import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

export default function ResourceListFilters(props) {
  const hasActiveFilters =
    props.searchTerm ||
    props.selectedFormat ||
    props.selectedFocus ||
    props.selectedSkillLevel;

  return (
    <form css={styles}>
      <fieldset>
        <legend>
          Filter
          {hasActiveFilters &&
            <button className="btn-clearFilters" onClick={props.clearFilters}>
              × Clear All
            </button>
          }
        </legend>

        <label htmlFor="searchTerm">
          Name
          <input
            aria-label="Name"
            type="text"
            id="searchTerm"
            name="searchTerm"
            placeholder="Start typing..."
            value={props.searchTerm || ""}
            onChange={(event) => {props.setSearchTerm(event.target.value)}}
          />
        </label>

        <label htmlFor="resourceFormat">
          Format
          <select
            id="resourceFormat"
            name="resourceFormat"
            onChange={(event) => {props.setSelected('selectedFormat', event.target.value)}}
            value={props.selectedFormat || ""}
          >
            <option value="">All</option>
            {props.formats.map((format, i) =>
              <option key={`format-${i}`} value={format}>{format}</option>)
            }
          </select>
        </label>

        <label htmlFor="resourceFocus">
          Focus
          <select
            id="resourceFocus"
            name="resourceFocus"
            onChange={(event) => {props.setSelected('selectedFocus', event.target.value)}}
            value={props.selectedFocus || ""}
          >
            <option value="">All</option>
            {props.focuses.map((focus, i) =>
              <option key={`focus-${i}`} value={focus}>{focus}</option>)
            }
          </select>
        </label>

        <label htmlFor="resourceSkillLevel">
          Skill Level
          <select
            id="resourceSkillLevel"
            name="resourceSkillLevel"
            onChange={(event) => {props.setSelected('selectedSkillLevel', event.target.value)}}
            value={props.selectedSkillLevel || ""}
          >
            <option value="">All</option>
            {props.skillLevels.map((skillLevel, i) =>
              <option key={`skillLevel-${i}`} value={skillLevel}>{skillLevel}</option>)
            }
          </select>
        </label>

      </fieldset>
    </form>
  )
}

const styles = css`
  font-size: ${rhythm(.55)};
  margin: auto -${rhythm(.5)};
  @media (min-width: 600px) {
    position: sticky;
    top: 0;
    z-index: 10000;
  }
  fieldset {
    color: white;
    border-radius: 5px;
    background-color: #6aa7fa;
    background-image: linear-gradient(to bottom right, #6aa7fa, #7b4caf);
    padding: ${rhythm(.25)};
    border: none;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05);
    legend {
      width: 100%;
      float: left;
      padding: 0 ${rhythm(.25)};
      font-size: ${rhythm(.5)};
      letter-spacing: 1px;
      line-height: 1.5;
      border-radius: 5px;
      text-transform: uppercase;
      button.btn-clearFilters {
        margin-left: 12px;
        display: inline;
        padding: 2px .25rem;
        background-color: #0acc9e;
        background-image: linear-gradient(to bottom right, #37e6bd, #0acc9e);
        border: 1px solid transparent;
        color: white;
        border-radius: 3px;
        font-size: ${rhythm(.5)};
        line-height: 1;
        &:hover, &:focus {
          border: 1px solid #048e6d;
        }
      }
    }
  }
  label {
    width: 50%;
    display: inline-block;
    padding: ${rhythm(.25)};
    @media (min-width: 600px) {
      width: 25%;
    }
  }
  input, select {
    width: 100%;
    height: 30px;
    border-color: white;
    background: white;
    box-shadow: none;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    border: 1.5px solid white;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05);
  }
`
