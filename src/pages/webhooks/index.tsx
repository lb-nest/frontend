import { useQuery } from '@apollo/client';
import { Box, Button, Container, Grid } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout';
import { Webhook, WebhookModal } from '../../components/webhooks';
import { WEBHOOKS } from '../../core/api';
import * as types from '../../core/types';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const WebhooksPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const { t } = useTranslation();

  const webhooks = useQuery(WEBHOOKS);

  const { showModal } = useModal();

  const handleShowModal = (initData?: types.Webhook) => {
    const modal = showModal(WebhookModal, {
      initData,
      onSubmit: () => {
        webhooks.refetch();
        modal.hide();
      },
      onCancel: () => {
        modal.hide();
      },
    });
  };

  return (
    <GuardWrapper>
      <Container
        maxWidth='lg'
        sx={{
          height: '100%',
          overflow: 'auto',
        }}>
        <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>
          <Button
            variant='outlined'
            onClick={() => {
              handleShowModal();
            }}>
            {t<string>('webhooks:create')}
          </Button>
        </Box>
        <Grid container spacing={2}>
          {webhooks.data?.webhooks
            .filter((webhook) => !webhook.name.startsWith('system.'))
            .map((webhook) => (
              <Grid key={webhook.id} item xs={6} sm={4}>
                <Webhook
                  key={webhook.id}
                  {...webhook}
                  onUpdate={() => {
                    handleShowModal(webhook);
                  }}
                  onDelete={() => {}}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </GuardWrapper>
  );
};

WebhooksPage.getLayout = (page) => <Layout i18n='common:pages.webhooks'>{page}</Layout>;

export default WebhooksPage;
