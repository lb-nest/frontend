import { Box } from '@mui/material';
import React from 'react';
import { WorkInProgress } from '../../components/common';
import { SettingsLayout } from '../../components/settings';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const SettingsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <Box padding='0 15px'>
        <WorkInProgress />
      </Box>
    </GuardWrapper>
  );
};

SettingsPage.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default SettingsPage;
