import { gql, TypedDocumentNode } from '@apollo/client';
import { Contact } from '../types';

interface ContactsResult {
  contacts: Contact[];
}

export const CONTACTS: TypedDocumentNode<ContactsResult> = gql`
  query Contacts {
    contacts {
      id
      username
      name
      avatarUrl
      resolved
      assignedTo {
        id
        name
      }
      status
    }
  }
`;
