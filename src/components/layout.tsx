import React, { ReactNode } from "react"
import { Header } from "../components/Header"

import { rhythm } from "../utils/typography"
import { css, SerializedStyles } from "@emotion/core"
import { mediaQueries } from "../utils/media-queries"

const objectIsEmptyOrUndefined = (obj: object | undefined) => {
  return obj === undefined || Object.keys(obj).length === 0
}

interface LayoutProps {
  title: string
  children?: ReactNode
  style?: SerializedStyles
}

export const defaultStyle = css`
  header {
    padding: ${rhythm(1.5)} calc(50vw - ${rhythm(20)});
  }

  main,
  footer {
    max-width: ${rhythm(25)};
    margin-left: auto;
    margin-right: auto;
  }
  footer {
    margin-bottom: ${rhythm(1.5)};
  }

  ${mediaQueries[0]} {
    padding: ${rhythm(1.5)};

    header {
      margin-bottom: 0;
    }
  }
`

const Layout = ({ title, children, style }: LayoutProps) => {
  return (
    <div css={!objectIsEmptyOrUndefined(style) ? style : defaultStyle}>
      <Header title={title} />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
