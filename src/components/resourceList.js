import React from "react"
import { Link } from "gatsby"
import { Global, css } from '@emotion/core'
import typography from "../utils/typography"

export default class ResourceList extends React.Component {


  state = {
    resources: this.props.resources,
    isFilterable: false, // used to display filter options if JS is enabled
    orderBy: "title",
    order: "ASC",
    searchTerm: null
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
  handleFilterClick = (key) => {
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
   * Filter the resources based on orderBy and search values set in state
   * Return reordered array
   */
  filter() {

    const { order, searchTerm } = this.state;
    const key = this.state.orderBy || 'title';

    // create a new array of resources to avoid mutating the value in state
    let filteredItems = [...this.state.resources];

    // remove resources not matching the search term in state
    if (searchTerm) {
      let string = searchTerm.toLowerCase()

      filteredItems = filteredItems.filter(item => {
        return item.node.frontmatter.title.toLowerCase().includes(string)
      })
    }

    // Sort the items alphabetically by "orderyBy" key set in state.
    // Will sort in ASC order by default, or DESC if set as "order" value in state
    filteredItems.sort((current, next) => {
      let currentField = current.node.frontmatter[key].toString().toLowerCase();
      let nextField = next.node.frontmatter[key].toString().toLowerCase();

      return this.compareFields(currentField, nextField)

    })

    return filteredItems
  }

  /*
   * Display up or down icon based on key and current order in state
   */
  displaySortIcon(key) {
    if (this.state.orderBy === key) {
      if (this.state.order === "DESC") {
        return '↑'
      }
      return '↓'
    }
    return ''
  }



  render() {

    return (
      <table id="resources">
        <Global
          styles={css`
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
          `}
        />
        <thead>
          <tr>
            <th className={this.state.orderBy === "title" ? "active" : ""}>
              <button onClick={() => this.handleFilterClick("title")}>Name {this.displaySortIcon('title')}</button>
            </th>
            <th className={this.state.orderBy === "focus" ? "active" : ""}>
              <button  onClick={() => this.handleFilterClick("focus")}>Focus {this.displaySortIcon('focus')}</button>
            </th>
            <th className={this.state.orderBy === "skillLevel" ? "active" : ""}>
              <button onClick={() => this.handleFilterClick("skillLevel")}>Skill Level {this.displaySortIcon('skillLevel')}</button>
            </th>
            <th className={this.state.orderBy === "format" ? "active" : ""}>
              <button onClick={() => this.handleFilterClick("format")}>Format {this.displaySortIcon('format')}</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.filter().length === 0 ?
            <tr>
              <td colspan="4">
                Nothing found matching your search.
              </td>
            </tr>
          : this.filter().map(({ node }) => (
            <tr key={node.id}>
              <td>
                <Link to={node.fields.slug}>
                  {node.frontmatter.title}
                </Link>
              </td>
              <td>
                {node.frontmatter.focus}
              </td>
              <td>
                {node.frontmatter.skillLevel.length === 3 ? 'All' : node.frontmatter.skillLevel.join(', ')}
              </td>
              <td>
                {node.frontmatter.format}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

}


ResourceList.defaultProps = {
  resources: []
}

// String.prototype.toCamelCase = function() {
//     return this.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
//         if (p2) return p2.toUpperCase();
//         return p1.toLowerCase();
//     });
// };
