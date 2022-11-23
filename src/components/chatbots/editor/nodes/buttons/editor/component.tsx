import { TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonsData } from '../component';

interface ButtonsEditorProps extends ButtonsData {
  onChange: (name: string, data: any) => void;
  onDelete: () => void;
}

export const ButtonsEditor: React.FC<ButtonsEditorProps> = ({ name, text, buttons, onChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        fullWidth
        margin='dense'
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
        multiline
        minRows={3}
        maxRows={5}
        margin='dense'
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.Buttons.fields.text')}
        defaultValue={text}
        onChange={(e) => {
          onChange('text', e.target.value);
        }}
      />

      {/* TODO: buttons editor */}
    </>
  );
};
