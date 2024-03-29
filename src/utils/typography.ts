import Typography from "typography"
export const baseTextColor = "#fdfff5"
export const baseBackgroundColor = "#333333"
export const baseAccentColor = "#B88BDA"
export const linkColor = "#ff9492"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.4,
  headerFontFamily: ["Source Sans Pro", "Fira Sans", "sans-serif"],
  bodyFontFamily: ["Source Sans Pro", "Fira Sans", "sans-serif"],
  overrideStyles: () => {
    return {
      "a.gatsby-resp-image-link": {
        boxShadow: `none`,
      },
      a: {
        textDecoration: `none`,
        color: linkColor,
      },
      "a:visited": {
        color: linkColor,
      },
      "a:hover": {
        color: baseAccentColor,
      },
      html: {
        backgroundColor: baseBackgroundColor,
      },
      body: {
        color: baseTextColor,
      },
      hr: {
        backgroundColor: baseAccentColor,
      },
    }
  },
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
