import { CreateOutlined, DeleteOutlined } from '@mui/icons-material';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Contact } from '../../../core/types';
import { getComparator, Order, stableSort } from './helpers';

interface HeadCell {
  id: keyof Contact;
}

const headCells: HeadCell[] = [
  {
    id: 'id',
  },
  {
    id: 'username',
  },
  {
    id: 'name',
  },
];

interface ContactsTableProps {
  items: Contact[];
}

export const ContactsTable: React.FC<ContactsTableProps> = ({ items }) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Contact>('id');

  const { t } = useTranslation();

  const handleRequestSort = (property: keyof Contact) => {
    setOrder(orderBy === property && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Table size='small'>
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => {
                  handleRequestSort(headCell.id);
                }}>
                {t(`contacts:list.${headCell.id}`)}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell align='right'>{t('contacts:list.controls')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(items, getComparator(order, orderBy)).map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell align='right'>
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
