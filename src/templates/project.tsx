import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { defaultStyle } from "../components/layout"
import { rhythm, linkColor } from "../utils/typography"
import { mediaQueries } from "../utils/media-queries"
import Layout from "../components/layout"
import SEO from "../components/seo"

interface ProjectProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    markdownRemark: {
      id: string
      html: string
      frontmatter: {
        title: string
        github_url: string
      }
    }
  }
}

const projectPageStyle = css`
  ${defaultStyle};

  main a {
    text-decoration: underline;
    color: ${linkColor};
  }

  ${mediaQueries[0]} {
    padding: ${rhythm(1.5)};
  }
`
const Project = ({ data }: ProjectProps) => {
  const project = data.markdownRemark
  return (
    <Layout title={data.site.siteMetadata.title} style={projectPageStyle}>
      <SEO title={project.frontmatter.title} lang="en" />
      <h1>{project.frontmatter.title}</h1>

      <section dangerouslySetInnerHTML={{ __html: project.html }}></section>
    </Layout>
  )
}

export default Project

export const projectPageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        github_url
      }
    }
  }
`
