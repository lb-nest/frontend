import { Button, Menu, MenuItem } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContactImportModal } from '../import-modal';
import { ContactModal } from '../modal';

interface CreateContactButtonProps {
  onCreate?: () => void;
}

export const CreateContactButton: React.FC<CreateContactButtonProps> = ({ onCreate }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>();

  const { t } = useTranslation();

  const { showModal } = useModal();

  const handleShowCreateModal = () => {
    const modal = showModal(ContactModal, {
      onSubmit: () => {
        onCreate?.();
        setAnchorEl(undefined);
        modal.hide();
      },
      onCancel: () => {
        setAnchorEl(undefined);
        modal.hide();
      },
    });
  };

  const handleShowImportModal = () => {
    const modal = showModal(ContactImportModal, {
      onSubmit: () => {
        onCreate?.();
        setAnchorEl(undefined);
        modal.hide();
      },
      onCancel: () => {
        setAnchorEl(undefined);
        modal.hide();
      },
    });
  };

  return (
    <>
      <Button variant='outlined' onClick={(e) => setAnchorEl(e.currentTarget)}>
        {t<string>('contacts:create')}
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(undefined)}>
        <MenuItem onClick={() => handleShowCreateModal()}>
          {t<string>('contacts:modal.create.title')}
        </MenuItem>
        <MenuItem onClick={() => handleShowImportModal()}>
          {t<string>('contacts:modal.import.title')}
        </MenuItem>
      </Menu>
    </>
  );
};
