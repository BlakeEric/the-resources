import React from "react"

export default function ResourceListFilters(props) {

  return (
    <form>
      <h3>Filter!</h3>

      <label htmlFor="searchTerm">
        Name
        <input
          aria-label="Name"
          type="text"
          id="searchTerm"
          name="searchTerm"
          placeholder="search resources"
          value={props.searchTerm || ""}
          onChange={(event) => {props.setSearchTerm(event.target.value)}}
        />
      </label>

      <label htmlFor="resourceSkillLevel">Skill Level</label>
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

      <label htmlFor="resourceFormat">Format</label>
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

      <label htmlFor="resourceFocus">Focus</label>
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

    </form>
  )
}
