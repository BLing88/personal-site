import React, { ReactChildren, ReactNode } from "react"
import { Header } from "../components/Header"

import { rhythm } from "../utils/typography"
import { css, SerializedStyles } from "@emotion/core"
import { mediaQueries } from "../utils/media-queries"

interface LayoutProps {
  title: string
  children?: ReactNode
  style?: SerializedStyles
}

export const defaultStyle = css`
  padding: ${rhythm(1.5)} calc(50vw - ${rhythm(40)} / 2);

  ${mediaQueries[0]} {
    padding: ${rhythm(1.5)};
  }
`

const Layout = ({ title, children, style }: LayoutProps) => {
  return (
    <div css={style ? style : defaultStyle}>
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
