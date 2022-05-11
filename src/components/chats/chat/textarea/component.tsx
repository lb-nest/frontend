import { useMutation } from '@apollo/client';
import { SendOutlined } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CREATE_MESSAGE } from '../../../../core/api';
import { Attachment } from '../../../../core/types';

interface Variables {
  text?: string;
  attachments?: Attachment[];
  buttons?: any[];
}

export const TextArea: React.FC = () => {
  const { t } = useTranslation();

  const form = useForm<Variables>();

  const router = useRouter();

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const handleSubmit: SubmitHandler<Variables> = async (variables) => {
    try {
      await toast.promise(
        createMessage({
          variables: {
            chatId: Number(router.query.id),
            ...variables,
          },
        }),
        t<any, any>('common:promise'),
      );
    } catch (e) {}
  };

  return (
    <Box component='form' display='flex' padding='15px' onSubmit={form.handleSubmit(handleSubmit)}>
      <TextField
        variant='standard'
        fullWidth
        multiline
        placeholder={t('chats:chat.input')}
        maxRows={4}
        {...form.register('text')}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton type='submit'>
                <SendOutlined />
              </IconButton>
            </InputAdornment>
          ),
          disableUnderline: true,
        }}
      />
    </Box>
  );
};
