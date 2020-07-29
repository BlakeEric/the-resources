import React from "react"
import Layout from "../components/Layout/Layout"
import Seo from "../components/Seo/Seo"
import { Container } from 'theme-ui'

export default function About() {
  return (
    <Layout>
      <Seo title="About" />
      <Container>
        <h1>About</h1>
        <h3>This site exists because we all get tired of googling stuff.</h3>
        <p>
          The tech industry is unique in that many positions do not require advanced
          degrees or certifications. The internet is full of free educational
          resources to help web professionals improve their craft and set a standard
          for best practices. This is my attempt to consolidate the best ones in a single location.
        </p>
        <p>
          Want to share a resource so others can benefit from it? <a href="mailto:blake@blakelundquist.dev?subject=A new resource for theresources.dev!">Recommend a resource!</a>
        </p>
      </Container>
    </Layout>
  )
}
