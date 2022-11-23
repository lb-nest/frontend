import React from 'react';
import { BranchData } from '../component';

interface BranchEditorProps extends BranchData {
  onChange: (propertyName: string, value: any) => void;
  onDelete: () => void;
}

export const BranchEditor: React.FC<BranchEditorProps> = () => {
  return null;
};
