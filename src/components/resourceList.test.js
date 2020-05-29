import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import getResourcesResponse from '../__fixtures__/getResourcesResponse'

import ResourceList from "./ResourceList"

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
        .create(<ResourceList resources={getResourcesResponse} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

    it("orders ASC by title on initial render", () => {
      const wrapper = mount(<ResourceList resources={getResourcesResponse} />)

      expect(wrapper.find('tbody > tr').first().text().includes('A-Title')).toBeTruthy();
    });
  });


  /*
  * Sorting by Title
  */
  describe('When sorting by Title', () => {
    it("toggles between DESC and ASC ordering by TITLE on when appropriate button is clicked", () => {
      const wrapper = mount(<ResourceList resources={getResourcesResponse} />)

      expect(wrapper.find('tbody > tr').first().text().includes('A-Title')).toBeTruthy();

      // The "title" column button
      const button = wrapper.find('button').at(0)

      //trigger button click
      button.simulate('click');
      wrapper.update();

      // The last item's title should start with "A"
      expect(wrapper.find('tbody > tr').last().text().includes('A-Title')).toBeTruthy();

      //trigger button click again
      button.simulate('click');
      wrapper.update();

      // The FIRST item's title should start with "A"
      expect(wrapper.find('tbody > tr').first().text().includes('A-Title')).toBeTruthy();
    });
  });


  /*
  * Sorting by Focus
  */
  describe('When sorting by Focus', () => {
    it("toggles between DESC and ASC ordering by FOCUS on when appropriate button is clicked", () => {
      const wrapper = mount(<ResourceList resources={getResourcesResponse} />)

      expect(wrapper.find('tbody > tr').first().text().includes('A-Title')).toBeTruthy();

      // The "focus" column button
      const button = wrapper.find('button').at(1)

      //trigger button click
      button.simulate('click');
      wrapper.update();

      // The first item's focus should start with "A"
      expect(wrapper.find('tbody > tr').first().text().includes('Algorithms')).toBeTruthy();

      //trigger button click again
      button.simulate('click');
      wrapper.update();

      // The LAST item's focus should start with "A"
      expect(wrapper.find('tbody > tr').last().text().includes('Algorithms')).toBeTruthy();
    });
  });

  /*
  * Sorting by skillLevel
  */
  describe('When sorting by Skill Level', () => {
    it("toggles between DESC and ASC ordering by SKILL LEVEL on when appropriate button is clicked", () => {
      const wrapper = mount(<ResourceList resources={getResourcesResponse} />)

      expect(wrapper.find('tbody > tr').first().text().includes('A-Title')).toBeTruthy();

      // The "skillLevel" column button
      const button = wrapper.find('button').at(2)

      //trigger button click
      button.simulate('click');
      wrapper.update();

      // The first item's skill level should start with "A"
      expect(wrapper.find('tbody > tr').first().text().includes('Advanced')).toBeTruthy();

      //trigger button click again
      button.simulate('click');
      wrapper.update();

      // The LAST item's skill level should start with "A"
      expect(wrapper.find('tbody > tr').last().text().includes('Advanced')).toBeTruthy();
    });
  });

  /*
  * Sorting by Format
  */
  describe('When sorting by Format', () => {
    it("toggles between DESC and ASC ordering by FORMAT on when appropriate button is clicked", () => {
      const wrapper = mount(<ResourceList resources={getResourcesResponse} />)

      expect(wrapper.find('tbody > tr').first().text().includes('A-Title')).toBeTruthy();

      // The "skillLevel" column button
      const button = wrapper.find('button').at(2)

      //trigger button click
      button.simulate('click');
      wrapper.update();

      // The first item's format should start with "A"
      expect(wrapper.find('tbody > tr').first().text().includes('Article')).toBeTruthy();

      //trigger button click again
      button.simulate('click');
      wrapper.update();

      // The LAST item's format should start with "A"
      expect(wrapper.find('tbody > tr').last().text().includes('Article')).toBeTruthy();
    });
  });

})
