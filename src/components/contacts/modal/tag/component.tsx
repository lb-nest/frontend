import { useQuery } from '@apollo/client';
import { TagOutlined } from '@mui/icons-material';
import { Avatar, Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TAGS } from '../../../../core/api';

interface ContactTagProps {
  initData?: number[];
  onChange?: (tagIds: number[]) => void;
}

export const ContactTag: React.FC<ContactTagProps> = ({ initData = [], onChange }) => {
  const [tagIds, setTagIds] = React.useState(initData);

  const { t } = useTranslation();

  const tags = useQuery(TAGS);

  return (
    <FormControl fullWidth margin='dense'>
      <InputLabel>{t<string>('contacts:modal.fields.tags')}</InputLabel>
      <Select
        multiple
        label={t<string>('contacts:modal.fields.tags')}
        value={tagIds}
        onChange={(event) => {
          if (Array.isArray(event.target.value)) {
            setTagIds(event.target.value);
            onChange?.(event.target.value);
          }
        }}
        renderValue={(selected) => (
          <Box display='flex' flexWrap='wrap' gap={0.5}>
            {selected.map((tagId) => {
              const tag = tags.data?.tags.find((tag) => tag.id === tagId);
              return (
                <Chip
                  key={tagId}
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: tag?.color,
                      }}>
                      <TagOutlined
                        sx={{
                          width: 20,
                          height: 20,
                          color: '#ffffff',
                        }}
                      />
                    </Avatar>
                  }
                  label={tag?.name}
                />
              );
            })}
          </Box>
        )}>
        {tags.data?.tags.map((tag) => (
          <MenuItem key={tag.id} value={tag.id}>
            {tag.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
