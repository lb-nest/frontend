import { Container } from '@mui/material';
import React from 'react';
import { WorkInProgress } from '../../components/common';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const MailingsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <Container
        maxWidth='lg'
        sx={{
          height: '100%',
          overflow: 'auto',
        }}>
        <WorkInProgress />
        {/* <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>
          <Button variant='outlined'>{t<string>('mailings:create')}</Button>
        </Box>
        <Box>content here...</Box> */}
      </Container>
    </GuardWrapper>
  );
};

MailingsPage.getLayout = (page) => <Layout i18n='common:pages.mailings'>{page}</Layout>;

export default MailingsPage;
