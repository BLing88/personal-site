// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import { css } from "@emotion/core"

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
    max-width: ${rhythm(25)};
    margin-left: auto;
    margin-right: auto;
    font-size: 1.1rem;
    text-align: left;
  }

  main {
    font-size: 1.25rem;

    p {
      margin-bottom: 2rem;
    }
  }

  footer {
    visibility: hidden;
  }

  ${mediaQueries[0]} {
    padding: ${rhythm(1.5)} ${rhythm(1 + 3 / 4)};
    main {
      text-align: left;
    }
  }
`

const HomePage = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle} style={homePageStyles}>
      <SEO title={siteTitle} lang="en" />
      <div>
        {/* <img src={`https://source.unsplash.com/random`} /> */}
        <p>I&rsquo;m a former physicist turned self&ndash;taught developer.</p>
        <p>I enjoy learning natural languages.</p>
        <p>I teach physics and math.</p>
        <p>I write code.</p>
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
