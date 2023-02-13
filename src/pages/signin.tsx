import { gql, TypedDocumentNode, useMutation } from '@apollo/client';
import { Box, Button, Container, TextField } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { GuardContext } from '../components/guard-context';
import { AuthHeader } from '../components/layout';

interface Result {
  signIn: {
    token: string;
  };
}

interface Variables {
  email: string;
  password: string;
}

const SIGN_IN: TypedDocumentNode<Result, Variables> = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

const SignIn: NextPage = () => {
  const { t } = useTranslation();

  const guard = React.useContext(GuardContext);
  const router = useRouter();

  const form = useForm<Variables>();
  const [signIn] = useMutation(SIGN_IN);

  const handleSubmit: SubmitHandler<Variables> = async (variables) => {
    try {
      const result = await toast.promise(
        signIn({
          variables,
        }),
        t('common:promise', { returnObjects: true }),
      );
      if (result.data) {
        guard.signIn?.(result.data.signIn.token);
        await router.replace('/projects');
      }
    } catch {}
  };

  return (
    <>
      <Head>
        <title>{t('auth:signIn')}</title>
      </Head>
      <Container
        maxWidth='xs'
        sx={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
        }}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <AuthHeader
            title={t<string>('auth:signIn')}
            button={
              <Button href='/signup' component={Link} variant='outlined' size='small'>
                {t('auth:signUp')}
              </Button>
            }
          />
          <TextField
            fullWidth
            margin='dense'
            label={t('auth:email')}
            type='email'
            {...form.register('email')}
          />
          <TextField
            fullWidth
            margin='dense'
            label={t('auth:password')}
            type='password'
            {...form.register('password')}
          />
          <Box display='flex' alignItems='center' justifyContent='space-between' mt={1}>
            <Button href='#' component={Link}>
              {t('auth:restore')}
            </Button>
            <Button variant='contained' type='submit'>
              {t('auth:signIn')}
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default SignIn;
