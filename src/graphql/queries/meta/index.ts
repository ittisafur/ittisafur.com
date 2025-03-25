import { gql } from '@apollo/client';

export const GET_Landing_SEO_DATA = gql`
    query SEO {
        landing {
            metaData {
                title
                description
                image {
                    url
                }
                keywords {
                    keyword
                }
            }
        }
    }
`;

export const GET_Portfolio_SEO_DATA = gql`
    query PortfolioSEO {
        portfolioSeo {
            metaData {
                title
                description
                image {
                    url
                }
                keywords {
                    keyword
                }
            }
        }
    }
`;

export const GET_About_SEO_DATA = gql`
    query AboutSEO {
        aboutSEO {
            metaData {
                title
                description
                image {
                    url
                }
                keywords {
                    keyword
                }
            }
        }
    }
`;

export const GET_Blog_SEO_DATA = gql`
    query BlogSEO {
        blogSeo {
            metaData {
                title
                description
                image {
                    name
                    url
                }
                keywords {
                    keyword
                }
            }
        }
    }
`;

export const GET_Contact_SEO_DATA = gql`
    query ContactSEO {
        contactSEO {
            metaData {
                title
                description
                image {
                    url
                }
                keywords {
                    keyword
                }
            }
        }
    }
`;
