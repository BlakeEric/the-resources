import React from "react"
import renderer from "react-test-renderer"
import { PureLayout as Layout } from "./Layout"

describe("Layout", () => {

  const data = {
    site: {
      siteMetadata: {
        title: "Cool Site Title",
      },
    },
  }

  it("renders correctly", () => {
    const tree = renderer.create(<Layout data={data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly with children", () => {
    const tree = renderer.create(
      <Layout data={data}>
        <main>
          <h1>I'm a child!</h1>
        </main>
      </Layout>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
