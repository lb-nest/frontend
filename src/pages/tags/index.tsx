import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, Container } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout';
import { Tag, TagModal } from '../../components/tags';
import { REMOVE_TAG, TAGS, UPDATE_TAG } from '../../core/api';
import * as types from '../../core/types';
import { projectGuard, useGuard } from '../../hooks/use-guard';
import { NextPageWithLayout } from '../_app';

const TagsPage: NextPageWithLayout = () => {
  const GuardWrapper = useGuard(projectGuard);

  const { t } = useTranslation();

  const tags = useQuery(TAGS);
  const [updateTag] = useMutation(UPDATE_TAG);
  const [removeTag] = useMutation(REMOVE_TAG);

  const { showModal } = useModal();

  const handleShowModal = (initData?: types.Tag) => {
    return () => {
      const modal = showModal(TagModal, {
        initData,
        onSubmit: () => {
          tags.refetch();
          modal.hide();
        },
        onCancel: () => {
          modal.hide();
        },
      });
    };
  };

  const handleDelete = (id: number) => {
    return () => {
      removeTag({
        variables: {
          id,
        },
      })
        .then(() => tags.refetch())
        .catch(() => null);
    };
  };

  return (
    <GuardWrapper>
      <Container
        maxWidth='lg'
        sx={{
          height: '100%',
          overflow: 'auto',
        }}>
        <Box display='flex' justifyContent='flex-end' mt={1} mb={1}>
          <Button variant='outlined' onClick={handleShowModal()}>
            {t<string>('tags:create')}
          </Button>
        </Box>
        <Box>
          {tags.data?.tags.map((tag) => (
            <Tag
              key={tag.id}
              {...tag}
              onUpdate={handleShowModal(tag)}
              onDelete={handleDelete(tag.id)}
            />
          ))}
        </Box>
      </Container>
    </GuardWrapper>
  );
};

TagsPage.getLayout = (page) => <Layout i18n='common:pages.tags'>{page}</Layout>;

export default TagsPage;
