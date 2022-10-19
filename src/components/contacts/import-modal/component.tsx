import { useMutation } from '@apollo/client';
import { DownloadOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Input,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { IMPORT_CONTACTS } from '../../../core/api';

interface ContactImportModalProps extends DialogProps {
  onSubmit?: () => void;
  onCancel?: () => void;
}

interface Variables {
  file: FileList;
}

export const ContactImportModal: React.FC<ContactImportModalProps> = ({
  onSubmit,
  onCancel,
  ...props
}) => {
  const form = useForm<Variables>();

  const { t } = useTranslation();

  const [importContacts] = useMutation(IMPORT_CONTACTS);

  const handleSubmit = (variables: Variables) => {
    toast
      .promise(
        importContacts({
          variables: {
            csvOrXls: variables.file[0],
          },
        }),
        t<any, any>('common:promise', { returnObjects: true }),
      )
      .then(() => onSubmit?.())
      .catch(() => null);
  };

  return (
    <Dialog {...props} maxWidth='sm' fullWidth>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle>{t<string>('contacts:modal.import.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t<string>('contacts:modal.import.description')}</DialogContentText>
          <Box
            sx={{
              mb: 2,
              '& > a': {
                mr: 1,
                '&:last-child': {
                  ml: 0,
                },
              },
            }}>
            <Button
              component='a'
              sx={{
                color: '#2c387e',
                fontWeight: 700,
              }}
              variant='outlined'
              startIcon={<DownloadOutlined />}
              href='/example.csv'
              download>
              {t<string>('contacts:modal.import.fields.examples.csv')}
            </Button>
            <Button
              component='a'
              sx={{
                color: '#357a38',
                fontWeight: 700,
              }}
              variant='outlined'
              startIcon={<DownloadOutlined />}
              href='/example.xls'
              download>
              {t<string>('contacts:modal.import.fields.examples.xls')}
            </Button>
          </Box>
          <Input
            type='file'
            inputProps={{
              accept:
                '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
            }}
            {...form.register('file', { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={onCancel}>
            {t<string>('contacts:modal.import.cancel')}
          </Button>
          <Button variant='outlined' type='submit'>
            {t<string>('contacts:modal.import.submit')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
