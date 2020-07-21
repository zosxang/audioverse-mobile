export default `query conferences($language: Language!, $afterCursor: String) {
  conferences(
    language: $language
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
}
`;
