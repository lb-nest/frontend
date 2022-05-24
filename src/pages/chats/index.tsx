import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChatsLayout } from '../../components/chats';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ChatsPage: NextPageWithLayout = () => {
  const { t } = useTranslation();

  const GuardWrapper = useGuard(projectGuard);

  return (
    <GuardWrapper>
      <Box display='flex' alignItems='center' justifyContent='center' flexGrow={1}>
        <Typography color='#6e778a'>{t<string>('chats:noChat')}</Typography>
      </Box>
    </GuardWrapper>
  );
};

ChatsPage.getLayout = (page) => <ChatsLayout>{page}</ChatsLayout>;

export default ChatsPage;
