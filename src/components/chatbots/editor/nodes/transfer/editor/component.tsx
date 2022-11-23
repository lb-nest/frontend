import React from 'react';
import { TransferData } from '../component';

interface TransferEditorProps extends TransferData {
  onChange: (propertyName: string, value: any) => void;
  onDelete: () => void;
}

export const TransferEditor: React.FC<TransferEditorProps> = () => {
  return null;
};
