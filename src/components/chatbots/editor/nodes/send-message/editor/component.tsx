import React from 'react';
import { SendMessageData } from '../component';

interface SendMessageEditorProps extends SendMessageData {
  onChange: (propertyName: string, value: any) => void;
  onDelete: () => void;
}

export const SendMessageEditor: React.FC<SendMessageEditorProps> = () => {
  return null;
};
