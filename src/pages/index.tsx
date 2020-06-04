// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import { css } from "@emotion/core"

import Bio from "../components/bio"
import Layout, { defaultStyle } from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { mediaQueries } from "../utils/media-queries"

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const homePageStyles = css`
  ${defaultStyle};
  main,
  footer {
    max-width: ${rhythm(32)};
    margin-left: auto;
    margin-right: auto;
  }

  ${mediaQueries[0]} {
    padding: ${rhythm(1.5)} ${rhythm(1 + 3 / 4)};
  }
`

const HomePage = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle} style={homePageStyles}>
      <SEO title={siteTitle} lang="en" />
      <div>
        <Bio />
      </div>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
