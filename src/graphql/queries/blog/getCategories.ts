import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = gql`
    query GetAllCategories {
        categories {
            name
            slug
            blog {
                documentId
            }
        }
    }
`;

export const GET_BLOGS_BY_CATEGORY = gql`
    query BlogsByCategory($filters: CategoryFiltersInput) {
        categories(filters: $filters) {
            name
            slug
            blog {
                title
                slug
                excerpt
                publishedAt
                tags {
                    name
                    slug
                }
            }
        }
    }
`;
