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
      width={64}
      height={64}
      ml='5px'
      borderRadius='5px'
      sx={{
        objectFit: 'cover',
        cursor: 'pointer',
      }}
      src={URL.createObjectURL(file)}
      onClick={onRemove}
    />
  ) : (
    <Box
      width={64}
      height={64}
      ml='5px'
      textAlign='center'
      borderRadius='5px'
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
