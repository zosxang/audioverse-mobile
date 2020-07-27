import recordingFragment from './fragments/recording';

export default `query search($language: Language!, $term: String!) {
  conferences(language: $language, search: $term, first: 25) {
    nodes {
      id
      title
      logoImage: logoImageWithFallback {
        url(size: 86)
      }
    }
  }
  presenters(language: $language, search: $term, first: 25) {
    nodes {
      id
      name
      description
      photoWithFallback {
        url(size: 86)
      }
      photo {
        url(size: 256)
      }
    }
  }
  sermons(language: $language, search: $term, first: 25) {
    nodes {
      ...recordingFragment
    }
  }
  serieses(language: $language, search: $term, first: 25) {
    nodes {
      id
      title
      logoImage: logoImageWithFallback {
        url(size: 86)
      }
    }
  }
  sponsors(language: $language, search: $term, first: 25) {
    nodes {
      id
      title
      logoImage: logoImageWithFallback {
        url(size: 86)
      }
    }
  }
}
${recordingFragment}
`;