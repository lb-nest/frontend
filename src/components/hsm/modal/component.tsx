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
import merge from 'deepmerge';
import React from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CREATE_HSM, UPDATE_HSM } from '../../../core/api';
import { ButtonType, Hsm } from '../../../core/types';

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

  const [anchor, setAnchor] = React.useState<HTMLElement>();
  const [index, setIndex] = React.useState<number>();

  const { t } = useTranslation();

  const { control, ...form } = useForm<Variables>({
    defaultValues: {
      ...initData,
      buttons: [].concat(
        initData?.buttons ?? [],
        initData?.buttons.length >= 5
          ? []
          : [
              {
                type: ButtonType.QuickReply,
                text: '',
                init: true,
              },
            ],
      ),
    },
  });

  const text = useWatch({
    control,
    name: 'text',
  });

  const { append, update, remove } = useFieldArray({
    control,
    name: 'buttons',
  });

  const buttons = useWatch({
    control,
    name: 'buttons',
  });

  React.useEffect(() => {
    if (typeof index === 'number') {
      update(
        index,
        merge(buttons[index], {
          init: buttons[index].text === '',
        }),
      );
    }
  }, [index, buttons]);

  const [createHsm] = useMutation(CREATE_HSM);
  const [updateHsm] = useMutation(UPDATE_HSM);

  const handleSubmit = ({ buttons, ...variables }: Variables) => {
    const promise = isCreate
      ? createHsm({
          variables: {
            ...variables,
            buttons: buttons.filter(({ init }) => !init).map(({ init, ...button }) => button),
          },
        })
      : updateHsm({
          variables: {
            id: initData.id,
            ...variables,
            buttons: buttons.filter(({ init }) => !init).map(({ init, ...button }) => button),
          },
        });

    toast
      .promise<any>(promise, t<any, any>('common:promise', { returnObjects: true }))
      .then(() => onSubmit?.())
      .catch(() => null);
  };

  const handleEditButton =
    (index: number) =>
    (event: React.MouseEvent<HTMLElement>): void => {
      setAnchor(event.currentTarget);
      setIndex(index);
    };

  const handleStopEditButton = (): void => {
    setAnchor(undefined);
    setIndex(undefined);

    if (Boolean(buttons.at(-1).text) && buttons.length < 5) {
      append({
        type: ButtonType.QuickReply,
        text: '',
        init: true,
      });
    }
  };

  const handleDeleteButton = (index: number): (() => void | undefined) => {
    if (!buttons[index].init) {
      return () => {
        remove(index);

        if (Boolean(buttons.at(-1).text) && buttons.length === 5) {
          append({
            type: ButtonType.QuickReply,
            text: '',
            init: true,
          });
        }
      };
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
              {buttons?.map((button, index) => (
                <Chip
                  key={index}
                  variant='outlined'
                  sx={{
                    mb: 0.5,
                    ':last-child': {
                      mb: 0,
                    },
                  }}
                  label={Boolean(button.text) ? button.text : t<string>('hsm:modal.default.button')}
                  onClick={handleEditButton(index)}
                  onDelete={handleDeleteButton(index)}
                />
              ))}
              <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
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
                    {...form.register(`buttons.${index}.text`)}
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
