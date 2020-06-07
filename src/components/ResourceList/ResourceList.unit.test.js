import React from "react"
import renderer from "react-test-renderer"
import { mount } from 'enzyme'
import getResourcesResponse from '../../__fixtures__/getResourcesResponse'
import { ResourceProvider } from "../ResourceContext/ResourceContext"

import ResourceList from "./ResourceList"

const mockProps = {
  resources: getResourcesResponse,
  allSkillLevels: ["Beginner", "Moderate", "Advanced"],
  allFocuses: ["Front-end", "Multiple", "Algorithms"],
  allFormats: ['Article', 'Interactive', 'Tutorial', 'Video']
}

describe("ResourceList", () => {

  /*
  * Make sure the component renders without error
  */
  describe('Initial render', () => {

    it("renders correctly when no resources passed in", () => {

      const tree = renderer.create(
        <ResourceProvider {...mockProps}>
          <ResourceList />
        </ResourceProvider>
      ).toJSON()
      
      expect(tree).toMatchSnapshot()
    })


    it("orders ASC by name on initial render", () => {
      const wrapper = mount(
        <ResourceProvider {...mockProps}>
          <ResourceList />
        </ResourceProvider>
      )

      expect(wrapper.find('tbody tr').first().text().includes('Alligator')).toBeTruthy();
    });
  });

})
