import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import 'react-medium-image-zoom/dist/styles.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { client } from '../apollo';
import { GuardContextProvider } from '../components/guard-context';
import { initI18n } from '../i18n';
import { store } from '../redux';
import { AppThemeProvider } from '../theme';

initI18n();

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function LeaballApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  return (
    <>
      <Head>
        <title>leadball.io</title>
        <meta name='description' content='The most powerful & intuitive chatbot builder' />
        <link rel='apple-touch-icon' href='/favicon.png' />
        <link rel='icon' href='/favicon.png' />
        <link rel='shortcut icon' href='/favicon.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <GuardContextProvider>
            <AppThemeProvider>
              <CssBaseline />
              <ModalProvider>
                {getLayout(<Component {...pageProps} />)}
                <ToastContainer position='bottom-right' />
              </ModalProvider>
            </AppThemeProvider>
          </GuardContextProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}
