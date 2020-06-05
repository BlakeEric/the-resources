import React from "react"
import renderer from "react-test-renderer"
import ResourceListHeader from "./ResourceListHeader"

let mockProps = {
  keys: ["name", "skillLevel", "format", "focus"],
  orderBy: "name",
  order: "ASC",
  handleFilterClick: () => {}
}

describe("ResourceListHeader", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ResourceListHeader {...mockProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("Adds appropriate className and icon to current orderBy key", () => {

    mockProps.orderBy = "skillLevel"
    mockProps.order = "DESC"

    const tree = renderer.create(<ResourceListHeader {...mockProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
