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
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { UPDATE_CONTACT } from '../../../core/api';
import { Contact } from '../../../core/types';
import { ContactTag } from './tag';

interface ContactModalProps extends DialogProps {
  initData?: Contact;
  onSubmit?: () => void;
  onCancel?: () => void;
}

interface Variables {
  username?: string;
  name?: string;
  notes?: string;
  tags?: Array<{
    tagId: number;
  }>;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  initData,
  onSubmit,
  onCancel,
  ...props
}) => {
  const isCreate = initData === undefined;

  const { t } = useTranslation();

  const { control, ...form } = useForm<Variables>({
    defaultValues: {
      ...initData,
      tags: initData?.tags.map(({ tag }) => ({
        tagId: tag.id,
      })),
    },
  });

  const tagIds = useWatch({
    control,
    name: 'tags',
  });

  const [updateContact] = useMutation(UPDATE_CONTACT);

  const handleSubmit = React.useCallback(
    (variables: Variables) => {
      if (isCreate) {
        // не реализовано на бэкенде
      } else {
        toast
          .promise(
            updateContact({
              variables: {
                id: initData.id,
                ...variables,
                tags: variables.tags?.map(({ tagId }) => tagId),
              },
            }),
            t<any, any>('common:promise', { returnObjects: true }),
          )
          .then(() => onSubmit?.())
          .catch(() => null);
      }
    },
    [initData?.id, isCreate, updateContact],
  );

  return (
    <Dialog {...props} maxWidth='sm' fullWidth>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle>
          {t<string>(`contacts:modal.${isCreate ? 'create' : 'update'}.title`)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t<string>(`contacts:modal.${isCreate ? 'create' : 'update'}.description`)}
          </DialogContentText>
          {!isCreate && (
            <TextField
              margin='dense'
              label={t<string>('contacts:modal.fields.id')}
              type='number'
              disabled
              defaultValue={initData.id}
              fullWidth
              variant='outlined'
            />
          )}
          <TextField
            margin='dense'
            label={t<string>('contacts:modal.fields.username')}
            type='text'
            disabled={!isCreate}
            fullWidth
            variant='outlined'
            {...form.register('username')}
          />
          <TextField
            margin='dense'
            label={t<string>('contacts:modal.fields.name')}
            type='text'
            fullWidth
            variant='outlined'
            {...form.register('name')}
          />
          <TextField
            margin='dense'
            label={t<string>('contacts:modal.fields.notes')}
            type='text'
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            variant='outlined'
            {...form.register('notes')}
          />
          {!isCreate && (
            <ContactTag
              initData={tagIds.map(({ tagId }) => tagId)}
              onChange={(tagIds) => {
                form.setValue(
                  'tags',
                  tagIds.map((tagId) => ({
                    tagId,
                  })),
                );
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={onCancel}>
            {t<string>('contacts:modal.cancel')}
          </Button>
          <Button variant='outlined' type='submit'>
            {t<string>('contacts:modal.submit')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
