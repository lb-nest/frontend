import { gql, TypedDocumentNode } from '@apollo/client';

interface CreateTagResult {}

interface CreateTagVariables {}

export const CREATE_TAG: TypedDocumentNode<CreateTagResult, CreateTagVariables> = gql`
  mutation {
    createTag {
      id
    }
  }
`;
