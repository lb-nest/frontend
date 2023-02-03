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
  signUp: {
    token: string;
  };
}

interface Variables {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const SIGNUP: TypedDocumentNode<Result, Variables> = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const SignUp: NextPage = () => {
  const { t } = useTranslation();

  const guard = React.useContext(GuardContext);
  const router = useRouter();

  const form = useForm<Variables>();
  const [signUp] = useMutation(SIGNUP);

  const handleSubmit: SubmitHandler<Variables> = async (variables) => {
    try {
      const result = await toast.promise(
        signUp({
          variables,
        }),
        t('common:promise', { returnObjects: true }),
      );
      if (result.data) {
        guard.signIn?.(result.data.signUp.token);
        await router.replace('/projects');
      }
    } catch {}
  };

  return (
    <>
      <Head>
        <title>{t('auth:signUp')}</title>
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
            title={t<string>('auth:signUp')}
            button={
              <Link href='/signin' passHref>
                <Button component='a' variant='outlined' size='small'>
                  {t('auth:signIn')}
                </Button>
              </Link>
            }
          />

          <TextField
            fullWidth
            margin='dense'
            label={t('auth:name')}
            type='text'
            {...form.register('name')}
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
          <TextField
            fullWidth
            margin='dense'
            label={t('auth:password2')}
            type='password'
            {...form.register('password2')}
          />
          <Box display='flex' alignItems='center' justifyContent='flex-end' mt={1}>
            <Button variant='contained' type='submit'>
              {t('auth:signUp')}
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default SignUp;
