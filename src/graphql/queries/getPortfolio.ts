import { gql } from '@apollo/client';

export const GET_Portfolio = gql`
    query Portfolio {
        portfolios {
            Portfolio {
                isBreakThrough
                isFeatured
                isSideProject
                slug
                metaData {
                    description
                    image {
                        formats
                        hash
                        height
                        name
                        previewUrl
                        provider_metadata
                        size
                        url
                        width
                        alternativeText
                    }
                    keywords {
                        keyword
                    }
                    title
                }
                summary
                stack {
                    title
                    icon {
                        alternativeText
                        name
                        size
                        url
                        width
                        ext
                        formats
                        height
                    }
                }
                title
                url
                thumbnail {
                    alternativeText
                    ext
                    height
                    name
                    size
                    url
                    width
                }
                id
endDate
      hasDesign
      isWorking
      startDate
isFreelance
            }
        }
    }
`;
