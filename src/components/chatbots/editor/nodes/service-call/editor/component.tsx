import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceCallData } from '../component';

interface ServiceCallEditorProps extends ServiceCallData {
  onChange: (name: string, data: any) => void;
  onDelete: () => void;
}

export const ServiceCallEditor: React.FC<ServiceCallEditorProps> = ({
  name,
  url,
  headers,
  body,
  variable,
  variables,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        fullWidth
        margin='dense'
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
        margin='dense'
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
        multiline
        minRows={3}
        maxRows={5}
        margin='dense'
        variant='standard'
        size='small'
        InputProps={{
          sx: {
            fontFamily: 'monospace',
          },
        }}
        label={t<string>('chatbots:editor.nodes.ServiceCall.fields.body')}
        defaultValue={body}
        onChange={(e) => {
          onChange('body', e.target.value);
        }}
      />

      <FormControl fullWidth margin='dense' variant='standard'>
        <InputLabel>{t<string>('chatbots:editor.nodes.ServiceCall.fields.variable')}</InputLabel>
        <Select
          size='small'
          value={variable ?? 'noVariable'}
          onChange={(e) => {
            onChange('variable', e.target.value);
          }}>
          <MenuItem value='noVariable'>
            {t<string>('chatbots:editor.nodes.ServiceCall.noVariable')}
          </MenuItem>
          {variables.map((variable) => (
            <MenuItem key={variable.id} value={variable.id}>
              {variable.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
