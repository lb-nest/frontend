import { useQuery } from '@apollo/client';
import { Box, Container } from '@mui/material';
import React from 'react';
import { Channel } from '../../components/channels';
import { CreateChannelButton } from '../../components/channels';
import { Layout } from '../../components/layout';
import { CHANNELS } from '../../core/api/channel';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const ChannelsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const channels = useQuery(CHANNELS);

  return (
    <GuardWrapper>
      <Container maxWidth='lg'>
        <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>
          <CreateChannelButton />
        </Box>
        <Box>
          {channels.data?.channels.map((channel) => (
            <Channel key={channel.id} {...channel} />
          ))}
        </Box>
      </Container>
    </GuardWrapper>
  );
};

ChannelsPage.getLayout = (page) => <Layout i18n='common:pages.channels'>{page}</Layout>;

export default ChannelsPage;
