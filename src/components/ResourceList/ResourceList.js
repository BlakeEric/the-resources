import React, { useContext } from "react"
import { resourceListStyles } from './ResourceList.styles.js'
import "./ResourceList.css"
import ResourceListHeader from '../ResourceListHeader/ResourceListHeader'
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
    <div>
      <section className="tableWrap" css={resourceListStyles}>
        <table className="table">
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

