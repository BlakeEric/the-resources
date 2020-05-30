import React from "react"
import renderer from "react-test-renderer"
import ResourceListTableHeader from "./ResourceListTableHeader"

let mockProps = {
  keys: ["name", "skillLevel", "format", "focus"],
  orderBy: "name",
  order: "ASC",
  handleFilterClick: () => {}
}

describe("ResourceListTableHeader", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ResourceListTableHeader {...mockProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("Adds appropriate className and icon to current orderBy key", () => {

    mockProps.orderBy = "skillLevel"
    mockProps.order = "DESC"

    const tree = renderer.create(<ResourceListTableHeader {...mockProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
