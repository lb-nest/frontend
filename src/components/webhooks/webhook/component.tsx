import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as types from '../../../core/types';

interface WebhookProps extends types.Webhook {
  onUpdate?: () => void;
  onDelete?: () => void;
}

export const Webhook: React.FC<WebhookProps> = ({
  id,
  name,
  url,
  eventType,
  onUpdate,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Typography component='span' fontWeight={700}>
          {name}
        </Typography>
        <TextField
          fullWidth
          margin='dense'
          label={t('webhooks:webhook.fields.url')}
          variant='standard'
          value={url}
          InputProps={{
            readOnly: true,
          }}
        />
        <Typography component='span'>
          {t('webhooks:webhook.fields.eventType')}: {t(`webhooks:eventType.${eventType}`)}
        </Typography>
      </CardContent>
      <CardActions>
        <Box>
          <Button size='small' onClick={onUpdate}>
            {t('webhooks:webhook.update')}
          </Button>
          <Button size='small' onClick={onDelete} color='error'>
            {t('webhooks:webhook.delete')}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
