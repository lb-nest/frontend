import { useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CREATE_CHANNEL } from '../../../../core/api/channel';
import { ChannelType } from '../../../../core/types';

interface CreateChannelModalProps extends DialogProps {
  type: ChannelType;
  onSubmit?: () => void;
  onCancel?: () => void;
}

interface Variables {
  name: string;
  accountId?: string;
  token: string;
}

export const CreateChannelModal: React.FC<CreateChannelModalProps> = ({
  type,
  onSubmit,
  onCancel,
  ...props
}) => {
  const { t } = useTranslation();

  const form = useForm();

  const [createChannel] = useMutation(CREATE_CHANNEL);

  const handleSubmit = (variables: Variables) => {
    toast
      .promise(
        createChannel({
          variables: {
            type,
            ...variables,
          },
        }),
        t<any, any>('common:promise'),
      )
      .then(() => onSubmit?.())
      .catch(() => null);
  };

  return (
    <Dialog {...props} maxWidth='sm' fullWidth>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle>{t<string>(`channels:modal.${type}.title`)}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t<string>(`channels:modal.${type}.description`)}</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label={t(`channels:modal.${type}.name`)}
            type='text'
            fullWidth
            variant='outlined'
            {...form.register('name')}
          />
          {type === ChannelType.Whatsapp && (
            <TextField
              margin='dense'
              label={t(`channels:modal.${type}.accountId`)}
              type='text'
              fullWidth
              variant='outlined'
              {...form.register('accountId')}
            />
          )}
          <TextField
            margin='dense'
            label={t(`channels:modal.${type}.token`)}
            type='text'
            fullWidth
            variant='outlined'
            {...form.register('token')}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={onCancel}>
            {t<string>('channels:modal.cancel')}
          </Button>
          <Button variant='outlined' type='submit'>
            {t<string>('channels:modal.submit')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
