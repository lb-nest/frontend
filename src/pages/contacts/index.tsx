import { useQuery } from '@apollo/client';
import { Box, Container } from '@mui/material';
import { ContactsTable, CreateContactButton } from '../../components/contacts';
import { Layout } from '../../components/layout';
import { CONTACTS } from '../../core/api';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ContactsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const contacts = useQuery(CONTACTS);

  return (
    <GuardWrapper>
      <Container
        maxWidth='lg'
        sx={{
          height: '100%',
          overflow: 'auto',
        }}>
        <Box mt={1}>
          <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>
            <CreateContactButton onCreate={() => contacts.refetch()} />
          </Box>
          {contacts.data && <ContactsTable items={contacts.data.contacts} />}
        </Box>
      </Container>
    </GuardWrapper>
  );
};

ContactsPage.getLayout = (page) => <Layout i18n='common:pages.contacts'>{page}</Layout>;

export default ContactsPage;
