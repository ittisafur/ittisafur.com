import { HttpLink } from '@apollo/client';
import {
    registerApolloClient,
    ApolloClient,
    InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        portfolios: {
                            merge(existing, incoming) {
                                return incoming;
                            },
                        },
                    },
                },
            },
        }),
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_API || 'https://endpoints.ittisafur.com/graphql',
            fetchOptions: {
                // cache: 'no-store',
                next: { revalidate: 20 },
            },
            // credentials: 'same-origin', // Include credentials if needed
            headers: {
                'Content-Type': 'application/json',
            },
        }),
        defaultOptions: {
            query: {
                fetchPolicy: 'network-only', // Always fetch fresh data
                errorPolicy: 'all', // Get both data and errors if they occur
            },
            watchQuery: {
                fetchPolicy: 'network-only',
                errorPolicy: 'all',
            },
        },
    });
});
