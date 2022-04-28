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
