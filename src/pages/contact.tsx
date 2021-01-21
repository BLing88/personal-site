import Layout, { defaultStyle } from '../components/layout'
import { mediaQueries } from '../utils/media-queries'
import SEO from '../components/seo'
import { css } from '@emotion/react'
import { graphql, PageProps } from 'gatsby'

interface ContactPageData {
  site: {
    siteMetadata: {
      title: string
      email: string
      github: string
      linkedIn: string
    }
  }
}

const contactPageStyles = css`
  ${defaultStyle}
  main {
    font-size: 1.25rem;
    ul {
      list-style: none;
    }
  }

  ${mediaQueries[0]} {
    main {
      font-size: 1rem;
    }
  }
`

export default function Contact ({ data }: PageProps<ContactPageData>) {
  const { title: siteTitle, email, github, linkedIn } = data.site.siteMetadata

  return (
    <Layout title={siteTitle} style={contactPageStyles}>
      <SEO title={siteTitle} />
      <p>Feel free to send me a message through:</p>
      <ul>
        <li>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li>
          LinkedIn: <a href={`https://${linkedIn}`}>{linkedIn}</a>
        </li>
        <li>
          Github: <a href={`https://github.com/${github}`}>@{github}</a>
        </li>
      </ul>
    </Layout>
  )
}

export const contactPageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        email
        github
        linkedIn
      }
    }
  }
`
