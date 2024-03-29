/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import { css } from '@emotion/react'
import { rhythm } from '../utils/typography'
import { mediaQueries } from '../utils/media-queries'

const bioStyle = css`
  display: flex;
  margin-bottom: ${rhythm(1.5)};

  ${mediaQueries[0]} {
    margin-bottom: 0;
  }
`

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <div css={bioStyle}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: '100%'
        }}
        imgStyle={{
          borderRadius: '50%'
        }}
      />
      <p>
        Written by <strong>{author.name}</strong> {author.summary}
      </p>
    </div>
  )
}

export default Bio
