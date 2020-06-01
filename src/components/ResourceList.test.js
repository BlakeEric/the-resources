import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import getResourcesResponse from '../__fixtures__/getResourcesResponse'

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


  /*
  * Sorting by Name
  */
  describe('When sorting by name', () => {
    it("toggles between DESC and ASC ordering by NAME on when appropriate button is clicked", () => {
      const wrapper = mount(<ResourceList {...mockProps} />)

      expect(wrapper.find('tbody tr').first().text().includes('Alligator')).toBeTruthy();

      // The "name" column button
      const button = wrapper.find('button').at(0)

      //trigger button click
      button.simulate('click');
      wrapper.update();

      // The last item's name should start with "A"
      expect(wrapper.find('tbody tr').last().text().includes('Alligator')).toBeTruthy();

      //trigger button click again
      button.simulate('click');
      wrapper.update();

      // The FIRST item's name should start with "A"
      expect(wrapper.find('tbody tr').first().text().includes('Alligator')).toBeTruthy();
    });
  });

  /*
  * Sorting by Format
  */
  describe('When sorting by Format', () => {
    it("toggles between DESC and ASC ordering by FORMAT on when appropriate button is clicked", () => {
      const wrapper = mount(<ResourceList {...mockProps} />)

      expect(wrapper.find('tbody tr').first().text().includes('Alligator')).toBeTruthy();

      // The "skillLevel" column button
      const button = wrapper.find('button').at(1)

      //trigger button click
      button.simulate('click');
      wrapper.update();

      // The first item's format should start with "A"
      expect(wrapper.find('tbody tr').first().text().includes('Article')).toBeTruthy();

      //trigger button click again
      button.simulate('click');
      wrapper.update();

      // The LAST item's format should start with "A"
      expect(wrapper.find('tbody tr').last().text().includes('Article')).toBeTruthy();
    });
  });


  /*
  * Sorting by Focus
  */
  describe('When sorting by Focus', () => {
    it("toggles between DESC and ASC ordering by FOCUS on when appropriate button is clicked", () => {
      const wrapper = mount(<ResourceList {...mockProps} />)

      expect(wrapper.find('tbody tr').first().text().includes('Alligator')).toBeTruthy();

      // The "focus" column button
      const button = wrapper.find('button').at(2)

      //trigger button click
      button.simulate('click');
      wrapper.update();

      // The first item's focus should start with "A"
      expect(wrapper.find('tbody tr').first().text().includes('Algorithms')).toBeTruthy();

      //trigger button click again
      button.simulate('click');
      wrapper.update();

      // The LAST item's focus should start with "A"
      expect(wrapper.find('tbody tr').last().text().includes('Algorithms')).toBeTruthy();
    });
  });

  /*
  * Sorting by skillLevel
  */
  describe('When sorting by Skill Level', () => {
    it("toggles between DESC and ASC ordering by SKILL LEVEL on when appropriate button is clicked", () => {
      const wrapper = mount(<ResourceList {...mockProps} />)

      expect(wrapper.find('tbody tr').first().text().includes('Alligator')).toBeTruthy();

      // The "skillLevel" column button
      const button = wrapper.find('button').at(3)

      //trigger button click
      button.simulate('click');
      wrapper.update();

      // The first item's skill level should start with "A"
      expect(wrapper.find('tbody tr').first().text().includes('Advanced')).toBeTruthy();

      //trigger button click again
      button.simulate('click');
      wrapper.update();

      // The LAST item's skill level should start with "A"
      expect(wrapper.find('tbody tr').last().text().includes('Advanced')).toBeTruthy();
    });
  });


  /*
  * Filtering by Name
  */
  describe('When filtering by name', () => {
    it("displays only items with Names containing the search term", () => {
      const wrapper = mount(<ResourceList {...mockProps} />)

      // Five items should be rendered
      expect(wrapper.find('tbody tr').length).toEqual(5);

      // The "search term" input
      const field = wrapper.find('input#searchTerm').first()

      field.instance().value = "Elephant";
      field.simulate('change');
      wrapper.update();

      // Only two items should remain after filtering
      expect(wrapper.find('tbody tr').length).toEqual(1);
    });
  });

  /*
  * Filtering by skillLevel
  */
  describe('When filtering by Skill Level', () => {
    it("displays only items with skill levels containing the selection", () => {
      const wrapper = mount(<ResourceList {...mockProps} />)

      // Five items should be rendered
      expect(wrapper.find('tbody tr').length).toEqual(5);

      // The "skillLevel" filter button
      const field = wrapper.find('select#resourceSkillLevel').first()

      field.instance().value = "Advanced";
      field.simulate('change');
      wrapper.update();

      // Only two items should remain after filtering
      expect(wrapper.find('tbody tr').length).toEqual(2);
    });
  });

  /*
  * Filtering by format
  */
  describe('When filtering by Format', () => {
    it("displays only items with formats containing the selection", () => {
      const wrapper = mount(<ResourceList {...mockProps} />)

      // Five items should be rendered
      expect(wrapper.find('tbody tr').length).toEqual(5);

      // The "format" filter button
      const field = wrapper.find('select#resourceFormat').first()

      field.instance().value = "Tutorial";
      field.simulate('change');
      wrapper.update();

      // Only two items should remain after filtering
      expect(wrapper.find('tbody tr').length).toEqual(1);
    });
  });

  /*
  * Filtering by focus
  */
  describe('When filtering by Focus', () => {
    it("displays only items with formats containing the selection", () => {
      const wrapper = mount(<ResourceList {...mockProps} />)

      // Five items should be rendered
      expect(wrapper.find('tbody tr').length).toEqual(5);

      // The "focus" filter button
      const field = wrapper.find('select#resourceFocus').first()

      field.instance().value = "Front-end";
      field.simulate('change');
      wrapper.update();

      // Only two items should remain after filtering
      expect(wrapper.find('tbody tr').length).toEqual(2);
    });
  });


  /*
  * Clearing filters
  */
  describe('When filtering by Focus', () => {
    it("displays all items when 'Clear filter' button is clicked", () => {

      const wrapper = mount(<ResourceList {...mockProps} />)

      // The "skillLevel" filter button
      const field = wrapper.find('select#resourceFocus').first()

      field.instance().value = "Front-end";
      field.simulate('change');
      wrapper.update();

      // Only two items should remain after filtering
      expect(wrapper.find('tbody tr').length).toEqual(2);

      // Simulate "clear filters" click
      const button = wrapper.find('.btn-clearFilters').first()
      button.simulate('click');
      wrapper.update();

      // All items should be showing again
      expect(wrapper.find('tbody tr').length).toEqual(5);

    });
  });


})
