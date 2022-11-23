import { TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SendMessageData } from '../component';

interface SendMessageEditorProps extends SendMessageData {
  onChange: (name: string, data: any) => void;
  onDelete: () => void;
}

export const SendMessageEditor: React.FC<SendMessageEditorProps> = ({
  name,
  text,
  attachments,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <TextField
        fullWidth
        margin='dense'
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.SendMessage.fields.name')}
        defaultValue={name}
        onChange={(e) => {
          onChange('name', e.target.value);
        }}
      />

      <TextField
        fullWidth
        multiline
        minRows={3}
        maxRows={5}
        margin='dense'
        variant='standard'
        size='small'
        label={t<string>('chatbots:editor.nodes.SendMessage.fields.text')}
        defaultValue={text}
        onChange={(e) => {
          onChange('text', e.target.value);
        }}
      />

      {/* TODO: attachments editor */}
    </>
  );
};
