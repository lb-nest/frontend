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
          label={t<string>('webhooks:webhook.fields.url')}
          variant='standard'
          value={url}
          InputProps={{
            readOnly: true,
          }}
        />
        <Typography component='span' variant='caption'>
          {t<string>('webhooks:webhook.fields.eventType')}
          {': '}
          {t<string>(`webhooks:eventType.${eventType}`)}
        </Typography>
      </CardContent>
      <CardActions>
        <Box>
          <Button size='small' onClick={onUpdate}>
            {t<string>('webhooks:webhook.update')}
          </Button>
          <Button size='small' onClick={onDelete} color='error'>
            {t<string>('webhooks:webhook.delete')}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
