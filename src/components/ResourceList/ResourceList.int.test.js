import React from "react"
import { mount } from 'enzyme'
import getResourcesResponse from '../../__fixtures__/getResourcesResponse'
import { ResourceProvider } from "../ResourceContext/ResourceContext"

import ResourceList from "./ResourceList"
import Filters from "../Filters/Filters"
import Bookmarks from "../Bookmarks/Bookmarks"

const mockProps = {
  resources: getResourcesResponse,
  allSkillLevels: ["Beginner", "Moderate", "Advanced"],
  allFocuses: ["Front-end", "Multiple", "Algorithms"],
  allFormats: ['Article', 'Interactive', 'Tutorial', 'Video']
}

describe("ResourceList", () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ResourceProvider {...mockProps}>
        <Filters />
        <ResourceList />
      </ResourceProvider>
    )
  });

  /*
  * Sorting by Name
  */
  describe('When sorting by name', () => {
    it("toggles between DESC and ASC ordering by NAME on when appropriate button is clicked", () => {

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
  describe('When clearing filters', () => {

    it("displays all items when 'Clear filter' button is clicked", () => {

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


  /*
  * Resource detail popover
  */
  describe('When viewing resource details', () => {

    it("opens and closes resource detail popover when clicking twice on same item name", () => {

      const anchor = wrapper.find('.resourceDetails-wrapper a').first()

      expect(wrapper.find('.resourceDetails').length).toEqual(0);

      anchor.simulate('click');
      wrapper.update();
      expect(wrapper.find('.resourceDetails-wrapper:first-child .resourceDetails').length).toEqual(1);

      anchor.simulate('click');
      wrapper.update();
      expect(wrapper.find('.resourceDetails').length).toEqual(0);

    });


    it("closes resource detail popover when clicking outside", () => {

      // Mock event listeners to use them in enzyme test
      const map = {};
      document.addEventListener = jest.fn((event, cb) => {
        map[event] = cb;
      });

      // Open the first Item
      wrapper.setState({ currentToggledItemId: getResourcesResponse[0].node.id });

      // hack to force rerender so useEffect works properly
      wrapper.setProps();
      wrapper.update();

      expect(wrapper.find('.resourceDetails').length).toEqual(1);

      // Simulate mousedown event outside of container
      map.mousedown({ pageX: 0, pageY: 0});

      wrapper.update();
      expect(wrapper.find('.resourceDetails').length).toEqual(0);

    });


    it("moves popover to clicked item if it is currently open on another item", () => {

      // Open the first Item
      wrapper.setState({ currentToggledItemId: getResourcesResponse[0].node.id });

      // hack to force rerender so useEffect works properly
      wrapper.setProps();
      wrapper.update();

      expect(wrapper.find('.resourceDetails').length).toEqual(1);

      // Click to open the last item
      wrapper.find('.resourceDetails-wrapper a').last().simulate('click')
      wrapper.update();

      // Only one popover should be open
      expect(wrapper.find('.resourceDetails').length).toEqual(1);

      // the current toggled item in state should have changed
      expect(wrapper.state().currentToggledItemId === getResourcesResponse[0].node.id).toBeFalsy();

    });

  });


  /*
  * Resource detail popover
  */
  describe('when selecting bookmarks', () => {

    beforeEach(() => {
      wrapper = mount(
        <ResourceProvider {...mockProps}>
          <ResourceList />
          <Bookmarks />
        </ResourceProvider>
      )
      // Open the first Item
      wrapper.setState({ currentToggledItemId: getResourcesResponse[0].node.id });

      // hack to force rerender so useEffect works properly
      wrapper.setProps();
      wrapper.update();
    })

    it("adds an item to bookmarks when 'add' button is clicked", () => {

      // Click to open the last item
      wrapper.find('.resourceDetails-wrapper button').first().simulate('click')
      wrapper.update();

      // Number of bookmarks displayed and in state should be one
      expect(wrapper.find('.bookmarks li').length).toEqual(1);
      expect(wrapper.state().bookmarks.length).toEqual(1);

    });

    it("removes an item from bookmarks when 'remove' button is clicked on item detail", () => {

      wrapper.setState({ bookmarks: [getResourcesResponse[0].node.id] });

      // Click to open the last item
      wrapper.find('.resourceDetails-wrapper button').first().simulate('click')
      wrapper.update();

      // Number of bookmarks displayed and in state should be 0
      expect(wrapper.find('.bookmarks li').length).toEqual(0);
      expect(wrapper.state().bookmarks.length).toEqual(0);

    });

    it("removes an item from bookmarks when 'remove' button is clicked in bookmarks tab", () => {

      wrapper.setState({ bookmarks: [getResourcesResponse[0].node.id] });

      // Click to open the last item
      wrapper.find('.bookmarks li button').first().simulate('click')
      wrapper.update();

      // Number of bookmarks displayed and in state should be 0
      expect(wrapper.find('.bookmarks li').length).toEqual(0);
      expect(wrapper.state().bookmarks.length).toEqual(0);

    });
  });

})
