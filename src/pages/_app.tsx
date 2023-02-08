import { ApolloProvider } from '@apollo/client';
import { CssBaseline, GlobalStyles } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { client } from '../apollo';
import { ChatsProvider } from '../components/chats-provider';
import { GuardContextProvider } from '../components/guard-context';
import { initI18n } from '../i18n';
import { store } from '../redux';
import { AppThemeProvider } from '../theme';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-medium-image-zoom/dist/styles.css';
import '../scss/react-toastify/main.scss';

initI18n();

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  return (
    <>
      <Head>
        <title>lb-nest</title>
        <meta name='description' content='The most powerful & intuitive chatbot builder' />
        <link rel='apple-touch-icon' href='/favicon.png' />
        <link rel='icon' href='/favicon.png' />
        <link rel='shortcut icon' href='/favicon.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='robots' content='noindex, nofollow' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap'
          rel='stylesheet'
        />
      </Head>
      <GlobalStyles
        styles={{
          '[data-rmiz-modal-overlay="hidden"]': {
            backgroundColor: '#00000000',
          },
          '[data-rmiz-modal-overlay="visible"]': {
            backgroundColor: '#00000080',
          },
        }}
      />
      <ApolloProvider client={client}>
        <Provider store={store}>
          <GuardContextProvider>
            <AppThemeProvider>
              <CssBaseline />
              <ModalProvider>
                <ChatsProvider>{getLayout(<Component {...pageProps} />)}</ChatsProvider>
                <ToastContainer position='bottom-right' />
              </ModalProvider>
            </AppThemeProvider>
          </GuardContextProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}
