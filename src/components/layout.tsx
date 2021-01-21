import { ReactNode } from 'react'
import { Header } from './Header'
import GithubIcon from './GithubIcon'
import EmailIcon from './EmailIcon'
import { rhythm } from '../utils/typography'
import { css, SerializedStyles } from '@emotion/react'
import { mediaQueries } from '../utils/media-queries'

const objectIsEmptyOrUndefined = (obj: object | undefined) => {
  return obj === undefined || Object.keys(obj).length === 0
}

interface LayoutProps {
  title: string
  children?: ReactNode
  style?: SerializedStyles
}

export const defaultStyle = css`
  main,
  footer {
    max-width: ${rhythm(25)};
    margin-left: auto;
    margin-right: auto;
  }

  padding: ${rhythm(1)};

  ${mediaQueries[0]} {
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
        <a href="https://github.com/BLing88">
          <GithubIcon />
        </a>{' '}
        &bull;{' '}
        <a href="mailto:brandonling.dev@gmail.com">
          <EmailIcon />
        </a>{' '}
        &bull;{' '}
        <small style={{ opacity: 0.75 }}>
          © {new Date().getFullYear()} Brandon Ling, built with
          {' '}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </small>
      </footer>
    </div>
  )
}

export default Layout
