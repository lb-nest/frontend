import { useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CREATE_WEBHOOK, UPDATE_WEBHOOK } from '../../../core/api';
import { Webhook, WebhookEventType } from '../../../core/types';

interface WebhookModalProps extends DialogProps {
  initData?: Webhook;
  onSubmit?: () => void;
  onCancel?: () => void;
}

interface Variables {
  name: string;
  url: string;
  eventType: WebhookEventType;
}

export const WebhookModal: React.FC<WebhookModalProps> = ({
  initData,
  onSubmit,
  onCancel,
  ...props
}) => {
  const isCreate = initData === undefined;

  const { t } = useTranslation();

  const form = useForm<Variables>();

  const [createWebhook] = useMutation(CREATE_WEBHOOK);
  const [updateWebhook] = useMutation(UPDATE_WEBHOOK);

  const handleSubmit = (variables: Variables) => {
    if (isCreate) {
      toast
        .promise(
          createWebhook({
            variables,
          }),
          t<any, any>('common:promise', { returnObjects: true }),
        )
        .then(() => onSubmit?.())
        .catch(() => null);
    } else {
      toast
        .promise(
          updateWebhook({
            variables: {
              id: initData.id,
              ...variables,
            },
          }),
          t<any, any>('common:promise', { returnObjects: true }),
        )
        .then(() => onSubmit?.())
        .catch(() => null);
    }
  };

  return (
    <Dialog {...props} maxWidth='sm' fullWidth>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle>
          {t<string>(`webhooks:modal.${isCreate ? 'create' : 'update'}.title`)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t<string>(`webhooks:modal.${isCreate ? 'create' : 'update'}.description`)}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label={t('webhooks:modal.fields.name')}
            type='text'
            fullWidth
            variant='outlined'
            defaultValue={initData?.name}
            required
            {...form.register('name')}
          />
          <TextField
            margin='dense'
            label={t('webhooks:modal.fields.url')}
            type='text'
            fullWidth
            variant='outlined'
            defaultValue={initData?.url}
            required
            {...form.register('url')}
          />
          <FormControl margin='dense' fullWidth>
            <InputLabel>{t('webhooks:modal.fields.eventType')}</InputLabel>
            <Select
              label={t('webhooks:modal.fields.eventType')}
              defaultValue={initData?.eventType ?? WebhookEventType.All}
              {...form.register('eventType')}>
              {Object.entries(WebhookEventType).map(([key, value]) => (
                <MenuItem value={value}>{t(`webhooks:eventType.${key}`)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={onCancel}>
            {t<string>('webhooks:modal.cancel')}
          </Button>
          <Button variant='outlined' type='submit'>
            {t<string>('webhooks:modal.submit')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
