import { useMutation } from '@apollo/client';
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
  Popover,
  TextareaAutosize,
  TextField,
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
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();
  const [index, setIndex] = React.useState<number>();

  const isCreate = initData === undefined;

  const { t } = useTranslation();

  const { control, ...form } = useForm<Variables>({
    defaultValues: initData,
  });

  const { append, remove } = useFieldArray({
    control,
    name: 'buttons',
  });

  const text = useWatch({
    control,
    name: 'text',
  });

  const buttons = useWatch({
    control,
    name: 'buttons',
  });

  const [createHsm] = useMutation(CREATE_HSM);
  const [updateHsm] = useMutation(UPDATE_HSM);

  const handleSubmit = (variables: Variables) => {
    variables.buttons.splice(-1, 1);

    if (isCreate) {
      toast
        .promise(
          createHsm({
            variables,
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

  const handleOpen = (index: number): React.MouseEventHandler<HTMLDivElement> => {
    return (event) => {
      setAnchorEl(event.currentTarget);
      setIndex(index);
    };
  };

  const handleClose = () => {
    setAnchorEl(undefined);
    setIndex(undefined);

    if (buttons.at(-1).text) {
      append({
        type: HsmButtonType.QuickReply,
        text: '',
      });
    }
  };

  const handleDelete = (index: number, length: number) => {
    return index < length - 1 ? () => remove(index) : undefined;
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
              {buttons?.map((button, index, array) => (
                <Chip
                  key={index}
                  variant='outlined'
                  sx={{
                    mb: 0.5,
                    ':last-child': {
                      mb: 0,
                    },
                  }}
                  label={Boolean(button.text) ? button.text : t<string>('hsm:modal.fields.button')}
                  onClick={handleOpen(index)}
                  onDelete={handleDelete(index, array.length)}
                />
              ))}
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}>
                <Box padding={1}>
                  <TextField size='small' autoFocus {...form.register(`buttons.${index}.text`)} />
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
