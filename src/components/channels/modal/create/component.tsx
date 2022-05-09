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
import { ChannelType } from '../../../../core/types';

interface CreateChannelModalProps extends DialogProps {
  type: ChannelType;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const CreateChannelModal: React.FC<CreateChannelModalProps> = ({
  type,
  onSubmit,
  onCancel,
  ...props
}) => {
  const { t } = useTranslation();

  const form = useForm();

  const handleSubmit = (variables: unknown) => {
    onSubmit?.();
  };

  return (
    <Dialog {...props} maxWidth='sm' fullWidth>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle>{t<string>(`channels:modal.${type}.title`)}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t<string>(`channels:modal.${type}.description`)}</DialogContentText>
          {type === ChannelType.Whatsapp && (
            <TextField
              autoFocus
              margin='dense'
              label={t(`channels:modal.${type}.accountId`)}
              type='text'
              fullWidth
              variant='outlined'
            />
          )}
          <TextField
            autoFocus
            margin='dense'
            label={t(`channels:modal.${type}.token`)}
            type='text'
            fullWidth
            variant='outlined'
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={onCancel}>
            {t<string>('channels:modal.cancel')}
          </Button>
          <Button variant='outlined'>{t<string>('channels:modal.submit')}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
