// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Bio from "../components/bio"
import Layout, { defaultStyle } from "../components/layout"
import SEO from "../components/seo"
import { rhythm, baseAccentColor } from "../utils/typography"
import { mediaQueries } from "../utils/media-queries"

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMdx: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
          tags: string[] | null
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const blogPostPageStyles = css`
  ${defaultStyle};

  ${mediaQueries[0]} {
    padding: ${rhythm(1)};
  }
`

const blogPostStyle = css`
  header {
    padding: 0;
    margin-bottom: 0.25rem;
  }

  margin-bottom: 2.5rem;
`

const blogPageHeaderStyle = css`
  h3 {
    margin-bottom: ${rhythm(1 / 5)};
  }

  ${mediaQueries[0]} {
    padding: 0;
  }
`

const BlogIndex = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <Layout title={siteTitle} style={blogPostPageStyles}>
      <SEO title="All posts" />
      <div>
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const tags = node.frontmatter.tags

          return (
            <article css={blogPostStyle} key={node.fields.slug}>
              <header css={blogPageHeaderStyle}>
                <h3>
                  <Link
                    style={{ boxShadow: `none`, color: baseAccentColor }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </h3>
                <small>
                  {node.frontmatter.date}
                  {tags ? <> &bull; {tags.join(", ")}</> : null}
                </small>
              </header>
              <section>
                <p>{node.frontmatter.description || node.excerpt}</p>
              </section>
            </article>
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { fields: { content_type: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
