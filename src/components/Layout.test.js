import React from "react"
import renderer from "react-test-renderer"
import { PureLayout as Layout } from "./Layout"
import { LocationProvider, createHistory, createMemorySource } from "@reach/router";

describe("Layout", () => {

  const data = {
    site: {
      siteMetadata: {
        title: "Cool Site Title",
      },
    },
  }


  const testHistory = createHistory(createMemorySource("/"));


  it("renders correctly", () => {
    const tree = renderer.create(
      <LocationProvider history={testHistory}>
        <Layout path="/" data={data} />
      </LocationProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  // it("renders correctly with children", () => {
  //   const tree = renderer.create(
  //     <LocationProvider history={history}>
  //       <Layout data={data} path="/">
  //         <main>
  //           <h1>I'm a child!</h1>
  //         </main>
  //       </Layout>
  //     </LocationProvider>
  //   ).toJSON()
  //   expect(tree).toMatchSnapshot()
  // })

})
