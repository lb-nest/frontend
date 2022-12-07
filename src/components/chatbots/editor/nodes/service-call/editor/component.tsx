import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceCallData } from '../component';

interface ServiceCallEditorProps extends ServiceCallData {
  onChange: <T = any>(name: keyof ServiceCallData, data: T) => void;
}

export const ServiceCallEditor: React.FC<ServiceCallEditorProps> = ({
  name,
  url,
  headers,
  data,
  variable,
  variables,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        fullWidth
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.ServiceCall.fields.name')}
        defaultValue={name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />

      <TextField
        fullWidth
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.ServiceCall.fields.url')}
        defaultValue={url}
        onChange={(e) => {
          onChange('url', e.target.value);
        }}
      />

      {/* TODO: headers editor */}

      <TextField
        fullWidth
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.ServiceCall.fields.data')}
        multiline
        minRows={3}
        maxRows={5}
        defaultValue={data}
        onChange={(e) => {
          onChange('data', e.target.value);
        }}
        InputProps={{
          sx: {
            fontFamily: 'monospace',
          },
        }}
      />

      <FormControl fullWidth size='small' variant='standard'>
        <InputLabel id='variable'>
          {t<string>('chatbots:editor.nodes.ServiceCall.fields.variable')}
        </InputLabel>
        <Select
          labelId='variable'
          value={variable ?? 'noVariable'}
          onChange={(e) => {
            onChange('variable', e.target.value);
          }}>
          <MenuItem value='noVariable' disabled>
            {t<string>('chatbots:editor.nodes.ServiceCall.noVariable')}
          </MenuItem>
          {variables.map((variable) => (
            <MenuItem key={variable.name} value={variable.name}>
              {variable.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
