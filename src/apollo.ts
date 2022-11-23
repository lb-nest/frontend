import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { Client, ClientOptions, createClient } from 'graphql-ws';

interface RestartableClient extends Client {
  restart(): void;
}

const createRestartableClient = (options: ClientOptions): RestartableClient => {
  let restartRequested = false;
  let restart = () => {
    restartRequested = true;
  };

  const client = createClient({
    ...options,
    on: {
      ...options.on,
      opened: (socket: any) => {
        options.on?.opened?.(socket);

        restart = () => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.close(4205, 'Client Restart');
          } else {
            restartRequested = true;
          }
        };

        if (restartRequested) {
          restartRequested = false;
          restart();
        }
      },
    },
  });

  return {
    ...client,
    restart: () => restart(),
  };
};

const getAuthorization = () => {
  return 'Bearer '.concat(localStorage.getItem('token'));
};

const wsLink =
  typeof window === 'undefined'
    ? null
    : new GraphQLWsLink(
        createRestartableClient({
          url: process.env.NEXT_PUBLIC_BACKEND_URI.replace('http', 'ws'),
          connectionParams: () => ({
            authorization: getAuthorization(),
          }),
          shouldRetry: () => true,
        }),
      );

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables && operation.operationName !== 'Upload') {
    operation.variables = JSON.parse(JSON.stringify(operation.variables), (key, value) =>
      key === '__typename' ? undefined : value,
    );
  }
  return forward(operation);
});

const link = ApolloLink.from([
  cleanTypeName,
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
      uri: process.env.NEXT_PUBLIC_BACKEND_URI,
    }),
    wsLink,
  ),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
