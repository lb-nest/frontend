import { gql, TypedDocumentNode } from '@apollo/client';

interface CreateHsmResult {}

interface CreateHsmVariables {}

export const CREATE_HSM: TypedDocumentNode<CreateHsmResult, CreateHsmVariables> = gql`
  mutation {
    createHsm {
      id
    }
  }
`;
