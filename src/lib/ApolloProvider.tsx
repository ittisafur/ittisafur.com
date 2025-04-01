'use client';

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

// Client-side Apollo client creation
function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API || 'https://endpoints.ittisafur.com/graphql',
    fetchOptions: { 
      next: { revalidate: 20 } 
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
