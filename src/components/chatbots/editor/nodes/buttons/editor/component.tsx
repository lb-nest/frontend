import React from 'react';
import { ButtonsData } from '../component';

interface ButtonsEditorProps extends ButtonsData {
  onChange: (propertyName: string, value: any) => void;
  onDelete: () => void;
}

export const ButtonsEditor: React.FC<ButtonsEditorProps> = () => {
  return null;
};
