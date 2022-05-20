import { useMutation } from '@apollo/client';
import { AttachFileOutlined, SendOutlined } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CREATE_MESSAGE } from '../../../../core/api';
import * as types from '../../../../core/types';
import { useUpload } from '../../../../hooks/use-upload';
import { Attachment } from './attachment';

interface Variables {
  text?: string;
  buttons?: types.HsmButton[];
  files?: File[];
}

export const ChatInput: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const { control, ...form } = useForm<Variables>({
    defaultValues: {
      text: undefined,
      buttons: undefined,
      files: undefined,
    },
  });

  const { append, remove } = useFieldArray({
    control,
    name: 'files',
  });

  const router = useRouter();

  const upload = useUpload();
  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE);

  const handleSubmit: SubmitHandler<Variables> = async ({ files, ...variables }) => {
    try {
      const attachments = await toast.promise(
        Promise.all(
          files?.map(async (file) => {
            const type =
              file.type.startsWith('image/') && file.size <= 5242880
                ? types.AttachmentType.Image
                : types.AttachmentType.Document;

            const url = await upload(file);
            return {
              type,
              url,
              name: file.name,
            };
          }),
        ),
        t<any, any>('common:promise', { returnObjects: true }),
      );

      await toast.promise(
        createMessage({
          variables: {
            chatId: Number(router.query.id),
            ...variables,
            attachments,
          },
        }),
        t<any, any>('common:promise', { returnObjects: true }),
      );

      form.reset();
    } catch {}
  };

  const files = useWatch({
    control,
    name: 'files',
  });

  return (
    <Box>
      {files?.length > 0 && (
        <Box display='flex' padding='15px 15px 0 10px'>
          {files.map((file, i) => (
            <Attachment key={i} file={file} onRemove={() => remove(i)} />
          ))}
        </Box>
      )}
      <Box
        component='form'
        display='flex'
        alignItems='center'
        padding='15px'
        onSubmit={form.handleSubmit(handleSubmit)}>
        <IconButton component='label' disabled={loading}>
          <input
            hidden
            type='file'
            multiple
            onChange={(event) => {
              const length = files?.length ?? 0;
              append(Array.from(event.target.files).slice(0, 10 - length));
            }}
          />
          <AttachFileOutlined />
        </IconButton>
        <TextField
          variant='standard'
          fullWidth
          multiline
          placeholder={t('chats:chat.input')}
          maxRows={4}
          disabled={loading}
          {...form.register('text')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton type='submit' disabled={loading}>
                  <SendOutlined />
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
        />
      </Box>
    </Box>
  );
});
