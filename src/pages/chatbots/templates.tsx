import { Container, Box } from '@mui/material';
import React from 'react';
import { WorkInProgress } from '../../components/common';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ChatbotTemplatesPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <Container
        maxWidth='lg'
        sx={{
          height: '100%',
          overflow: 'auto',
        }}>
        <Box mt={1}>
          <WorkInProgress />
        </Box>
      </Container>
    </GuardWrapper>
  );
};

ChatbotTemplatesPage.getLayout = (page) => <Layout i18n='common:pages.chatbots'>{page}</Layout>;

export default ChatbotTemplatesPage;
