import React, { useContext } from "react"
import { ResourceContext } from '../ResourceContext/ResourceContext'
import { Button } from 'theme-ui'

export default function ResourceListTableHeader({ keys }) {

  const context = useContext(ResourceContext);

  /*
   * Display up or down icon based on key and current order in state
   */
  const displaySortIcon = (keyName) => {
    if (context.orderBy === keyName) {
      if (context.order === "DESC") {
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
    <thead >
      <tr>
        {keys.map(keyName => {
          return (
            <th key={keyName} style={{textAlign: "left"}}>
              <Button variant={context.orderBy === keyName ? "secondary" : "muted"} onClick={() => context.setOrder(keyName)}>
                {formatColumnTitle(keyName)} {displaySortIcon(keyName)}
              </Button>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
