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
import { useModal } from 'mui-modal-provider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Contact } from '../../../core/types';
import { ContactModal } from '../modal';
import { getComparator, Order, stableSort } from './helpers';

interface HeadCell {
  id: keyof Contact;
}

const headCells: HeadCell[] = [
  { id: 'id' },
  { id: 'name' },
  { id: 'telegramId' },
  { id: 'whatsappId' },
];

interface ContactsTableProps {
  items: Contact[];
}

export const ContactsTable: React.FC<ContactsTableProps> = ({ items }) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Contact>('id');

  const { t } = useTranslation();

  const { showModal } = useModal();

  const handleShowUpdateModal = (initData?: Contact) => {
    return () => {
      const modal = showModal(ContactModal, {
        initData,
        onSubmit: () => {
          modal.hide();
        },
        onCancel: () => {
          modal.hide();
        },
      });
    };
  };

  const handleShowDeleteModal = (initData?: Contact) => {
    return () => {};
  };

  const handleRequestSort = (property: keyof Contact) => {
    return () => {
      setOrder(orderBy === property && order === 'asc' ? 'desc' : 'asc');
      setOrderBy(property);
    };
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
                onClick={handleRequestSort(headCell.id)}>
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
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.telegramId}</TableCell>
            <TableCell>{item.whatsappId}</TableCell>
            <TableCell align='right'>
              <IconButton onClick={handleShowUpdateModal(item)}>
                <CreateOutlined />
              </IconButton>
              <IconButton onClick={handleShowDeleteModal(item)}>
                <DeleteOutlined />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
