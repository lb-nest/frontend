import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ComingSoon: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box mt={3}>
      <Typography variant='h4' gutterBottom>
        {t('common:comingSoon.title')}
      </Typography>
      <Typography variant='body1'>{t('common:comingSoon.description')}</Typography>
    </Box>
  );
};
