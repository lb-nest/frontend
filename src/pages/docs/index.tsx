import { Container } from '@mui/material';
import React from 'react';
import { WorkInProgress } from '../../components/common';
import { DocsLayout } from '../../components/docs';
import { NextPageWithLayout } from '../_app';

const DocsPage: NextPageWithLayout = () => {
  return (
    <Container>
      <WorkInProgress />
    </Container>
  );
};

DocsPage.getLayout = (page) => <DocsLayout>{page}</DocsLayout>;

export default DocsPage;
