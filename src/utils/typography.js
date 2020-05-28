import Typography from "typography"
import altonTheme from "typography-theme-alton"

const typography = new Typography({...altonTheme,
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
