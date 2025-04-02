import { gql } from '@apollo/client';

export const GET_Portfolio_Single = gql`
    query PortfolioSingle($slug: String!, $filters: PortfolioFiltersInput) {
        portfolios(filters: $filters) {
            Portfolio(filters: { slug: { eq: $slug } }) {
                description
                endDate
                gallery {
                    url
                    name
                }
                hasDesign
                isBreakThrough
                isFeatured
                isSideProject
                isWorking
                metaData {
                    description
                    image {
                        url
                        name
                        alternativeText
                    }
                    keywords {
                        keyword
                    }
                    title
                }
                slug
                stack {
                    title
                    icon {
                        alternativeText
                        url
                        name
                    }
                }
                startDate
                summary
                thumbnail {
                    alternativeText
                    url
                    name
                }
                title
                url
                yt_demo
            }
        }
    }
`;
