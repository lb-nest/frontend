import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';

const BACKEND_URI = 'http://192.168.0.2:8020/graphql';

const getAuthorization = () => {
  return 'Bearer '.concat(localStorage.getItem('token'));
};

const wsLink =
  typeof window === 'undefined'
    ? null
    : new GraphQLWsLink(
        createClient({
          url: BACKEND_URI.replace('http', 'ws'),
          connectionParams: () => ({
            authorization: getAuthorization(),
          }),
          shouldRetry: () => true,
          retryAttempts: 5,
        }),
      );

const link = ApolloLink.from([
  setContext(() => ({
    headers: {
      authorization: getAuthorization(),
    },
  })),
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation !== 'subscription';
    },
    createUploadLink({
      uri: BACKEND_URI,
    }),
    wsLink,
  ),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
