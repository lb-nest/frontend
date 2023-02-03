import { gql, TypedDocumentNode } from '@apollo/client';
import { Project, User } from '../types';

interface UserResult {
  user: User;
}

export const USER: TypedDocumentNode<UserResult> = gql`
  query User {
    user {
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

interface UserProjectsResult {
  userProjects: Project[];
}

export const USER_PROJECTS: TypedDocumentNode<UserProjectsResult> = gql`
  query UserProjects {
    userProjects {
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

interface UpdateUserResult {
  updateUser: User;
}

interface UpdateUserVariables {
  name?: string;
  avatarUrl?: string;
}

export const UPDATE_USER: TypedDocumentNode<UpdateUserResult, UpdateUserVariables> = gql`
  mutation UpdateUser($name: String, $avatarUrl: String) {
    updateUser(name: $name, avatarUrl: $avatarUrl) {
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
