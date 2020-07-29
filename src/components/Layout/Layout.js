import React from "react"
import { css, Global } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { Box, Flex, Container } from 'theme-ui'
import theme from '../../gatsby-plugin-theme-ui/index'


export const PureLayout = ({ data, children }) => (
  <>
    <Global
      styles={{
        a: theme.styles.a
      }}
    />

    <Container pt={3}>
      <nav>
        <Flex>
          <Box p={2} sx={{ flex: '1 1 auto' }}>
            <Link to="/" css={css`
              text-decoration: none;
            `}>
              <h3 css={css`
                margin: 0;
                line-height: 1.5;
              `}>
                {data.site.siteMetadata.title}
              </h3>
            </Link>
          </Box>
          <Box p={2} >
            <Link to="/about/">About</Link>
          </Box>
        </Flex>
      </nav>
    </Container>

    {/* Page content */}
    <Container p={2} sx={{minHeight: "80vh"}}>
      {children}
    </Container>
    {/* End page content */}

    <Container>
      <footer>
        <Flex pt={5} pb={5}>
          <Box p={2} sx={{ flex: '1 1 auto' }}>
            <span>
              © Blake Lundquist {new Date().getFullYear()}
            </span>
          </Box>
          <Box p={2}>
            <ul css={css`
              margin: 0;
              list-style: none;
              padding: 0;
            `}>
              <li>
                <a href="mailto:blake@blakelundquist.dev?subject=A new resource for theresources.dev!">Recommend a resource</a></li>
              <li>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/BlakeEric/the-resources">
                  View source code for this website
                </a>
              </li>
            </ul>
          </Box>
        </Flex>
      </footer>
    </Container>
  </>
)

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <PureLayout data={data}>{ children }</PureLayout>
  )
}
