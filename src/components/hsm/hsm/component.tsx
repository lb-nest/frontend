import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as types from '../../../core/types';

interface HsmProps extends types.Hsm {
  onUpdate?: () => void;
  onDelete?: () => void;
}

export const Hsm: React.FC<HsmProps> = ({ code, text, onUpdate, onDelete }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Typography component='span' fontWeight={700}>
          {code}
        </Typography>
        <TextField
          fullWidth
          margin='dense'
          label={t<string>('hsm:hsm.fields.text')}
          variant='standard'
          value={text}
          InputProps={{
            readOnly: true,
          }}
        />
      </CardContent>
      <CardActions>
        <Box>
          <Button size='small' onClick={onUpdate}>
            {t<string>('hsm:hsm.update')}
          </Button>
          <Button size='small' onClick={onDelete} color='error'>
            {t<string>('hsm:hsm.delete')}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
