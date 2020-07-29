import React, { useContext } from "react"
import "./Filters.css"
import { ResourceContext } from "../ResourceContext/ResourceContext"
import { Select, Input } from 'theme-ui'

export default function ResourceListFilters() {

  const context = useContext(ResourceContext);

  const hasActiveFilters =
    context.searchTerm ||
    context.selectedFormat ||
    context.selectedFocus ||
    context.selectedSkillLevel;

  return (
    <form>
      <fieldset>
        <legend>
          <strong>Filter</strong>
          {hasActiveFilters &&
            <button className="btn-clearFilters" onClick={context.clearFilters}>
              × Clear All
            </button>
          }
        </legend>

        <label htmlFor="searchTerm">
          Name
          <Input
            aria-label="Name"
            type="text"
            id="searchTerm"
            name="searchTerm"
            placeholder="Start typing..."
            value={context.searchTerm || ""}
            onChange={(event) => {context.setSearchTerm(event.target.value)}}
          />
        </label>

        <label htmlFor="resourceFormat">
          Format
          <Select
            id="resourceFormat"
            name="resourceFormat"
            onChange={(event) => {context.setSelected('selectedFormat', event.target.value)}}
            value={context.selectedFormat || ""}
          >
            <option value="">All</option>
            {context.allFormats.map((format, i) =>
              <option key={`format-${i}`} value={format}>{format}</option>)
            }
          </Select>
        </label>

        <label htmlFor="resourceFocus">
          Focus
          <Select
            id="resourceFocus"
            name="resourceFocus"
            onChange={(event) => {context.setSelected('selectedFocus', event.target.value)}}
            value={context.selectedFocus || ""}
          >
            <option value="">All</option>
            {context.allFocuses.map((focus, i) =>
              <option key={`focus-${i}`} value={focus}>{focus}</option>)
            }
          </Select>
        </label>

        <label htmlFor="resourceSkillLevel">
          Skill Level
          <Select
            id="resourceSkillLevel"
            name="resourceSkillLevel"
            onChange={(event) => {context.setSelected('selectedSkillLevel', event.target.value)}}
            value={context.selectedSkillLevel || ""}
          >
            <option value="">All</option>
            {context.allSkillLevels.map((skillLevel, i) =>
              <option key={`skillLevel-${i}`} value={skillLevel}>{skillLevel}</option>)
            }
          </Select>
        </label>

      </fieldset>
    </form>
  )
}
