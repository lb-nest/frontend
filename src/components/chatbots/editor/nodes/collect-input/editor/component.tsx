import React from 'react';
import { CollectInputData } from '../component';

interface CollectInputEditorProps extends CollectInputData {
  onChange: (propertyName: string, value: any) => void;
  onDelete: () => void;
}

export const CollectInputEditor: React.FC<CollectInputEditorProps> = () => {
  return null;
};
