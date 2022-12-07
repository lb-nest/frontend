import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ValidationType, Variable } from '../../../types';
import { CollectInputData } from '../component';

interface CollectInputEditorProps extends CollectInputData {
  variables: Variable[];
  onChange: <T = any>(name: keyof CollectInputData, data: T) => void;
}

export const CollectInputEditor: React.FC<CollectInputEditorProps> = ({
  name,
  text,
  validation,
  variable,
  variables,
  regexp,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        fullWidth
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.CollectInput.fields.name')}
        defaultValue={name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />

      <TextField
        fullWidth
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.CollectInput.fields.text')}
        multiline
        minRows={3}
        maxRows={5}
        defaultValue={text}
        onChange={(e) => {
          onChange('text', e.target.value);
        }}
      />

      {/* TODO: attachments editor */}

      <FormControl fullWidth size='small' variant='standard'>
        <InputLabel id='validation'>
          {t<string>('chatbots:editor.nodes.CollectInput.fields.validation')}
        </InputLabel>
        <Select
          labelId='validation'
          value={validation}
          onChange={(e) => {
            onChange('validation', e.target.value);
          }}>
          <MenuItem value={ValidationType.Boolean}>
            {t<string>('chatbots:editor.nodes.CollectInput.validationType.Boolean')}
          </MenuItem>
          <MenuItem value={ValidationType.Email}>
            {t<string>('chatbots:editor.nodes.CollectInput.validationType.Email')}
          </MenuItem>
          <MenuItem value={ValidationType.Number}>
            {t<string>('chatbots:editor.nodes.CollectInput.validationType.Number')}
          </MenuItem>
          <MenuItem value={ValidationType.Phone}>
            {t<string>('chatbots:editor.nodes.CollectInput.validationType.Phone')}
          </MenuItem>
          <MenuItem value={ValidationType.RegExp}>
            {t<string>('chatbots:editor.nodes.CollectInput.validationType.RegExp')}
          </MenuItem>
          <MenuItem value={ValidationType.String}>
            {t<string>('chatbots:editor.nodes.CollectInput.validationType.String')}
          </MenuItem>
        </Select>
      </FormControl>
      {validation === ValidationType.RegExp && (
        <TextField
          fullWidth
          variant='standard'
          size='small'
          label={t<string>('chatbots:editor.nodes.CollectInput.fields.regexp')}
          defaultValue={regexp}
          onChange={(e) => {
            onChange('regexp', e.target.value);
          }}
        />
      )}

      <FormControl fullWidth size='small' variant='standard'>
        <InputLabel id='variable'>
          {t<string>('chatbots:editor.nodes.CollectInput.fields.variable')}
        </InputLabel>
        <Select
          labelId='variable'
          value={variable ?? 'noVariable'}
          onChange={(e) => {
            onChange('variable', e.target.value);
          }}>
          <MenuItem value='noVariable' disabled>
            {t<string>('chatbots:editor.nodes.CollectInput.noVariable')}
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
