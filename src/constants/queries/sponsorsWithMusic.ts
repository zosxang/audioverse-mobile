export default
`query sponsorsWithMusic($language: Language!, $afterCursor: String) {
  sponsors(
    language: $language
    withMusic: true
    first: 25
    after: $afterCursor
    orderBy: [{ field: TITLE, direction: ASC }]
  ) {
    nodes {
      id
      title
      logoImage: logoImageWithFallback {
        url(size: 86)
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`
