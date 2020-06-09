import React from "react"
import renderer from "react-test-renderer"
import { ResourceContext } from "../ResourceContext/ResourceContext"
import getResourcesResponse from '../../__fixtures__/getResourcesResponse'

import Resource from "./Resource"


let mockProps = {
  ...getResourcesResponse[0].node,
  showDetailsAbove: false
}

let mockContext = {
  setToggledItemId: () => {},
  currentToggledItemId: null,
  bookmarks: []
}

describe("Resource", () => {

  /*
  * Make sure the component renders without error
  */
  it("renders correctly not toggled", () => {
    const tree = renderer
      .create(
        <ResourceContext.Provider value={mockContext}>
          <Resource {...mockProps}/>)
        </ResourceContext.Provider>
      ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly when toggled", () => {

    mockContext.currentToggledItemId = getResourcesResponse[0].node.id;

    const tree = renderer
      .create(
        <ResourceContext.Provider value={mockContext}>
          <Resource {...mockProps}/>)
        </ResourceContext.Provider>
      ).toJSON()
    expect(tree).toMatchSnapshot()
  })


  it("renders popover above item when showDetailsAbove prop is true", () => {

    mockProps.isToggled = true;
    mockProps.showDetailsAbove = true

    const tree = renderer
      .create(
        <ResourceContext.Provider value={mockContext}>
          <Resource {...mockProps}/>)
        </ResourceContext.Provider>
      ).toJSON()
    expect(tree).toMatchSnapshot()
  })


  it("Shows indication that item has been bookmarked", () => {

    mockContext.bookmarks = [getResourcesResponse[0].node.id];

    const tree = renderer
      .create(
        <ResourceContext.Provider value={mockContext}>
          <Resource {...mockProps}/>)
        </ResourceContext.Provider>
      ).toJSON()
    expect(tree).toMatchSnapshot()
  })

});
