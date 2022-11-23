import React from 'react';
import { StartData } from '../component';

interface StartEditorProps extends StartData {
  onChange: (propertyName: string, value: any) => void;
  onDelete: () => void;
}

export const StartEditor: React.FC<StartEditorProps> = () => {
  return null;
};
