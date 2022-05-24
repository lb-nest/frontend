import { CloseOutlined, SearchOutlined } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface ChatListSearchProps {
  onChange?: (value: string) => void;
}

export const ChatListSearch: React.FC<ChatListSearchProps> = ({ onChange }) => {
  const [open, setOpen] = React.useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <Box position='absolute' right={0} zIndex={1}>
      {open ? (
        <TextField
          variant='outlined'
          size='small'
          sx={{
            bgcolor: '#ffffff',
          }}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <CloseOutlined
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => setOpen(false)}
                />
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <IconButton onClick={() => setOpen(true)}>
          <SearchOutlined />
        </IconButton>
      )}
    </Box>
  );
};
