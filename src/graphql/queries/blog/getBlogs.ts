import { gql } from '@apollo/client';

export const GET_BLOGS = gql`
    query Blogs {
        blogs {
            title
            slug
            publishedAt
            excerpt
            categories {
                name
                slug
            }
            tags {
                name
                slug
            }
            featuredImage {
                url
                name
            }
        }
    }
`;
