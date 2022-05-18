import { useQuery } from '@apollo/client';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Profile, SettingsLayout } from '../../components/settings';
import { USER } from '../../core/api';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ProfileSettingsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const user = useQuery(USER);
  return (
    <GuardWrapper>
      <Container maxWidth='sm'>{user.data && <Profile user={user.data.user} />}</Container>
    </GuardWrapper>
  );
};

ProfileSettingsPage.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default ProfileSettingsPage;
