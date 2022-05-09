import { useQuery } from '@apollo/client';
import { Box, Button, Container } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout';
import { Webhook } from '../../components/webhooks';
import { WEBHOOKS } from '../../core/api';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const WebhooksPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const { t } = useTranslation();

  const webhooks = useQuery(WEBHOOKS);

  return (
    <GuardWrapper>
      <Container maxWidth='lg'>
        <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>
          <Button variant='outlined'>{t<string>('webhooks:create')}</Button>
        </Box>
        <Box>
          {webhooks.data?.webhooks.map((webhook) => (
            <Webhook key={webhook.id} {...webhook} />
          ))}
        </Box>
      </Container>
    </GuardWrapper>
  );
};

WebhooksPage.getLayout = (page) => <Layout i18n='common:pages.webhooks'>{page}</Layout>;

export default WebhooksPage;
