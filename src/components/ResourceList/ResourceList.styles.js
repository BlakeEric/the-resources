import { css } from '@emotion/core'
//import { rhythm } from "../../utils/typography"

export const resourceListStyles = css`
overflow-x: scroll;
border-radius: 5px;
padding: 1rem;
boxShadow: 0 2px 2px 0 rgba(0,0,0,0.05);
border: 1px solid #eaeaea;
table {
  min-width: 600px;
  position: relative;
}
tbody > tr {
  border-bottom: 1px solid #eaeaea;
}
td {
  width: 25%;
  padding-top: 0.25rem;
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