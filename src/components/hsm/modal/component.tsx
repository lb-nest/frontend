import { useMutation } from '@apollo/client';
import { SmartButtonOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  InputBase,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CREATE_HSM, UPDATE_HSM } from '../../../core/api';
import { Hsm, HsmButtonType } from '../../../core/types';

interface HsmModalProps extends DialogProps {
  initData?: Hsm;
  onSubmit?: () => void;
  onCancel?: () => void;
}

interface Variables {
  code: string;
  text: string;
  buttons: any[];
}

export const HsmModal: React.FC<HsmModalProps> = ({ initData, onSubmit, onCancel, ...props }) => {
  const isCreate = initData === undefined;

  const [anchorButton, setAnchorButton] = React.useState<HTMLElement>();
  const [button, setButton] = React.useState<number>();

  const { t } = useTranslation();

  const { control, ...form } = useForm<Variables>({
    defaultValues: initData,
  });

  const text = useWatch({
    control,
    name: 'text',
  });

  const { append, remove } = useFieldArray({
    control,
    name: 'buttons',
  });

  const buttons = useWatch({
    control,
    name: 'buttons',
  });

  const [createHsm] = useMutation(CREATE_HSM);
  const [updateHsm] = useMutation(UPDATE_HSM);

  const handleSubmit = (variables: Variables) => {
    if (isCreate) {
      toast
        .promise(
          createHsm({
            variables: {
              ...variables,
              buttons: variables.buttons.slice(0, -1),
            },
          }),
          t<any, any>('common:promise', { returnObjects: true }),
        )
        .then(() => onSubmit?.())
        .catch(() => null);
    } else {
      toast
        .promise(
          updateHsm({
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
  };

  React.useEffect(() => {
    append({
      type: HsmButtonType.QuickReply,
      text: '',
    });
  }, []);

  const handleEditButton = (id: number): React.MouseEventHandler<HTMLDivElement> => {
    return (event) => {
      setAnchorButton(event.currentTarget);
      setButton(id);
    };
  };

  const handleStopEditButton: React.MouseEventHandler<HTMLDivElement> = () => {
    if (buttons.at(-1).text) {
      append({
        type: HsmButtonType.QuickReply,
        text: '',
      });
    }

    setAnchorButton(undefined);
    setButton(undefined);
  };

  const handleDeleteButton = (id: number) => {
    if (id < buttons.length - 1) {
      return () => remove(id);
    }
  };

  return (
    <Dialog {...props} maxWidth='md' fullWidth>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle>{t<string>(`hsm:modal.${isCreate ? 'create' : 'update'}.title`)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t<string>(`hsm:modal.${isCreate ? 'create' : 'update'}.description`)}
          </DialogContentText>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-end'
            padding={2}
            bgcolor='#f0f1f3'
            borderRadius={1}>
            <Box
              maxWidth='80%'
              bgcolor='#3d5afe'
              color='#ffffff'
              borderRadius={2}
              sx={{
                borderBottomRightRadius: 0,
              }}>
              <Typography
                padding={0.5}
                sx={{
                  wordBreak: 'break-all',
                }}>
                {Boolean(text) ? text : t<string>('hsm:modal.default.text')}
              </Typography>
            </Box>
            <Box display='flex' flexDirection='column' alignItems='flex-end' mt={0.5}>
              {buttons?.map((button, id) => (
                <Chip
                  key={id}
                  variant='outlined'
                  sx={{
                    mb: 0.5,
                    ':last-child': {
                      mb: 0,
                    },
                  }}
                  label={Boolean(button.text) ? button.text : t<string>('hsm:modal.default.button')}
                  onClick={handleEditButton(id)}
                  onDelete={handleDeleteButton(id)}
                />
              ))}
              <Popover
                open={Boolean(anchorButton)}
                anchorEl={anchorButton}
                onClose={handleStopEditButton}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}>
                <Box display='flex' alignItems='center' padding={1}>
                  <Tooltip title={t<string>(`hsm:modal.fields.button.type.QuickReply`)}>
                    <IconButton>
                      <SmartButtonOutlined />
                    </IconButton>
                  </Tooltip>
                  <Divider
                    orientation='vertical'
                    sx={{
                      width: 2,
                      height: 28,
                      ml: 1,
                      mr: 1,
                    }}
                  />
                  <InputBase
                    inputProps={{
                      maxLength: 16,
                    }}
                    size='small'
                    autoFocus
                    type='text'
                    placeholder={t<string>('hsm:modal.fields.button.tooltip')}
                    {...form.register(`buttons.${button}.text`)}
                  />
                </Box>
              </Popover>
            </Box>
          </Box>
          <TextField
            fullWidth
            variant='outlined'
            margin='dense'
            sx={{
              maxWidth: 400,
            }}
            label={t<string>('hsm:modal.fields.code')}
            disabled={!isCreate}
            {...form.register('code')}
          />
          <TextField
            fullWidth
            variant='outlined'
            margin='dense'
            multiline
            minRows={3}
            maxRows={5}
            label={t<string>('hsm:modal.fields.text')}
            {...form.register('text')}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={onCancel}>
            {t<string>('hsm:modal.cancel')}
          </Button>
          <Button variant='outlined' type='submit'>
            {t<string>('hsm:modal.submit')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
