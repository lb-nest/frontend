import { useMutation } from '@apollo/client';
import { AttachFileOutlined, SendOutlined } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CREATE_MESSAGE, UPLOAD } from '../../../../core/api';
import * as types from '../../../../core/types';
import { Attachment } from './attachment';

interface Variables {
  text?: string;
  attachments?: File[];
  buttons?: any[];
}

export const ChatInput: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const { control, ...form } = useForm<Variables>();
  const { append, remove } = useFieldArray({
    control,
    name: 'attachments',
  });

  const router = useRouter();

  const [upload] = useMutation(UPLOAD);
  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE);

  const handleSubmit: SubmitHandler<Variables> = async (variables) => {
    try {
      const attachments = await Promise.all(
        variables.attachments?.map<Promise<types.Attachment>>(async (file) => {
          const type = file.type.startsWith('image/')
            ? types.AttachmentType.Image
            : types.AttachmentType.Document;

          const result = await upload({
            variables: {
              file,
            },
          });

          return {
            type,
            url: result.data.upload,
            name: file.name,
          };
        }),
      );

      await toast.promise(
        createMessage({
          variables: {
            chatId: Number(router.query.id),
            ...variables,
            attachments,
          },
        }),
        t<any, any>('common:promise'),
      );

      form.reset({
        text: undefined,
        attachments: [],
        buttons: undefined,
      });
    } catch {}
  };

  const attachments = form.getValues('attachments');

  return (
    <Box>
      {attachments?.length > 0 && (
        <Box display='flex' padding='15px 15px 0 10px'>
          {attachments.map((file, i) => (
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
              const length = attachments?.length ?? 0;
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
