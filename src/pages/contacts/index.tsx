import { useQuery } from '@apollo/client';
import { Box, Container } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import React from 'react';
import { ContactModal, ContactsTable } from '../../components/contacts';
import { Layout } from '../../components/layout';
import { CONTACTS } from '../../core/api';
import * as types from '../../core/types';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ContactsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const contacts = useQuery(CONTACTS);

  const { showModal } = useModal();

  const handleShowModal = (initData?: types.Contact) => {
    const modal = showModal(ContactModal, {
      initData,
      onSubmit: () => {
        contacts.refetch();
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
        <Box mt={1}>
          {contacts.data && (
            <ContactsTable
              items={contacts.data.contacts}
              onUpdate={handleShowModal}
              onDelete={() => {}}
            />
          )}
        </Box>
      </Container>
    </GuardWrapper>
  );
};

ContactsPage.getLayout = (page) => <Layout i18n='common:pages.contacts'>{page}</Layout>;

export default ContactsPage;
