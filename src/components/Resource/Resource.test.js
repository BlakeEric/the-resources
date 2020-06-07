import React from "react"
import renderer from "react-test-renderer"
import { ResourceContext } from "../ResourceContext/ResourceContext"
import getResourcesResponse from '../../__fixtures__/getResourcesResponse'

import Resource from "./Resource"


const mockProps = {
  ...getResourcesResponse[0].node,
  isToggled: false,
  showDetailsAbove: false
}

describe("Resource", () => {

  /*
  * Make sure the component renders without error
  */
  it("renders correctly not toggled", () => {
    const tree = renderer
      .create(
        <ResourceContext.Provider value={{setToggledItemId: () => {}}}>
          <Resource {...mockProps}/>)
        </ResourceContext.Provider>
      ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly when toggled", () => {

    mockProps.isToggled = true;

    const tree = renderer
      .create(
        <ResourceContext.Provider value={{setToggledItemId: () => {}}}>
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
        <ResourceContext.Provider value={{setToggledItemId: () => {}}}>
          <Resource {...mockProps}/>)
        </ResourceContext.Provider>
      ).toJSON()
    expect(tree).toMatchSnapshot()
  })

});
