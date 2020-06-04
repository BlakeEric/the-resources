import React from "react"
// import { Link } from "gatsby"
import { Global, css } from '@emotion/core'
import { rhythm } from "../utils/typography"
import ResourceListTableHeader from './ResourceListTableHeader'
import ResourceListFilters from './ResourceListFilters'
import Resource from './Resource'

export default class ResourceList extends React.Component {


  state = {
    resources: this.props.resources,
    isFilterable: false, // used to display filter options if JS is enabled
    currentToggledItemId: null,
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

      if (key === "skillLevel") {
        currentField = currentField.replace("beginner,moderate,advanced", "all");
        nextField = nextField.replace("beginner,moderate,advanced", "all");
      }

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
      <div css={css`min-height: 500px`}>
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
            clearFilters={this.clearFilters}
          />
        : ''}
        <section className="tableWrap">
          <table>
            <ResourceListTableHeader
              keys={['name', 'format', 'focus', 'skillLevel']}
              orderBy={this.state.orderBy}
              order={this.state.order}
              handleFilterClick={this.setOrder}
            />
            <tbody>
              {this.filter().length === 0 ?
                <tr>
                  <td colSpan="4">
                    <span className="notFoundMessage">Nothing found matching your search.</span>
                  </td>
                </tr>
              : this.filter().map(({ node }) => (
                <Resource
                  key={node.id}
                  {...node}
                  setToggledItemId={this.setToggledItemId}
                  isToggled={this.state.currentToggledItemId === node.id}
                />
              ))}
            </tbody>
          </table>
        </section>
      </div>
    )
  }

}


ResourceList.defaultProps = {
  resources: [],
  skillLevels: [],
  formats:[],
  focuses: []
}



const styles = css`
  .tableWrap {
    /* max-width: 100%; */
    overflow-x: scroll;
    padding: 0 ${rhythm(.5)};
    margin: 0 -${rhythm(.5)};
  }
  table {
    font-size: ${rhythm(.525)};
    min-width: 640px;
    position: relative;
  }
  thead {
    padding: 20px;
    min-width: 900px;
  }
  tbody {
    min-width: 900px;
  }
  td {
    width: 25%;
    padding-top: 0.25rem;
    padding-bottom: calc(0.25rem - 1px);
  }
  td span.notFoundMessage {
    width: 100%;
    text-align: center;
    display: inline-block;
  }
  td a {
    display: inline-block;
    line-height: 1.25;
  }
`
