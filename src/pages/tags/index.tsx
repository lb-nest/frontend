import { Container, Box, Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const TagsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const { t } = useTranslation();

  return (
    <GuardWrapper>
      <Container maxWidth='lg'>
        <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>
          <Button variant='outlined'>{t<string>('tags:create')}</Button>
        </Box>
        <Box>content here...</Box>
      </Container>
    </GuardWrapper>
  );
};

TagsPage.getLayout = (page) => <Layout i18n='common:pages.tags'>{page}</Layout>;

export default TagsPage;
