import { DeleteOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as types from '../../../../../../core/types';
import { ButtonsData } from '../component';

interface ButtonsEditorProps extends ButtonsData {
  onChange: <T = any>(name: keyof ButtonsData, data: T) => void;
}

export const ButtonsEditor: React.FC<ButtonsEditorProps> = ({ name, text, buttons, onChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        fullWidth
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.Buttons.fields.name')}
        defaultValue={name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />

      <TextField
        fullWidth
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.Buttons.fields.text')}
        multiline
        minRows={3}
        maxRows={5}
        defaultValue={text}
        onChange={(e) => {
          onChange('text', e.target.value);
        }}
      />

      {/* TODO: attachments editor */}

      <Box mt={4}>
        {buttons.map((button, i) => (
          <Paper
            key={i}
            sx={{
              p: 1,
              ':not(:first-of-type)': {
                mt: 1,
              },
            }}>
            <Box display='flex'>
              <TextField
                variant='standard'
                size='small'
                label={t<string>('chatbots:editor.nodes.Buttons.fields.button.text')}
                sx={{
                  flex: 1,
                }}
                defaultValue={button.text}
                onChange={(e) => {
                  onChange<types.Button[]>(
                    'buttons',
                    buttons.map((button, j) => {
                      if (i === j) {
                        button.text = e.target.value;
                      }

                      return button;
                    }),
                  );
                }}
              />
              <IconButton
                color='error'
                onClick={() => {
                  onChange<types.Button[]>(
                    'buttons',
                    buttons.filter((_, j) => i !== j),
                  );
                }}>
                <DeleteOutlined />
              </IconButton>
            </Box>
            <FormControl fullWidth variant='standard' size='small'>
              <InputLabel id='type'>
                {t<string>('chatbots:editor.nodes.Buttons.fields.button.type')}
              </InputLabel>
              <Select
                labelId='type'
                value={button.type}
                onChange={(e) => {
                  onChange<types.Button[]>(
                    'buttons',
                    buttons.map((button, j) => {
                      if (i === j) {
                        button.type = e.target.value as types.ButtonType;
                      }

                      return button;
                    }),
                  );
                }}>
                <MenuItem value={types.ButtonType.Phone}>
                  {t<string>('chatbots:editor.nodes.Buttons.buttonType.Phone')}
                </MenuItem>
                <MenuItem value={types.ButtonType.QuickReply}>
                  {t<string>('chatbots:editor.nodes.Buttons.buttonType.QuickReply')}
                </MenuItem>
                <MenuItem value={types.ButtonType.Url}>
                  {t<string>('chatbots:editor.nodes.Buttons.buttonType.Url')}
                </MenuItem>
              </Select>
            </FormControl>
            {button.type === types.ButtonType.Phone && (
              <TextField
                fullWidth
                variant='standard'
                size='small'
                label={t<string>('chatbots:editor.nodes.Buttons.fields.button.phone')}
                value={button.phone}
                onChange={(e) => {
                  onChange<types.Button[]>(
                    'buttons',
                    buttons.map((button, j) => {
                      if (i === j) {
                        button.phone = e.target.value;
                      }

                      return button;
                    }),
                  );
                }}
              />
            )}
            {button.type === types.ButtonType.Url && (
              <TextField
                fullWidth
                variant='standard'
                size='small'
                label={t<string>('chatbots:editor.nodes.Buttons.fields.button.url')}
                value={button.url}
                onChange={(e) => {
                  onChange<types.Button[]>(
                    'buttons',
                    buttons.map((button, j) => {
                      if (i === j) {
                        button.url = e.target.value;
                      }

                      return button;
                    }),
                  );
                }}
              />
            )}
          </Paper>
        ))}
      </Box>

      <Button
        fullWidth
        variant='outlined'
        sx={{
          mt: 2,
        }}
        onClick={() => {
          onChange<types.Button[]>(
            'buttons',
            buttons.concat({
              type: types.ButtonType.QuickReply,
              text: t<string>('chatbots:editor.nodes.Buttons.button', {
                i: buttons.length,
              }),
            }),
          );
        }}>
        {t<string>('chatbots:editor.nodes.Buttons.createButton')}
      </Button>
    </>
  );
};
