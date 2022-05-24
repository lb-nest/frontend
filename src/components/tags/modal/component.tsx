import { useMutation, useQuery } from '@apollo/client';
import { TagOutlined } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Chip,
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
import { CREATE_TAG, TAGS, UPDATE_TAG } from '../../../core/api';
import { Tag } from '../../../core/types';
import { randomColor } from './helpers';

interface TagModalProps extends DialogProps {
  initData?: Tag;
  onSubmit?: () => void;
  onCancel?: () => void;
}

interface Variables {
  name: string;
  description?: string;
  color: string;
  parentId?: number;
}

export const TagModal: React.FC<TagModalProps> = ({ initData, onSubmit, onCancel, ...props }) => {
  const isCreate = initData === undefined;

  const { t } = useTranslation();

  const form = useForm<Variables>({
    defaultValues: initData,
  });

  const tags = useQuery(TAGS);

  const [createTag] = useMutation(CREATE_TAG);
  const [updateTag] = useMutation(UPDATE_TAG);

  const handleSubmit = React.useCallback(
    (variables: Variables) => {
      variables.parentId = Number(variables.parentId);
      if (Number.isNaN(variables.parentId)) {
        variables.parentId = null;
      }

      if (isCreate) {
        toast
          .promise(
            createTag({
              variables,
            }),
            t<any, any>('common:promise', { returnObjects: true }),
          )
          .then(() => onSubmit?.())
          .catch(() => null);
      } else {
        toast
          .promise(
            updateTag({
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
    },
    [initData?.id, isCreate, createTag, updateTag],
  );

  return (
    <Dialog {...props} maxWidth='sm' fullWidth>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle>{t<string>(`tags:modal.${isCreate ? 'create' : 'update'}.title`)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t<string>(`tags:modal.${isCreate ? 'create' : 'update'}.description`)}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label={t<string>('tags:modal.fields.name')}
            type='text'
            fullWidth
            variant='outlined'
            {...form.register('name')}
          />
          <TextField
            margin='dense'
            label={t<string>('tags:modal.fields.description')}
            type='text'
            fullWidth
            variant='outlined'
            {...form.register('description')}
          />
          <FormControl fullWidth margin='dense'>
            <InputLabel>{t<string>('tags:modal.fields.parentId')}</InputLabel>
            <Select
              label={t<string>('tags:modal.fields.parentId')}
              type='number'
              defaultValue={'-'}
              {...form.register('parentId')}>
              <MenuItem key={0} value='-'>
                {t<string>('tags:modal.fields.default.parentId')}
              </MenuItem>
              {tags.data?.tags
                .filter((tag) => tag.id !== initData?.id)
                .map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    <Chip
                      variant='outlined'
                      size='small'
                      avatar={
                        <Avatar
                          sx={{
                            bgcolor: tag.color,
                          }}>
                          <TagOutlined
                            sx={{
                              width: 20,
                              height: 20,
                              color: '#ffffff',
                            }}
                          />
                        </Avatar>
                      }
                      label={tag.name}
                    />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            margin='dense'
            label={t<string>('tags:modal.fields.color')}
            type='color'
            fullWidth
            variant='outlined'
            defaultValue={randomColor()}
            {...form.register('color')}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={onCancel}>
            {t<string>('tags:modal.cancel')}
          </Button>
          <Button variant='outlined' type='submit'>
            {t<string>('tags:modal.submit')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
