import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TriggerType } from '../../../types';
import { StartData } from '../component';

interface StartEditorProps extends StartData {
  onChange: <T = any>(name: keyof StartData, data: T) => void;
}

export const StartEditor: React.FC<StartEditorProps> = ({ name, trigger, onChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        fullWidth
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.Start.fields.name')}
        defaultValue={name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />

      <FormControl fullWidth size='small' variant='standard'>
        <InputLabel id='trigger'>
          {t<string>('chatbots:editor.nodes.Start.fields.trigger')}
        </InputLabel>
        <Select
          labelId='trigger'
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
