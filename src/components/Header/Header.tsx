import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

const breakpoints = [450]
const mediaQueries = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const MenuStyle = css`
  position: relative;
  visibility: collapse;
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
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
    </svg>
  </button>
)

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const headerListStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  ul {
    display: flex;
    list-style: none;
    margin: 0;
  }
  ${mediaQueries[0]} {
    flex-direction: column;
    ul {
      flex-direction: column;
      top: 5.5rem;
      position: absolute;
      list-style: none;
    }

    li {
      color: green;
    }
  }
`

interface ListLinkProps {
  children: React.ReactNode
  to: string
}

const ListLink = ({ children, to }: ListLinkProps) => {
  return (
    <li>
      <Link
        css={css`
          margin-right: 1rem;
        `}
        to={to}
      >
        {children}
      </Link>
    </li>
  )
}

interface HeaderProps {
  title: string
}

export const Header = ({ title }: HeaderProps) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(true)
  const menuClickHandler = () =>
    setShowDropdownMenu(showDropdownMenu => !showDropdownMenu)

  useEffect(() => {
    if (window && window.innerWidth <= breakpoints[0]) {
      setShowDropdownMenu(false)
    }
  }, [setShowDropdownMenu, window.innerWidth])

  return (
    <header css={headerStyles}>
      <Link
        style={{
          boxShadow: `none`,
          color: `inherit`,
          fontSize: `24px`,
        }}
        to={`/`}
      >
        {title}
      </Link>

      <div css={headerListStyles}>
        <MenuIcon clickHandler={menuClickHandler} />
        {showDropdownMenu ? (
          <ul>
            <ListLink to={"/"}>About</ListLink>
            <ListLink to={"/projects/"}>Projects</ListLink>
            <ListLink to={"/blog/"}>Blog</ListLink>
            <ListLink to={"/contact/"}>Contact</ListLink>
          </ul>
        ) : null}
      </div>
    </header>
  )
}
