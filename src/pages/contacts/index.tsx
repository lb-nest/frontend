import { useQuery } from '@apollo/client';
import { Container, Box } from '@mui/material';
import React from 'react';
import { ContactsTable } from '../../components/contacts';
import { Layout } from '../../components/layout';
import { CONTACTS } from '../../core/api';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ContactsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const contacts = useQuery(CONTACTS);

  return (
    <GuardWrapper>
      <Container maxWidth='lg'>
        <Box mt={1}>{contacts.data && <ContactsTable items={contacts.data.contacts} />}</Box>
      </Container>
    </GuardWrapper>
  );
};

ContactsPage.getLayout = (page) => <Layout i18n='common:pages.contacts'>{page}</Layout>;

export default ContactsPage;
