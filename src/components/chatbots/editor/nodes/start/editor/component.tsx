import { TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StartData } from '../component';

interface StartEditorProps extends StartData {
  onChange: (name: string, data: any) => void;
  onDelete: () => void;
}

export const StartEditor: React.FC<StartEditorProps> = ({ name, onChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        fullWidth
        margin='dense'
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.Start.fields.name')}
        defaultValue={name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />
    </>
  );
};
