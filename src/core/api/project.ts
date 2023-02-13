import { gql, TypedDocumentNode } from '@apollo/client';
import { Project, User } from '../types';

interface CreateProjectResult {
  createProject: Project & {
    token: {
      token: string;
    };
  };
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
      users {
        accessLevel
      }
      token {
        token
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

interface ProjectResult {
  project: Project;
}

export const PROJECT: TypedDocumentNode<ProjectResult> = gql`
  query ProjectUsers {
    project {
      id
      name
      slug
      users {
        accessLevel
      }
      createdAt
      updatedAt
    }
  }
`;

interface ProjectUsersResult {
  projectUsers: User[];
}

export const PROJECT_USERS: TypedDocumentNode<ProjectUsersResult> = gql`
  query ProjectUsers {
    projectUsers {
      id
      name
      avatarUrl
      email
      confirmed
      createdAt
      updatedAt
    }
  }
`;
