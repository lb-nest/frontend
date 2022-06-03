import { Button, Menu, MenuItem } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChannelType } from '../../../core/types';
import { ChannelModal } from '../modal';

interface CreateChannelButtonProps {
  onCreate?: () => void;
}

export const CreateChannelButton: React.FC<CreateChannelButtonProps> = ({ onCreate }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>();

  const { t } = useTranslation();

  const { showModal } = useModal();

  const handleShowModal = (type: ChannelType) => {
    const modal = showModal(ChannelModal, {
      type,
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
        {t<string>('channels:create')}
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(undefined)}>
        <MenuItem onClick={() => handleShowModal(ChannelType.Telegram)}>
          {t<string>('channels:modal.Telegram')}
        </MenuItem>
        <MenuItem onClick={() => handleShowModal(ChannelType.Webchat)}>
          {t<string>('channels:modal.Webchat')}
        </MenuItem>
        {/* <MenuItem onClick={() => handleShowModal(ChannelType.Whatsapp)}>
          {t<string>('channels:modal.Whatsapp')}
        </MenuItem> */}
      </Menu>
    </>
  );
};
