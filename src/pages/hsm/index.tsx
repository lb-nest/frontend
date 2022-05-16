import { Box, Button, Container } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const HsmPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const { t } = useTranslation();

  return (
    <GuardWrapper>
      <Container
        maxWidth='lg'
        sx={{
          height: '100%',
          overflow: 'auto',
        }}>
        <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>
          <Button variant='outlined'>{t<string>('hsm:create')}</Button>
        </Box>
        <Box>content here...</Box>
      </Container>
    </GuardWrapper>
  );
};

HsmPage.getLayout = (page) => <Layout i18n='common:pages.hsm'>{page}</Layout>;

export default HsmPage;
