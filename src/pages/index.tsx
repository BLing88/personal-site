import React, { useEffect } from "react"
import { PageProps, graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"
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
  padding: ${rhythm(1.5)};

  main,
  footer {
    padding: 0 calc(50vw - ${rhythm(20)});
    margin-left: auto;
    margin-right: auto;
    font-size: 1.1rem;
    text-align: left;
  }

  header {
    position: fixed;
    z-index: 2;
    width: calc(100% - 2 * ${rhythm(1.5)});
  }

  main {
    font-size: 2.5rem;
  }

  footer {
    display: none;
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
      <div
        css={css`
          position: fixed;
          z-index: 1;
          padding-right: calc(50vw - ${rhythm(20)} + 2.1rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100vh;
          overflow: scroll;
          scroll-snap-type: y mandatory;
        `}
      >
        <div
          css={css`
            display: grid;
            align-items: center;
            grid-template-columns: 3fr 2fr;
            min-height: 100vh;
            scroll-snap-align: start;
            ${mediaQueries[0]} {
              min-height: 90vh;
              grid-template-columns: auto;
              grid-template-rows: 1fr auto;
            }
          `}
        >
          <p>
            I’m a former{" "}
            <span>
              <strong>
                <em>physicist</em>
              </strong>
            </span>{" "}
            turned self&ndash;taught{" "}
            <span>
              <strong>
                <em>developer</em>
              </strong>
            </span>
          </p>
          <img
            src={require("../../content/assets/Untitled_Artwork3.png")}
            alt="From physicist to developer as a Feynman diagram"
            // css={css`
            //   grid-area: description-image;
            // `}
          />
        </div>

        <div
          css={css`
            display: grid;
            align-items: center;
            justify-items: center;
            grid-template-columns: 1;
            min-height: 100vh;
            scroll-snap-align: start;
            background: no-repeat center;
            background-image: linear-gradient(
                hsla(var(--baseBackgroundColor), 0.3),
                hsla(var(--baseBackgroundColor), 0.3)
              ),
              url(${require("../../content/assets/teaching.jpg")});
            background-size: contain;
          `}
        >
          <p
            css={css`
              font-size: 3.888rem;
              font-weight: bold;
              text-align: center;
            `}
          >
            I teach physics and math.
          </p>
        </div>
        <div
          css={css`
            display: grid;
            align-items: center;
            grid-template-columns: 3fr 2fr;
            min-height: 100vh;
            scroll-snap-align: start;
            ${mediaQueries[0]} {
              grid-template-areas: "overlap";
              grid-template-columns: auto;
              grid-template-rows: 1fr;
            }
          `}
        >
          <img
            src={require("../../content/assets/screenshot.png")}
            alt="Brandon Ling"
            css={css`
              ${mediaQueries[0]} {
                grid-area: overlap;
              }
            `}
          />
          <p
            css={css`
              text-align: center;
              ${mediaQueries[0]} {
                grid-area: overlap;
              }
            `}
          >
            I write code.
          </p>
        </div>
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
