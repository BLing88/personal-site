import React, { useRef, useEffect } from "react"
import { PageProps, Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { useInView } from "react-intersection-observer"

import Layout, { defaultStyle } from "../components/layout"
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
  ${defaultStyle};
  height: calc(100vh - ${rhythm(3)});
  main,
  footer {
    max-width: ${rhythm(25)};
    margin-left: auto;
    margin-right: auto;
    font-size: 1.1rem;
    text-align: left;
  }

  main {
    font-size: 1.25rem;
    height: 100%;
    p {
      margin-bottom: 2rem;
    }
  }

  footer {
    visibility: hidden;
  }

  ${mediaQueries[0]} {
    padding: ${rhythm(1.5)} ${rhythm(1 + 3 / 4)};
    main {
      text-align: left;
    }
  }
`

// const scrollToPosition = (
//   elemRef: React.MutableRefObject<HTMLParagraphElement | null>,
//   offsetY: number
// ) => {
//   const y = elemRef.current!.offsetTop
//   console.log(elemRef)
//   window.scrollTo({ top: y + offsetY, behavior: "smooth" })
// }
// const scrollToPosition = (elem: HTMLElement, offsetY: number) => {
//   const y = elem.offsetTop
//   window.scrollTo({ top: y + offsetY, behavior: "smooth" })
// }

const HomePage = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  // const [ref, inView, entry] = useInView({
  //   threshold: 0.5,
  // })

  // if (inView) {
  //   scrollToPosition(entry.target, -100)
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     scrollToPosition(testRef, -100)
  //   }, 1000)
  // }, [testRef])
  return (
    <Layout title={siteTitle} style={homePageStyles}>
      <SEO title={siteTitle} lang="en" />
      <div
        css={css`
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `}
      >
        {/* <div
          style={{
            backgroundImage: "url(https://source.unsplash.com/random/632x400)",
            height: `400px`,
            boxShadow: "inset 0 0 10px grey",
            border: `solid 0.25rem black`,
            borderRadius: `1rem`,
            // marginLeft: `-${rhythm(12.5)}`,
          }}
        >
          <p>
            I&rsquo;m a former physicist turned self&ndash;taught developer.
          </p>
        </div> */}
        {/* <img src={`https://source.unsplash.com/random`} />
        <img src={`https://source.unsplash.com/random`} />
        <img src={`https://source.unsplash.com/random`} /> */}
        {/* <p>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?" "Sed ut
          perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
          odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
          quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
          eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
          ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
          velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
          fugiat quo voluptas nulla pariatur?"
        </p> */}
        <p>I&rsquo;m a former physicist turned self&ndash;taught developer.</p>
        <p>I love learning natural languages.</p>
        <p>I teach physics and math.</p>
        <p>I write code.</p>
        {/* <p>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?" "Sed ut
          perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
          odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
          quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
          eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
          ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
          velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
          fugiat quo voluptas nulla pariatur?"
        </p> */}
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
