import { useMutation } from '@apollo/client';
import { Box, Avatar, Typography, Button, TextField } from '@mui/material';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { UPDATE_USER, UPLOAD } from '../../../core/api';
import { User } from '../../../core/types';

interface ProfileProps {
  user: User;
}

interface Variables {
  name?: string;
  avatar?: FileList;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { t } = useTranslation();

  const [upload] = useMutation(UPLOAD);
  const [updateUser] = useMutation(UPDATE_USER);

  const { control, ...form } = useForm<Variables>({
    defaultValues: {
      name: user.name,
    },
  });

  const avatar = useWatch({
    control,
    name: 'avatar',
  });

  const handleSubmit = async (variables: Variables): Promise<void> => {
    let avatarUrl: string;

    if (variables.avatar?.length === 1) {
      const res = await upload({
        variables: {
          file: variables.avatar[0],
        },
      });

      if (res.data) {
        avatarUrl = res.data.upload;
      }
    }

    toast
      .promise(
        updateUser({
          variables: {
            name: variables.name,
            avatarUrl,
          },
        }),
        t<any, any>('common:promise', { returnObjects: true }),
      )
      .catch(() => null);
  };

  return (
    <Box component='form' onSubmit={form.handleSubmit(handleSubmit)}>
      <Box display='flex'>
        <Box display='flex' alignItems='center' flexGrow={1}>
          <Avatar
            src={avatar?.length === 1 ? URL.createObjectURL(avatar[0]) : user.avatarUrl}
            sx={{
              width: 64,
              height: 64,
            }}
          />
          <Box ml={1} mr={1}>
            <Typography variant='body1'>
              {t<string>('settings:pages.profile.avatar.title')}
            </Typography>
            <Typography variant='body2'>
              {t<string>('settings:pages.profile.avatar.description')}
            </Typography>
          </Box>
        </Box>
        <Box height='100%'>
          <Button variant='outlined' size='small' component='label'>
            {t<string>('settings:pages.profile.avatar.upload')}
            <input type='file' accept='.png,.jpg,.jpeg,.gif' hidden {...form.register('avatar')} />
          </Button>
        </Box>
      </Box>
      <Box>
        <TextField
          margin='dense'
          fullWidth
          size='small'
          variant='standard'
          type='email'
          disabled
          defaultValue={user.email}
          label={t<string>('settings:pages.profile.email')}
        />
        <TextField
          margin='dense'
          fullWidth
          size='small'
          variant='standard'
          type='text'
          disabled
          defaultValue={t<string>(`settings:pages.profile.confirmed.${user.confirmed}`)}
          label={t<string>('settings:pages.profile.confirmed.title')}
        />
        <TextField
          margin='dense'
          fullWidth
          size='small'
          variant='standard'
          type='text'
          label={t<string>('settings:pages.profile.name')}
          {...form.register('name')}
        />
      </Box>
      <Box display='flex' justifyContent='flex-end'>
        <Button variant='outlined' color='success' type='submit'>
          {t<string>('settings:pages.profile.submit')}
        </Button>
      </Box>
    </Box>
  );
};
