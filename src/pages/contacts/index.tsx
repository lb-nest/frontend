import React from 'react';
import { Layout } from '../../components/layout';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ContactsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <div>contacts</div>
    </GuardWrapper>
  );
};

ContactsPage.getLayout = (page) => <Layout i18n='common:pages.contacts'>{page}</Layout>;

export default ContactsPage;
