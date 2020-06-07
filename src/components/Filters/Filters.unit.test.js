import React from "react"
import renderer from "react-test-renderer"
import Filters from "./Filters"
import { ResourceContext } from "../ResourceContext/ResourceContext"

let mockContext = {
  allSkillLevels: ["Beginner", "Moderate", "Advanced"],
  allFocuses: ["Front-end", "Multiple", "Algorithms"],
  allFormats: ['Article', 'Interactive', 'Tutorial', 'Video'],
  selectedSkillLevel: null,
  selectedFormat: null,
  selectedFocus: null,
  setSearchTerm: () => {},
  setSelected: () => {},
  searchTerm: null,
}

describe("Filters", () => {
  it("renders correctly", () => {
    const tree = renderer.create(
      <ResourceContext.Provider value={mockContext}>
        <Filters />
      </ResourceContext.Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("Adds selected values to appropriate fields", () => {

    mockContext = {
      ...mockContext,
      selectedSkillLevel: "Beginner",
      selectedFormat: "Article",
      selectedFocus: "Front-end",
      searchTerm: "Code"
    }
    const tree = renderer.create(
      <ResourceContext.Provider value={mockContext}>
        <Filters />
      </ResourceContext.Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
