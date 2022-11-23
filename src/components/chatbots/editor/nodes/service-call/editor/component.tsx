import React from 'react';
import { ServiceCallData } from '../component';

interface ServiceCallEditorProps extends ServiceCallData {
  onChange: (propertyName: string, value: any) => void;
  onDelete: () => void;
}

export const ServiceCallEditor: React.FC<ServiceCallEditorProps> = () => {
  return null;
};
