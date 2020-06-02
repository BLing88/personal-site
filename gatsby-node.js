const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const blogResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { content_type: { eq: "blog" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (blogResult.errors) {
    throw blogResult.errors
  }

  // Create blog posts pages.
  const blogPosts = blogResult.data.allMarkdownRemark.edges

  blogPosts.forEach((post, index) => {
    const previous =
      index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
    const next = index === 0 ? null : blogPosts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  const projectTemplate = path.resolve("./src/templates/project.tsx")
  const projectsResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { content_type: { eq: "project" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                github_url
              }
            }
          }
        }
      }
    `
  )
  const projects = projectsResult.data.allMarkdownRemark.edges

  projects.forEach(project => {
    createPage({
      path: project.node.fields.slug,
      component: projectTemplate,
      context: {
        slug: project.node.fields.slug,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
    if (
      new RegExp(`${__dirname}/content/projects`).test(node.fileAbsolutePath)
    ) {
      createNodeField({
        name: `content_type`,
        node,
        value: "project",
      })
    }
    if (new RegExp(`${__dirname}/content/blog`).test(node.fileAbsolutePath)) {
      createNodeField({
        name: `content_type`,
        node,
        value: "blog",
      })
    }
  }
}
