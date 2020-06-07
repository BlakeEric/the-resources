import React from "react"
import renderer from "react-test-renderer"
import ResourceListHeader from "./ResourceListHeader"
import { ResourceContext } from "../ResourceContext/ResourceContext"


let mockContext = {
  orderBy: "name",
  order: "ASC",
  setOrder: () => {}
}

describe("ResourceListHeader", () => {

  it("renders correctly", () => {
    const tree = renderer.create(
      <ResourceContext.Provider value={mockContext}>
        <ResourceListHeader keys={["name", "skillLevel", "format", "focus"]} />
      </ResourceContext.Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("Adds appropriate className and icon to current orderBy key", () => {

    mockContext.orderBy = "skillLevel"
    mockContext.order = "DESC"

    const tree = renderer.create(
      <ResourceContext.Provider value={mockContext}>
        <ResourceListHeader keys={["name", "skillLevel", "format", "focus"]} />
      </ResourceContext.Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
