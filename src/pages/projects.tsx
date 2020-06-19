import React from "react"
import Layout, { defaultStyle } from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import { PageProps, Link, graphql } from "gatsby"
import { mediaQueries } from "../utils/media-queries"
import Image from "gatsby-image"
import GithubIcon from "../components/GithubIcon"

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
  ${mediaQueries[0]} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ${mediaQueries[1]} {
    grid-template-columns: 1fr 1fr;
  }
`

const projectCardStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: solid 1px rgba(211, 211, 211, 0.75);
  box-shadow: 0 0 3px lightgrey;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
  ${mediaQueries[0]} {
    width: 70vw;
  }
`

const linkStyle = {
  alignSelf: "center",
  textDecoration: "none",
  boxShadow: "none",
}

const truncateString = (str: string, len: number) => {
  return str.length <= len
    ? str
    : str.slice(0, len - 3) + String.fromCharCode(8230)
}
const maxDescriptionLength = 140

const projectsPageStyle = css`
  ${defaultStyle};
`

export default function Projects({ data }: PageProps<ProjectData>) {
  const projects = data.allMarkdownRemark.edges
  return (
    <Layout
      title={`Brandon Ling${String.fromCharCode(8217)}s Projects`}
      style={projectsPageStyle}
    >
      <SEO
        title={`Brandon Ling${String.fromCharCode(8217)}s Projects`}
        lang="en"
      />
      <div css={projectGridStyle}>
        {projects.map(({ node }) => {
          return (
            <article css={projectCardStyle} key={node.fields.slug}>
              <figure style={{ display: "flex", flexDirection: "column" }}>
                <Link to={node.fields.slug} style={linkStyle}>
                  <Image
                    fixed={node.frontmatter.image_url.childImageSharp.fixed}
                    alt={node.frontmatter.title}
                    style={{ alignSelf: "center", marginBottom: "0.5rem" }}
                  />
                </Link>
                <Link to={node.fields.slug}>
                  <h3 style={{ margin: `0 0 0.5rem 0` }}>
                    {node.frontmatter.title}
                  </h3>
                </Link>
                <figcaption>
                  {truncateString(
                    node.frontmatter.description,
                    maxDescriptionLength
                  )}
                </figcaption>
              </figure>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <a
                  href={node.frontmatter.github_url}
                  style={{ boxShadow: "none" }}
                >
                  <GithubIcon />
                </a>
                Check it out
              </div>
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
            image_url {
              childImageSharp {
                fixed(width: 167, height: 300) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            description
          }
        }
      }
    }
  }
`
