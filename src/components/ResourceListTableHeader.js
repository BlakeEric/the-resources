import React from "react"

export default function ResourceListTableHeader(props) {

  /*
   * Display up or down icon based on key and current order in state
   */
  const displaySortIcon = (keyName) => {
    if (props.orderBy === keyName) {
      if (props.order === "DESC") {
        return '↑'
      }
      return '↓'
    }
    return ''
  }

  /*
   * convert string to uppercase sentence format
   */
  const formatColumnTitle = (string) => {
    let words = string.replace( /([A-Z])/g, " $1" ).split(" ");
    for (let i = 0, x = words.length; i < x; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }

  return (
    <thead>
      <tr>
        {props.keys.map(keyName => {
          return (
            <th key={keyName} className={props.orderBy === keyName ? "active" : ""}>
              <button onClick={() => props.handleFilterClick(keyName)}>
                {formatColumnTitle(keyName)} {displaySortIcon(keyName)}
              </button>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
