import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

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
        next: { revalidate: 20 },
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  });
});
