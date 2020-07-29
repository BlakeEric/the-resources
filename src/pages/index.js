/** @jsx jsx */
import { graphql } from "gatsby"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Seo/Seo"
import { ResourceProvider } from "../components/ResourceContext/ResourceContext"
import ResourceList from "../components/ResourceList/ResourceList"
import Bookmarks from "../components/Bookmarks/Bookmarks"
import Filters from "../components/Filters/Filters"
import { jsx, Container } from 'theme-ui'

export default function Home({ data }) {
  return (
    <Layout>
      <Seo />
      <header style={{
        textAlign: "center", 
        maxWidth: 700, 
        margin: "auto", 
        minHeight: 300, 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <Container pt={3} pb={3}>
          <h2>One-up your coding skills and industry know-how using these free tools, courses, and articles.</h2>
          <p>Know a resource that should be added to the list? <a href="mailto:blake@blakelundquist.dev?subject=A new resource for theresources.dev!">Recommend a resource!</a></p>
        </Container>
      </header>
      <ResourceProvider
        resources={data.resources.edges}
        allFormats={data.formatData.distinct}
        allFocuses={data.focusData.distinct}
        allSkillLevels={data.skillLevelData.distinct}
      >
        <Container mr={-2} ml={-2}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          <aside
            sx={{
              flexGrow: 1,
              flexBasis: '20px',
              p: 2,
            }}>
            <div
              sx={{
                p: 3,
                position: "sticky",
                top: 10,
                width: 250,
                borderRadius: '5px',
                boxShadow: '0 2px 2px 0 rgba(0,0,0,0.05)',
                border: '1px solid #eaeaea'
              }}>
              <Filters />
              <Bookmarks />
            </div>
          </aside>
          <main
            sx={{
              flexGrow: 99999,
              flexBasis: 0,
              minWidth: 520,
              p: 2,
            }}>
            <ResourceList />
          </main>
        </Container>
      </ResourceProvider>
    </Layout>
  )
}


export const query = graphql`
  query {
    resources: allMarkdownRemark(sort: { fields: [frontmatter___name], order: ASC }) {
      totalCount
      edges {
        node {
          id
          html
          frontmatter {
            url
            name
            format
            focus
            skillLevel
          }
        }
      }
    },
    focusData: allMarkdownRemark {
      distinct(field: frontmatter___focus)
    },
    formatData: allMarkdownRemark {
      distinct(field: frontmatter___format)
    }
    skillLevelData: allMarkdownRemark {
      distinct(field: frontmatter___skillLevel)
    }
  }
`
