import React from "react"
import { Link } from "gatsby"
import { Global, css } from '@emotion/core'
import typography from "../utils/typography"
import ResourceListTableHeader from './ResourceListTableHeader'
import ResourceListFilters from './ResourceListFilters'

export default class ResourceList extends React.Component {


  state = {
    resources: this.props.resources,
    isFilterable: false, // used to display filter options if JS is enabled
    orderBy: "name",
    order: "ASC",
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
   * Filter the resources based on orderBy and search values set in state
   * Return reordered array
   */
  filter() {

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

      return this.compareFields(currentField, nextField)

    })

    return filteredItems
  }



  render() {

    if (this.props.resources.length < 1) {
      return (
        <section id="resources">
          <h4>Something went wrong :(</h4>
          <p>We are unable to retrieve resources at this time.</p>
        </section>
      )
    }

    return (
      <div>
        <Global styles={styles} />

        {this.state.isFilterable ?
          <ResourceListFilters
            selectedSkillLevel={this.state.selectedSkillLevel}
            selectedFormat={this.state.selectedFormat}
            selectedFocus={this.state.selectedFocus}
            setSearchTerm={this.setSearchTerm}
            setSelected={this.setSelected}
            skillLevels={this.props.skillLevels}
            formats={this.props.formats}
            focuses={this.props.focuses}
            searchTerm={this.state.searchTerm}
          />
        : ''}

        <table id="resources">
          <ResourceListTableHeader
            keys={Object.keys(this.state.resources[0].node.frontmatter)}
            orderBy={this.state.orderBy}
            order={this.state.order}
            handleFilterClick={this.setOrder}
          />
          <tbody>
            {this.filter().length === 0 ?
              <tr>
                <td colSpan="4">
                  Nothing found matching your search.
                </td>
              </tr>
            : this.filter().map(({ node }) => (
              <tr key={node.id}>
                <td>
                  <Link to={node.fields.slug}>
                    {node.frontmatter.name}
                  </Link>
                </td>
                <td>
                  {node.frontmatter.format}
                </td>
                <td>
                  {node.frontmatter.focus}
                </td>
                <td>
                  {node.frontmatter.skillLevel.length === 3 ? 'All' : node.frontmatter.skillLevel.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

}


ResourceList.defaultProps = {
  resources: []
}



const styles = css`
  table {
    font-size: ${typography.rhythm(.575)};
  }
  th {
    font-family: ${typography.options.headerFontFamily.toString()};
  }
  th button {
    background: white;
    padding: 0;
    box-shadow: none;
    border: none;
    cursor: pointer;
  }
  th.active button {
    background: lightgreen;
  }
  th, td {
    padding-top: 0.25rem;
    padding-bottom: calc(0.25rem - 1px);
  }
`
