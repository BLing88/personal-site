import { useState, useLayoutEffect } from "react";
import * as React from "react";
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { breakpoints, mediaQueries } from "../../utils/media-queries"
import { linkColor, baseBackgroundColor, rhythm } from "../../utils/typography"

const MenuStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  visibility: collapse;
  background-color: ${baseBackgroundColor};
  border-radius: 3px;
  border: solid 1px grey;
  padding: 0.25rem 0.25rem;
  box-shadow: 0 0 1px grey;
  grid-area: menu;
  align-self: center;
  max-height: 2rem;
  ${mediaQueries[0]} {
    visibility: visible;
    cursor: pointer;
  }
`

interface MenuIconProps {
  clickHandler: () => void
}
const MenuIcon = ({ clickHandler }: MenuIconProps) => (
  <button
    aria-label="menu"
    onClick={e => {
      e.preventDefault()
      clickHandler()
    }}
    css={MenuStyle}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      {/* <path fill="none" d="M0 0h24v24H0z" /> */}
      <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill={linkColor} />
    </svg>
  </button>
)

const headerStyles = css`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "title menu"
    "links links";
  gap: 1rem;
  padding-left: calc(50vw - ${rhythm(20)});
  padding-right: calc(50vw - ${rhythm(20)});
  margin-bottom: 1rem;
  ${mediaQueries[0]} {
    padding-bottom: 0;
  }
`

interface ListLinkProps {
  children: React.ReactNode
  to: string
}

const ListLink = ({ children, to }: ListLinkProps) => {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  )
}

const linkListStyle = css`
  grid-area: menu;
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  align-items: center;
  width: 100%;
  li {
    margin-bottom: 0;
    margin-left: 1rem;
  }
  ${mediaQueries[0]} {
    background-color: hsl(var(--baseBackgroundColor));
    grid-area: links;
    li {
      margin-left: 0;
      margin-bottom: 1rem;
    }
  }
`

interface HeaderProps {
  title: string
}

export const Header = ({ title }: HeaderProps) => {
  const [showMenuButton, setShowMenuButton] = useState(false)
  const menuClickHandler = () =>
    setShowMenuButton(showMenuButton => !showMenuButton)

  useLayoutEffect(() => {
    if (window && window.innerWidth <= breakpoints[0]) {
      setShowMenuButton(true)
    }
  }, [setShowMenuButton])

  return (
    <header css={headerStyles}>
      <h1 style={{ margin: 0 }}>
        <Link
          style={{
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>

      <MenuIcon clickHandler={menuClickHandler} />
      {!showMenuButton ? (
        <ul css={linkListStyle}>
          <ListLink to={"/"}>About</ListLink>
          <ListLink to={"/projects/"}>Projects</ListLink>
          <ListLink to={"/blog/"}>Blog</ListLink>
          <ListLink to={"/contact/"}>Contact</ListLink>
        </ul>
      ) : null}
    </header>
  )
}
