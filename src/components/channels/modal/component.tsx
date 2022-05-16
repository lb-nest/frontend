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
import { CREATE_CHANNEL, UPDATE_CHANNEL } from '../../../core/api';
import { Channel, ChannelType } from '../../../core/types';

interface ChannelModalProps extends DialogProps {
  type: ChannelType;
  initData?: Channel;
  onSubmit?: () => void;
  onCancel?: () => void;
}

interface Variables {
  name: string;
  accountId?: string;
  token: string;
}

export const ChannelModal: React.FC<ChannelModalProps> = ({
  type,
  initData,
  onSubmit,
  onCancel,
  ...props
}) => {
  const isCreate = initData === undefined;

  const { t } = useTranslation();

  const form = useForm<Variables>();

  const [createChannel] = useMutation(CREATE_CHANNEL);
  const [updateChannel] = useMutation(UPDATE_CHANNEL);

  const handleSubmit = (variables: Variables) => {
    if (isCreate) {
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
    } else {
      toast
        .promise(
          updateChannel({
            variables: {
              id: initData.id,
              name: variables.name,
            },
          }),
          t<any, any>('common:promise'),
        )
        .then(() => onSubmit?.())
        .catch(() => null);
    }
  };

  return (
    <Dialog {...props} maxWidth='sm' fullWidth>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle>
          {t<string>(`channels:modal.${isCreate ? 'create' : 'update'}.title`)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t<string>(`channels:modal.${isCreate ? 'create' : 'update'}.description`)}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label={t<string>(`channels:modal.fields.${type}.name`)}
            type='text'
            fullWidth
            variant='outlined'
            {...form.register('name')}
          />
          {type === ChannelType.Whatsapp && (
            <TextField
              margin='dense'
              label={t<string>(`channels:modal.fields.${type}.accountId`)}
              type='text'
              fullWidth
              variant='outlined'
              {...form.register('accountId')}
            />
          )}
          <TextField
            margin='dense'
            label={t<string>(`channels:modal.fields.${type}.token`)}
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
