import React from 'react'


export const ResourceContext = React.createContext();


export class ResourceProvider extends React.Component {

  state = {
    bookmarks: [],
    currentToggledItemId: null,
    isFilterable: false, // used to display filter options if JS is enabled
    orderBy: "name",
    order: "ASC",
    resources: this.props.resources,
    searchTerm: null,
    selectedSkillLevel: null,
    selectedFormat: null,
    selectedFocus: null,
  }


  componentDidMount() {
    // if JS is enabled allow dynamic filtering
    this.setState({isFilterable: true})
  }


  /*
   * add an resource's id to bookmarks of saved resources
   */
  addToBookmarks = (id) => {
    this.setState({
      bookmarks: [...this.state.bookmarks, id]
    })
  }


  /*
   * remove an resource's id from bookmarks of saved resources
   */
  removeFromBookmarks = (id) => {
    this.setState({
      bookmarks: this.state.bookmarks.filter(item => item !== id)
    })
  }


  /*
   * Reverse value of 'order' in state: "ASC" or "DESC"
   */
  reverseOrder = () => {
    let currentOrder = this.state.order;
    let order;

    if (currentOrder === "DESC") {
      order = "ASC"
    } else {
      order = "DESC"
    }

    this.setState({
      order
    })
  }

  setToggledItemId = (id) => {
    this.setState({
      currentToggledItemId: id
    })
  }

  /*
   * Set the key to use as basis for alphabetical sorting
   */
  setOrderBy = (key) => {
    this.setState({
      orderBy: key,
      order: "ASC"
    })
  }


  /*
   * Click handler that reverses order in state if a new field is clicked
   * Otherwise sets orderBy value to new key
   */
  setOrder = (key) => {
    if (!this.state.isFilterable) {
      return;
    }

    if (this.state.orderBy === key) {
      this.reverseOrder();
    } else {
      this.setOrderBy(key);
    }
  }


  /*
   * Set search term in state
   */
  setSearchTerm = (searchTerm) => {
    this.setState({searchTerm})
  }


  /*
   * Set filters in state
   */
  setSelected = (key, value) => {
    this.setState({[key]: value})
  }


  /*
   * Clear all selected filters from state
   */
  clearFilters = () => {
    this.setState({
      searchTerm: null,
      selectedSkillLevel: null,
      selectedFormat: null,
      selectedFocus: null
    })
  }


  /*
   * Alphabetically compare one field against another
   * Return -1, 0, or 1 for use in Array.sort
   */
  compareFields(current, next) {

    if (this.state.order === "DESC") {

      if(current > next) { return -1; }
      else if(current < next) { return 1; }

    } else {

      if(current < next) { return -1; }
      else if(current > next) { return 1; }

    }

    return 0;
  }


  /*
   * Filter the resources based on orderBy and search values set in state
   * Return reordered array
   */
  filter = () => {

    const { searchTerm, selectedSkillLevel, selectedFocus, selectedFormat } = this.state;
    const key = this.state.orderBy || 'name';

    // create a new array of resources to avoid mutating the value in state
    let filteredItems = [...this.state.resources];

    // remove resources not matching the search term in state
    if (searchTerm) {
      let string = searchTerm.toLowerCase()

      filteredItems = filteredItems.filter(item => {
        return item.node.frontmatter.name.toLowerCase().includes(string)
      })
    }

    // remove resources not matching the skillLevel in state
    if (selectedSkillLevel) {
      let string = selectedSkillLevel.toLowerCase()

      filteredItems = filteredItems.filter(item => {
        return item.node.frontmatter.skillLevel.toString().toLowerCase().includes(string)
      })
    }

    // remove resources not matching the format in state
    if (selectedFormat) {
      let string = selectedFormat.toLowerCase()

      filteredItems = filteredItems.filter(item => {
        return item.node.frontmatter.format.toLowerCase().includes(string)
      })
    }

    // remove resources not matching the format in state
    if (selectedFocus) {
      let string = selectedFocus.toLowerCase()

      filteredItems = filteredItems.filter(item => {
        return item.node.frontmatter.focus.toLowerCase().includes(string)
      })
    }

    // Sort the items alphabetically by "orderBy" key set in state.
    // Will sort in ASC order by default, or DESC if set as "order" value in state
    filteredItems.sort((current, next) => {

      let currentField = current.node.frontmatter[key].toString().toLowerCase();
      let nextField = next.node.frontmatter[key].toString().toLowerCase();

      if (key === "skillLevel") {
        currentField = currentField.replace("beginner,moderate,advanced", "all");
        nextField = nextField.replace("beginner,moderate,advanced", "all");
      }

      return this.compareFields(currentField, nextField)

    })

    return filteredItems
  }


  render() {

    const contextValue = {
      ...this.state,
      reverseOrder: this.reverseOrder,
      setToggledItemId: this.setToggledItemId,
      setOrder: this.setOrder,
      setOrderBy: this.setOrderBy,
      getFilteredResources: this.filter,
      setSearchTerm: this.setSearchTerm,
      setSelected: this.setSelected,
      clearFilters: this.clearFilters,
      allFormats: this.props.allFormats,
      allFocuses: this.props.allFocuses,
      allSkillLevels: this.props.allSkillLevels,
      addToBookmarks: this.addToBookmarks,
      removeFromBookmarks: this.removeFromBookmarks
    }

    return (
      <ResourceContext.Provider value={contextValue}>
        {this.props.children}
      </ResourceContext.Provider>
    );
  }
}
