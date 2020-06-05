import React from "react"
import renderer from "react-test-renderer"
import Filters from "./Filters"

let mockProps = {
  selectedSkillLevel: null,
  selectedFormat: null,
  selectedFocus: null,
  setSearchTerm: () => {},
  setSelected: () => {},
  skillLevels: ["Beginner", "Moderate", "Advanced"],
  focuses: ["Front-end", "Multiple", "Algorithms"],
  formats: ['Article', 'Interactive', 'Tutorial', 'Video'],
  searchTerm: null,
}

describe("Filters", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Filters {...mockProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("Adds selected values to appropriate fields", () => {

    mockProps = {
      ...mockProps,
      selectedSkillLevel: "Beginner",
      selectedFormat: "Article",
      selectedFocus: "Front-end",
      searchTerm: "Code"
    }
    const tree = renderer.create(<Filters {...mockProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
