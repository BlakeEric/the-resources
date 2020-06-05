import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import getResourcesResponse from '../../__fixtures__/getResourcesResponse'

import ResourceList from "./ResourceList"

const mockProps = {
  resources: getResourcesResponse,
  skillLevels: ["Beginner", "Moderate", "Advanced"],
  focuses: ["Front-end", "Multiple", "Algorithms"],
  formats: ['Article', 'Interactive', 'Tutorial', 'Video']
}

describe("ResourceList", () => {

  /*
  * Make sure the component renders without error
  */
  describe('Initial render', () => {

    it("renders correctly when no resources passed in", () => {
      const tree = renderer
        .create(<ResourceList />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("renders correctly when resources passed in", () => {
      const tree = renderer
        .create(<ResourceList {...mockProps} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("orders ASC by name on initial render", () => {
      const wrapper = mount(<ResourceList {...mockProps} />)

      expect(wrapper.find('tbody tr').first().text().includes('Alligator')).toBeTruthy();
    });
  });

})
