import { graphql } from "gatsby"
import { css } from "@emotion/react"
import Layout, { defaultStyle } from "../components/layout"
import { rhythm, linkColor } from "../utils/typography"
import { mediaQueries } from "../utils/media-queries"

import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"

interface ProjectProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    mdx: {
      id: string
      body: string
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
    text-decoration: none;
    color: ${linkColor};
  }

  main figure {
    width: 450px;
    height: 801px;
    margin-left: auto;
    margin-right: auto;
  }
`
const Project = ({ data }: ProjectProps) => {
  const project = data.mdx
  return (
    <Layout title={data.site.siteMetadata.title} style={projectPageStyle}>
      <SEO title={project.frontmatter.title} lang="en" />
      <h1>{project.frontmatter.title}</h1>
      <MDXRenderer>{project.body}</MDXRenderer>
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
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        github_url
      }
    }
  }
`
