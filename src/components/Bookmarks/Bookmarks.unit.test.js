import React from "react"
import renderer from "react-test-renderer"
import Bookmarks from "./Bookmarks"
import getResourcesResponse from '../../__fixtures__/getResourcesResponse'
import { ResourceContext } from "../ResourceContext/ResourceContext"

let mockContext = {
  bookmarks: [],
  resources: getResourcesResponse
}

describe("Bookmarks", () => {
  it("renders correctly when no items bookmarked", () => {
    const tree = renderer.create(
      <ResourceContext.Provider value={mockContext}>
        <Bookmarks />
      </ResourceContext.Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly when context has bookmarks", () => {

    mockContext.bookmarks = [getResourcesResponse[0].node.id, getResourcesResponse[1].node.id]
    const tree = renderer.create(
      <ResourceContext.Provider value={mockContext}>
        <Bookmarks />
      </ResourceContext.Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
