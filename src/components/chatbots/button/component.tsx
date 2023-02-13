import { useMutation } from '@apollo/client';
import { Button, Link, Menu, MenuItem } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CREATE_CHATBOT } from '../../../core/api';
import { createNodeId, getNodeDataByType } from '../editor/helpers';
import { NodeType } from '../editor/types';

interface CreateChatbotButtonProps {
  onCreate?: () => void;
}

export const CreateChatbotButton: React.FC<CreateChatbotButtonProps> = ({ onCreate }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>();

  const router = useRouter();

  const { t } = useTranslation();

  const [createChatbot] = useMutation(CREATE_CHATBOT);

  const handleCreateFromScratch = async () => {
    try {
      const result = await toast.promise(
        createChatbot({
          variables: {
            name: t<string>('chatbots:defaultName'),
            flow: {
              edges: [],
              nodes: [
                {
                  id: createNodeId(),
                  type: NodeType.Start,
                  data: getNodeDataByType(NodeType.Start),
                  position: {
                    x: 0,
                    y: 0,
                  },
                },
              ],
              variables: [],
            },
          },
        }),
        t<any, any>('common:promise', { returnObjects: true }),
      );

      if (result.data) {
        router.push(`/chatbots/${result.data.createChatbot.id}/editor`);
        onCreate?.();
      }
    } catch {}
  };

  return (
    <>
      <Button variant='outlined' onClick={(e) => setAnchorEl(e.currentTarget)}>
        {t<string>('chatbots:create')}
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(undefined)}>
        <MenuItem onClick={handleCreateFromScratch}>
          {t<string>('chatbots:createFrom.scratch')}
        </MenuItem>
        <MenuItem>
          <Link
            href='/chatbots/templates'
            component={NextLink}
            sx={{
              color: 'inherit',
              textDecoration: 'inherit',
            }}>
            {t<string>('chatbots:createFrom.template')}
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};
