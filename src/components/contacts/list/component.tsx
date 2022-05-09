import { CreateOutlined, DeleteOutlined } from '@mui/icons-material';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Contact } from '../../../core/types';

interface ContactListProps {
  items: Contact[];
}

export const ContactList: React.FC<ContactListProps> = ({ items }) => {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{t('contacts:list.id')}</TableCell>
          <TableCell>{t('contacts:list.username')}</TableCell>
          <TableCell>{t('contacts:list.name')}</TableCell>
          <TableCell>{t('contacts:list.controls')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <IconButton>
                <CreateOutlined />
              </IconButton>
              <IconButton>
                <DeleteOutlined />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
