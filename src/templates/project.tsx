import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

interface ProjectProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    markdownRemark: {
      id: string
      frontmatter: {
        title: string
        github_url: string
      }
    }
  }
}

const Project = ({ data }: ProjectProps) => {
  const project = data.markdownRemark
  return (
    <Layout title={data.site.siteMetadata.title}>
      <h1>{project.frontmatter.title}</h1>
      <a href={project.frontmatter.github_url}>
        {project.frontmatter.github_url}
      </a>
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
      frontmatter {
        title
        github_url
      }
    }
  }
`
