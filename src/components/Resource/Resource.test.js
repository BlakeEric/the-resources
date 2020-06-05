import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import getResourcesResponse from '../../__fixtures__/getResourcesResponse'

import Resource from "./Resource"


const mockProps = {
  ...getResourcesResponse[0].node,
  isToggled: false,
  setToggledItemId: () => {},
  showDetailsAbove: false
}

describe("Resource", () => {

  /*
  * Make sure the component renders without error
  */
  it("renders correctly not toggled", () => {
    const tree = renderer
      .create(<Resource {...mockProps}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly when toggled", () => {

    mockProps.isToggled = true;

    const tree = renderer
      .create(<Resource {...mockProps} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly when toggled", () => {

    mockProps.isToggled = true;

    const tree = renderer
      .create(<Resource {...mockProps} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders popover above item when showDetailsAbove prop is true", () => {

    mockProps.isToggled = true;
    mockProps.showDetailsAbove = true

    const tree = renderer
      .create(<Resource {...mockProps} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

});