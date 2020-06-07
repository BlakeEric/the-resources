import React, { useContext } from "react"
import typography from "../../utils/typography"
import { css } from "@emotion/core"
import { ResourceContext } from '../ResourceContext/ResourceContext'

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
    <thead css={styles} >
      <tr>
        {keys.map(keyName => {
          return (
            <th key={keyName} className={context.orderBy === keyName ? "active" : ""}>
              <button
                onClick={() => context.setOrder(keyName)}>
                {formatColumnTitle(keyName)} {displaySortIcon(keyName)}
              </button>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

const styles = css`
  thead{
    padding: 20px;
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
    border-radius: 5px;
    &:hover, &:focus {
      text-decoration: underline;
    }
  }
  th.active button {
    font-weight: 400;
    background-color: #0acc9e;
    background-image: linear-gradient(to bottom right, #37e6bd, #0acc9e);
    color: white;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.05);
    padding: 0 ${typography.rhythm(.25)};
    &:hover, &:focus {
      text-decoration: none;
    }
  }
  th {
    width: 25%;
    padding-top: 0.25rem;
    padding-bottom: calc(0.25rem - 1px);
  }
`
