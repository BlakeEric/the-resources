import React, { useContext } from "react"
import { Global, css } from '@emotion/core'
import { rhythm } from "../../utils/typography"
import ResourceListHeader from '../ResourceListHeader/ResourceListHeader'
import Filters from '../Filters/Filters'
import Resource from '../Resource/Resource'
import { ResourceContext } from '../ResourceContext/ResourceContext'


export default function ResourceList() {

  const context = useContext(ResourceContext);
  const { resources } = context;
  const filteredResources = context.getFilteredResources();

  if (resources.length < 1) {
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

      {context.isFilterable && <Filters />}

      <section className="tableWrap">
        <table>
          <ResourceListHeader keys={['name', 'format', 'focus', 'skillLevel']} />
          <tbody>
            {filteredResources.length === 0 ?
              <tr>
                <td colSpan="4">
                  <span className="notFoundMessage">Nothing found matching your search.</span>
                </td>
              </tr>
            : filteredResources.map(({ node }, i) => (
              <Resource
                key={node.id}
                {...node}
                showDetailsAbove={i > filteredResources.length - 5}
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )

}


ResourceList.defaultProps = {
  resources: [],
  skillLevels: [],
  formats:[],
  focuses: []
}



const styles = css`
  .tableWrap {
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
