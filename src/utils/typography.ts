import Typography from "typography"
// import Wordpress2016 from "typography-theme-wordpress-2016"

// Wordpress2016.overrideThemeStyles = () => {
//   return {
//     "a.gatsby-resp-image-link": {
//       boxShadow: `none`,
//     },
//   }
// }

// delete Wordpress2016.googleFonts

// const typography = new Typography(Wordpress2016)
export const baseTextColor = "#fdfff5"
export const baseBackgroundColor = "#333333"
export const baseAccentColor = "#B88BDA"

const typography = new Typography({
  baseFontSize: "17px",
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
        color: baseTextColor,
      },
      "a:visited": {
        color: baseTextColor,
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
