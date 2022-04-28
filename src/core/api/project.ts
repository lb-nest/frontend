import { gql, TypedDocumentNode } from '@apollo/client';
import { Project } from '../types';

interface CreateProjectResult {
  createProject: Project;
}

interface CreateProjectVariables {
  name: string;
}

export const CREATE_PROJECT: TypedDocumentNode<CreateProjectResult, CreateProjectVariables> = gql`
  mutation CreateProject($name: String!) {
    createProject(name: $name) {
      id
      name
      slug
      billing {
        type
      }
      roles {
        role
      }
      createdAt
      updatedAt
    }
  }
`;

interface SignInProjectResult {
  signInProject: {
    token: string;
  };
}

interface SignInProjectVariables {
  id: number;
}

export const SIGNIN_PROJECT: TypedDocumentNode<SignInProjectResult, SignInProjectVariables> = gql`
  mutation SignInProject($id: Int!) {
    signInProject(id: $id) {
      token
    }
  }
`;
