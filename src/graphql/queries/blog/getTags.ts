import { gql } from '@apollo/client';

export const GET_ALL_TAGS = gql`
    query GetTagsWithCount {
        categories {
            blog {
                tags {
                    name
                    slug
                    blogs {
                        documentId
                    }
                }
            }
        }
    }
`;

export const GET_BLOGS_BY_TAG = gql`
    query BlogsByTag($filters: TagFiltersInput) {
        tags(filters: $filters) {
            name
            slug
            blogs {
                title
                slug
                excerpt
                publishedAt
                categories {
                    name
                    slug
                }
            }
        }
    }
`;
