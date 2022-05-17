import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, Container, Grid } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Hsm, HsmModal } from '../../components/hsm';
import { Layout } from '../../components/layout';
import { HSM, REMOVE_HSM } from '../../core/api';
import * as types from '../../core/types';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const HsmPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const { t } = useTranslation();

  const hsm = useQuery(HSM);
  const [deleteHsm] = useMutation(REMOVE_HSM);

  const { showModal } = useModal();

  const handleShowModal = (initData?: types.Hsm) => {
    return () => {
      const modal = showModal(HsmModal, {
        initData,
        onSubmit: () => {
          hsm.refetch();
          modal.hide();
        },
        onCancel: () => {
          modal.hide();
        },
      });
    };
  };

  const handleDelete = (id: number) => {
    return async () => {
      try {
        await deleteHsm({
          variables: {
            id,
          },
        });

        await hsm.refetch();
      } catch {}
    };
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
          <Button variant='outlined' onClick={handleShowModal()}>
            {t<string>('hsm:create')}
          </Button>
        </Box>
        <Grid container spacing={2}>
          {hsm.data?.hsm.map((hsm) => (
            <Grid key={hsm.id} item xs={6} sm={4}>
              <Hsm {...hsm} onUpdate={handleShowModal(hsm)} onDelete={handleDelete(hsm.id)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </GuardWrapper>
  );
};

HsmPage.getLayout = (page) => <Layout i18n='common:pages.hsm'>{page}</Layout>;

export default HsmPage;
