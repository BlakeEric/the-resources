import React from "react"
import { Link } from "gatsby"
import { Global, css } from '@emotion/core'
import typography from "../utils/typography"

export default class ResourceList extends React.Component {

  state = {
    resources: this.props.resources,
    isFilterable: false, // used to display filter options if JS is enabled
    orderBy: null,
    order: null,
    searchTerm: null
  }

  componentDidMount() {
    // if JS is enabled allow dynamic filtering
    this.setState({isFilterable: true})
  }




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

  setOrderBy = (key) => {
    this.setState({
      orderBy: key,
      order: "ASC"
    })
  }

  // Order the elements based on the direction set in state
  reOrder(current, next) {

    if (this.state.order === "DESC") {

      if(current > next) { return -1; }
      else if(current < next) { return 1; }

    } else {

      if(current < next) { return -1; }
      else if(current > next) { return 1; }

    }

    return 0;
  }




  // Filter the resources based on orderBy and search values set in state
  filter() {
    const { order, searchTerm } = this.state;
    const key = this.state.orderBy || 'title';

    let filteredItems = [...this.state.resources];

    if (searchTerm) {

      let string = searchTerm.toLowerCase()
      console.log("search term is " + string)
      filteredItems = filteredItems.filter(item => {
        console.log("comparing to " + item.node.frontmatter.title.toLowerCase())
        return item.node.frontmatter.title.toLowerCase().includes(string)
      }

      )
    }

    filteredItems.sort((current, next) => {
      let currentField = current.node.frontmatter[key].toString().toLowerCase();
      let nextField = next.node.frontmatter[key].toString().toLowerCase();

      return this.reOrder(currentField, nextField)

    })

    return filteredItems
  }

  handleFilters = (key) => {
    if (this.state.orderBy === key) {
      this.reverseOrder();
    } else {
      this.setOrderBy(key);
    }
  }

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
              <button onClick={() => this.handleFilters("title")}>Name {this.displaySortIcon('title')}</button>
            </th>
            <th className={this.state.orderBy === "focus" ? "active" : ""}>
              <button  onClick={() => this.handleFilters("focus")}>Focus {this.displaySortIcon('focus')}</button>
            </th>
            <th className={this.state.orderBy === "skillLevel" ? "active" : ""}>
              <button onClick={() => this.handleFilters("skillLevel")}>Skill Level {this.displaySortIcon('skillLevel')}</button>
            </th>
            <th className={this.state.orderBy === "format" ? "active" : ""}>
              <button onClick={() => this.handleFilters("format")}>Format {this.displaySortIcon('format')}</button>
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

String.prototype.toCamelCase = function() {
    return this.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
};
