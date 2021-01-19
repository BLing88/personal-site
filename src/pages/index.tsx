import { PageProps, graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { mediaQueries } from "../utils/media-queries"
import Img from "gatsby-image"

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
  main,
  footer {
    margin-left: auto;
    margin-right: auto;
    font-size: 1.1rem;
    text-align: left;
  }

  header {
    position: fixed;
    z-index: 2;
    width: 100%;
    padding: ${rhythm(1)} max(calc(50vw - ${rhythm(19)}), ${rhythm(1)}) 0
      max(calc(50vw - ${rhythm(19)}), ${rhythm(1)});
  }

  main {
    font-size: 2.5rem;
  }

  img {
    margin: 0;
  }

  footer {
    display: none;
  }

  ${mediaQueries[0]} {
    padding: 0;

    header {
      width: 100%;
      padding: ${rhythm(1)};
    }

    main {
      font-size: 1.75rem;
    }
  }
`

const HomePage = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const teachingImg = data.teachingImg
  const screenshotImg = data.screenshotImg

  return (
    <Layout title={siteTitle} style={homePageStyles}>
      <SEO title={siteTitle} lang="en" />
      <div
        css={css`
          position: fixed;
          z-index: 1;
          padding: 0 max(calc(50vw - ${rhythm(18.5)}), ${rhythm(1)});
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100vh;
          overflow: scroll;
          scroll-snap-type: y mandatory;
          ${mediaQueries[0]} {
            margin: 1rem;
          }
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
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          `}
        >
          <p
            css={css`
              ${mediaQueries[0]} {
                order: 2;
                margin-top: 1rem;
              }
            `}
          >
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
            .
          </p>
          <img
            src={require("../../content/assets/life-feynman-diagram.png")}
            alt="From physicist to developer as a Feynman diagram"
            title="From physicist to developer as a Feynman diagram"
          />
        </div>

        <div
          css={css`
            scroll-snap-align: start;
            min-height: 100vh;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-areas: "overlap";
            align-items: center;
            ${mediaQueries[0]} {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          `}
        >
          <Img
            title="Brandon teaching math and physics"
            alt="Brandon teaching math and physics"
            fluid={teachingImg.childImageSharp.fluid}
            style={{
              gridArea: "overlap",
              minWidth: `100%`,
            }}
            imgStyle={{
              opacity: 0.55,
            }}
          />

          <p
            css={css`
              font-size: 3.888rem;
              font-weight: bold;
              text-align: center;
              grid-area: overlap;
              z-index: 2;
              ${mediaQueries[0]} {
                font-size: 2.5rem;
                order: 2;
                margin-top: 2rem;
              }
            `}
          >
            I teach math and physics.
          </p>
        </div>
        <div
          css={css`
            display: grid;
            align-items: center;
            grid-template-columns: 3fr 2fr;
            min-height: 100vh;
            scroll-snap-align: start;
            grid-template-areas: "image text";
            ${mediaQueries[0]} {
              grid-template-areas: "image";
              grid-template-columns: auto;
              grid-template-rows: 1fr;
            }
          `}
        >
          <Img
            fluid={screenshotImg.childImageSharp.fluid}
            title="code screenshot"
            alt="code screenshot"
            style={{
              gridArea: "image",
            }}
          />
          <p
            css={css`
              text-align: center;
              grid-area: text;
              z-index: 2;
              ${mediaQueries[0]} {
                grid-area: image;
                font-weight: bold;
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

    teachingImg: file(absolutePath: { regex: "/teaching.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    screenshotImg: file(absolutePath: { regex: "/screenshot.png/" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
