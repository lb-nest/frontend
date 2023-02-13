import { AttachmentOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface AttachmentProps {
  file: File;
  onRemove?: () => void;
}

export const Attachment: React.FC<AttachmentProps> = React.memo(({ file, onRemove }) => {
  return file.type.startsWith('image/') ? (
    <Box
      component='img'
      width={56}
      height={56}
      ml={1}
      borderRadius={1}
      sx={{
        objectFit: 'cover',
        cursor: 'pointer',
      }}
      src={URL.createObjectURL(file)}
      onClick={onRemove}
    />
  ) : (
    <Box
      width={56}
      height={56}
      ml={1}
      textAlign='center'
      borderRadius={1}
      overflow='hidden'
      sx={{
        cursor: 'pointer',
      }}
      onClick={onRemove}>
      <AttachmentOutlined />
      <Typography
        component='div'
        variant='caption'
        sx={{
          wordBreak: 'break-all',
        }}>
        {file.name}
      </Typography>
    </Box>
  );
});
