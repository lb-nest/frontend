import { gql, TypedDocumentNode } from '@apollo/client';
import { Tag } from '../types';

interface CreateTagResult {
  createTag: Tag;
}

interface CreateTagVariables {
  name: string;
  description?: string;
  color: string;
  parentId?: number;
}

export const CREATE_TAG: TypedDocumentNode<CreateTagResult, CreateTagVariables> = gql`
  mutation CreateTag($name: String!, $description: String, $color: String!, $parentId: Int) {
    createTag(name: $name, description: $description, color: $color, parentId: $parentId) {
      id
      name
      description
      color
      parent {
        id
        name
        description
        color
        createdAt
        updatedAt
      }
      children {
        id
        name
        description
        color
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

interface TagsResult {
  tags: Tag[];
}

export const TAGS: TypedDocumentNode<TagsResult> = gql`
  query Tags {
    tags {
      id
      name
      description
      color
      parent {
        id
        name
        description
        color
        createdAt
        updatedAt
      }
      children {
        id
        name
        description
        color
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

interface UpdateTagResult {
  updateTag: Tag;
}

interface UpdateTagVariables {
  id: number;
  name: string;
  description?: string;
  color: string;
  parentId?: number;
}

export const UPDATE_TAG: TypedDocumentNode<UpdateTagResult, UpdateTagVariables> = gql`
  mutation UpdateTag(
    $id: Int!
    $name: String!
    $description: String
    $color: String!
    $parentId: Int
  ) {
    updateTag(id: $id, name: $name, description: $description, color: $color, parentId: $parentId) {
      id
      name
      description
      color
      parent {
        id
        name
        description
        color
        createdAt
        updatedAt
      }
      children {
        id
        name
        description
        color
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

interface RemoveTagResult {
  deleteTag: {
    id: number;
  };
}

interface RemoveTagVariables {
  id: number;
}

export const REMOVE_TAG: TypedDocumentNode<RemoveTagResult, RemoveTagVariables> = gql`
  mutation RemoveTag($id: Int!) {
    removeTag(id: $id) {
      id
    }
  }
`;
