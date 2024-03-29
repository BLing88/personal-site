import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { css } from "@emotion/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
require("katex/dist/katex.min.css")

interface BlogPostProps {
  data: {
    mdx: any
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
  pageContext: any
  location: Location
}

const blogPostStyle = css`
  header {
    padding: 0;
  }

  figcaption {
    font-size: 0.85rem;
    font-style: italic;
  }
`

const BlogPostTemplate = ({ data, pageContext }: BlogPostProps) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const tags = post.frontmatter.tags
  const { previous, next } = pageContext

  return (
    <Layout title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        lang="en"
        description={post.frontmatter.description || post.excerpt}
      />
      <article css={blogPostStyle}>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: "block",
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
            {tags ? <> &bull; {tags.join(", ")}</> : null}
          </p>
        </header>
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            listStyle: "none",
            padding: 0,
            marginLeft: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`
