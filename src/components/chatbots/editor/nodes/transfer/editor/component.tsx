import { useQuery } from '@apollo/client';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PROJECT_USERS } from '../../../../../../core/api';
import { TransferData } from '../component';

interface TransferEditorProps extends TransferData {
  onChange: <T = any>(name: keyof TransferData, data: T) => void;
}

export const TransferEditor: React.FC<TransferEditorProps> = ({ name, assignedTo, onChange }) => {
  const { t } = useTranslation();

  const users = useQuery(PROJECT_USERS);

  return (
    <>
      <TextField
        fullWidth
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.Transfer.fields.name')}
        defaultValue={name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />

      <FormControl fullWidth size='small' variant='standard'>
        <InputLabel id='assignedTo'>
          {t<string>('chatbots:editor.nodes.Transfer.fields.assignedTo')}
        </InputLabel>
        <Select
          labelId='assignedTo'
          size='small'
          value={users.loading ? 'noAssignedTo' : assignedTo ?? 'noAssignedTo'}
          onChange={(e) => {
            onChange('assignedTo', e.target.value);
          }}>
          <MenuItem value='noAssignedTo' disabled>
            {t<string>('chatbots:editor.nodes.Transfer.noAssignedTo')}
          </MenuItem>
          {users.data?.projectUsers.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
