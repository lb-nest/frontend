import { useMutation, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import { Paper, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { GuardContext } from '../../components/guard-context';
import { ProjectCard, ProjectsLayout } from '../../components/projects';
import { SIGNIN_PROJECT, USER_PROJECTS } from '../../core/api';
import { useGuard, userGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ProjectsPage: NextPageWithLayout = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const guard = React.useContext(GuardContext);
  const GuardWrapper = useGuard(userGuard);

  const userProjects = useQuery(USER_PROJECTS);
  const [signInProject] = useMutation(SIGNIN_PROJECT);

  const handleClick = async (id: number) => {
    try {
      const result = await toast.promise(
        signInProject({
          variables: {
            id,
          },
        }),
        t<any, any>('common:promise', { returnObjects: true }),
      );

      if (result.data) {
        guard.signIn?.(result.data.signInProject.token);
        await router.replace('/');
      }
    } catch {}
  };

  return (
    <>
      <Head>
        <title>{t('projects:index.title')}</title>
      </Head>
      <GuardWrapper>
        <Typography
          variant='body1'
          sx={{
            mt: 2,
          }}>
          {t('projects:index.tooltip')}
        </Typography>
        <Stack spacing={1}>
          {userProjects.data?.userProjects.map((project) => (
            <ProjectCard key={project.id} {...project} onClick={handleClick} />
          ))}
          <Link href='/projects/new'>
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 1,
                padding: 2,
                cursor: 'pointer',
                transition: '200ms ease',
                ':hover': {
                  bgcolor: '#f1f1f1',
                },
              }}>
              <Add />
              <Typography
                variant='body1'
                sx={{
                  ml: 1,
                }}>
                {t('projects:new.title')}
              </Typography>
            </Paper>
          </Link>
        </Stack>
      </GuardWrapper>
    </>
  );
};

ProjectsPage.getLayout = (page) => <ProjectsLayout>{page}</ProjectsLayout>;

export default ProjectsPage;
