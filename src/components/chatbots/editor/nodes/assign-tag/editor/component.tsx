import { useQuery } from '@apollo/client';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TAGS } from '../../../../../../core/api';
import { AssignTagData } from '../component';

interface AssignTagEditorProps extends AssignTagData {
  onChange: (name: string, data: any) => void;
  onDelete: () => void;
}

export const AssignTagEditor: React.FC<AssignTagEditorProps> = ({ name, tagId, onChange }) => {
  const { t } = useTranslation();

  const tags = useQuery(TAGS);

  return (
    <>
      <TextField
        fullWidth
        margin='dense'
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.AssignTag.fields.name')}
        defaultValue={name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />

      <FormControl fullWidth margin='dense' variant='standard'>
        <InputLabel>{t<string>('chatbots:editor.nodes.AssignTag.fields.tagId')}</InputLabel>
        <Select
          size='small'
          value={tags.loading ? 'noTag' : tagId ?? 'noTag'}
          onChange={(e) => {
            onChange('tagId', e.target.value);
          }}>
          <MenuItem value='noTag'>{t<string>('chatbots:editor.nodes.AssignTag.noTag')}</MenuItem>
          {tags.data?.tags.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
