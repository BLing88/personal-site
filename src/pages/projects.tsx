import React from "react"
import Layout from "../components/layout"
import { css } from "@emotion/core"
import { PageProps, Link, graphql } from "gatsby"

type ProjectData = {
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
          github_url: string
          image_url: string
          description: string
        }
        fields: {
          slug: string
          content_type: string
        }
      }
    }[]
  }
}

const projectGridStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.35rem;

  @media only screen and (max-width: 450px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const projectCardStyle = css`
  border: solid 1px rgba(211, 211, 211, 0.1);
  box-shadow: 0 0 3px grey;
  padding: 0.5rem;
  margin-bottom: 2rem;
`

const linkStyle = { textDecoration: "none", boxShadow: "none" }

export default function Projects({ data }: PageProps<ProjectData>) {
  const siteTitle = data.site.siteMetadata.title
  const projects = data.allMarkdownRemark.edges
  return (
    <Layout title={siteTitle}>
      <div css={projectGridStyle}>
        {projects.map(({ node }) => {
          return (
            <article css={projectCardStyle} key={node.fields.slug}>
              <figure style={{ display: "flex", flexDirection: "column" }}>
                <Link to={node.fields.slug} style={linkStyle}>
                  <img
                    src={node.frontmatter.image_url}
                    style={{ alignSelf: "center", marginBottom: "0.5rem" }}
                  />

                  <h3 style={{ margin: 0 }}>{node.frontmatter.title}</h3>
                </Link>
                {node.frontmatter.description}
              </figure>

              <a href={node.frontmatter.github_url}>
                {node.frontmatter.github_url}
              </a>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export const projectsPageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fields: { content_type: { eq: "project" } } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            github_url
            image_url
            description
          }
        }
      }
    }
  }
`
