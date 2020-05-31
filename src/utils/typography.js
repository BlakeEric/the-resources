import Typography from "typography"
import noriegaTheme from "typography-theme-noriega"

const typography = new Typography({
  ...noriegaTheme,
  overrideThemeStyles: ({ rhythm }, options, styles) => ({
    'a': {
      color: "#1779ba"
    },
    'p, ul, span': {
      color: "#828282"
    }
  })
})

export default typography
export const rhythm = typography.rhythm
