import React from 'react';
import { AssignTagData } from '../component';

interface AssignTagEditorProps extends AssignTagData {
  onChange: (propertyName: string, value: any) => void;
  onDelete: () => void;
}

export const AssignTagEditor: React.FC<AssignTagEditorProps> = () => {
  return null;
};
