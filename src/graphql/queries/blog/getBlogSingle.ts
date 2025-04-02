import { gql } from '@apollo/client';

export const GET_Blog_Single = gql`
    query BlogBySlug($slug: String!) {
        blogs(filters: { slug: { eq: $slug } }) {
            slug
            publishedAt
            updatedAt
            title
            content
            categories {
                name
                slug
            }
            tags {
                name
                slug
            }

            featuredImage {
                alternativeText
                name
                url
                caption
            }
            metaData {
                image {
                    caption
                    name
                    url
                    alternativeText
                }
                keywords {
                    keyword
                }
                title
            }
        }
    }
`;
