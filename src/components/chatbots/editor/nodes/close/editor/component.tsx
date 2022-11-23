import React from 'react';
import { CloseData } from '../component';

interface CloseEditorProps extends CloseData {
  onChange: (propertyName: string, value: any) => void;
  onDelete: () => void;
}

export const CloseEditor: React.FC<CloseEditorProps> = () => {
  return null;
};
