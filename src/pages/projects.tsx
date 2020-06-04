import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import { PageProps, Link, graphql } from "gatsby"
import { mediaQueries } from "../utils/media-queries"
import Image from "gatsby-image"
import { baseTextColor } from "../utils/typography"

const GithubIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="24px"
    height="24px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>GitHub</title>
    <path
      fill={baseTextColor}
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </svg>
)

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

export default function Projects({ data }: PageProps<ProjectData>) {
  const projects = data.allMarkdownRemark.edges
  return (
    <Layout title={`Brandon Ling${String.fromCharCode(8217)}s Projects`}>
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
                  {/* <img
                    src={
                      node.frontmatter.image_url[0] === "."
                        ? require(node.frontmatter.image_url)
                        : node.frontmatter.image_url
                    }
                    style={{ alignSelf: "center", marginBottom: "0.5rem" }}
                  /> */}
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
