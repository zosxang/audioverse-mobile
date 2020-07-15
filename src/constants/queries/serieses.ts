export default
`query serieses($language: Language!, $afterCursor: String) {
  serieses(
    language: $language
    first: 25
    after: $afterCursor
    orderBy: [{ field: TITLE, direction: ASC }]
  ) {
    nodes {
      id
      title
      description
      logoImage: logoImageWithFallback {
        url(size: 86)
      }
      logoImage256: logoImage {
        url(size: 256)
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`
