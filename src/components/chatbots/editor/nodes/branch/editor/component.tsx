import { TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Variable } from '../../../types';
import { BranchData } from '../component';

interface BranchEditorProps extends BranchData {
  variables: Variable[];
  onChange: (name: string, data: any) => void;
  onDelete: () => void;
}

export const BranchEditor: React.FC<BranchEditorProps> = ({ name, branches, onChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        fullWidth
        margin='dense'
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.Branch.fields.name')}
        defaultValue={name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />

      {/* TODO: branches editor */}
    </>
  );
};
