import { useMutation } from '@apollo/client';
import { Box, Button, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { GuardContext } from '../../components/guard-context';
import { ProjectsLayout } from '../../components/projects';
import { CREATE_PROJECT, SIGNIN_PROJECT } from '../../core/api';
import { useGuard, userGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

interface Variables {
  name: string;
}

const NewProjectPage: NextPageWithLayout = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const guard = React.useContext(GuardContext);
  const GuardWrapper = useGuard(userGuard);

  const [createProject] = useMutation(CREATE_PROJECT);
  const [signInProject] = useMutation(SIGNIN_PROJECT);

  const form = useForm<Variables>();

  const handleSubmit: SubmitHandler<Variables> = async (variables) => {
    try {
      const result = await toast.promise(
        createProject({
          variables,
        }),
        t<any, any>('common:promise', { returnObjects: true }),
      );

      if (result.data) {
        const token = await signInProject({
          variables: {
            id: result.data.createProject.id,
          },
        });

        if (token.data) {
          guard.signIn?.(token.data.signInProject.token);
          await router.replace('/');
        }
      }
    } catch {}
  };

  return (
    <>
      <Head>
        <title>{t('projects:new.title')}</title>
      </Head>
      <GuardWrapper>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Typography
            variant='body1'
            sx={{
              mt: 2,
            }}>
            {t('projects:new.tooltip')}
          </Typography>
          <TextField
            label={t('projects:new.name')}
            fullWidth
            margin='normal'
            {...form.register('name')}
          />
          <Box display='flex' alignItems='center' justifyContent='flex-end'>
            <Button variant='contained' type='submit'>
              {t('projects:new.submit')}
            </Button>
          </Box>
        </form>
      </GuardWrapper>
    </>
  );
};

NewProjectPage.getLayout = (page) => <ProjectsLayout>{page}</ProjectsLayout>;

export default NewProjectPage;
