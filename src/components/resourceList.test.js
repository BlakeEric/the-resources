import React from "react"
import renderer from "react-test-renderer"
import getResourcesResponse from '../__fixtures__/getResourcesResponse'

import ResourceList from "./resourceList"

describe("ResourceList", () => {
  it("renders correctly when no resources passed in", () => {
    const tree = renderer
      .create(<ResourceList />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly when resources passed in", () => {
    const tree = renderer
      .create(<ResourceList resources={getResourcesResponse} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
