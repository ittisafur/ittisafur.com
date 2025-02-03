import { HttpLink } from '@apollo/client';
import { registerApolloClient, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support';

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
                cache: 'no-store', // Disable HTTP cache
                next: { revalidate: 0 }, // Disable Next.js cache
            },
            credentials: 'same-origin', // Include credentials if needed
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

// Usage example in your component:
/*
const YourComponent = async () => {
    const client = getClient();
    try {
        const { data, error } = await client.query({
            query: YOUR_QUERY,
        });
        
        if (error) {
            console.error('GraphQL Error:', error);
            throw error;
        }
        
        return <div>{JSON.stringify(data)}</div>;
        
    } catch (err) {
        console.error('Query Error:', err);
        return <div>Error: {err.message}</div>;
    }
};
*/
