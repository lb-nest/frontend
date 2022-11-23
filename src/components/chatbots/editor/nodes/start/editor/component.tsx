import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TriggerType } from '../../../types';
import { StartData } from '../component';

interface StartEditorProps extends StartData {
  onChange: (name: string, data: any) => void;
  onDelete: () => void;
}

export const StartEditor: React.FC<StartEditorProps> = ({ name, trigger, onChange }) => {
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

      <FormControl fullWidth margin='dense' variant='standard'>
        <InputLabel>{t<string>('chatbots:editor.nodes.Start.fields.trigger')}</InputLabel>
        <Select
          size='small'
          value={trigger}
          onChange={(e) => {
            onChange('trigger', e.target.value);
          }}>
          <MenuItem value={TriggerType.NewChat}>
            {t<string>('chatbots:editor.nodes.Start.triggerType.NewChat')}
          </MenuItem>
          <MenuItem value={TriggerType.Webhook}>
            {t<string>('chatbots:editor.nodes.Start.triggerType.Webhook')}
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
