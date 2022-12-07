import { TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CloseData } from '../component';

interface CloseEditorProps extends CloseData {
  onChange: <T = any>(name: keyof CloseData, data: T) => void;
}

export const CloseEditor: React.FC<CloseEditorProps> = ({ name, onChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        fullWidth
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.Close.fields.name')}
        defaultValue={name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />
    </>
  );
};
