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
      notes
      tags {
        tag {
          id
          name
          description
          color
        }
      }
      resolved
      assignedTo {
        id
        name
      }
      status
    }
  }
`;

interface UpdateContactResult {
  updateContact: Contact;
}

interface UpdateContactVariables {
  id: number;
  username?: string;
  name?: string;
  notes?: string;
  tags?: number[];
  resolved?: boolean;
}

export const UPDATE_CONTACT: TypedDocumentNode<UpdateContactResult, UpdateContactVariables> = gql`
  mutation UpdateContact(
    $id: Int!
    $username: String
    $name: String
    $notes: String
    $tags: [Int!]
    $resolved: Boolean
  ) {
    updateContact(
      id: $id
      username: $username
      name: $name
      notes: $notes
      tags: $tags
      resolved: $resolved
    ) {
      id
      username
      name
      avatarUrl
      notes
      tags {
        tag {
          id
          name
          description
          color
        }
      }
      resolved
      assignedTo {
        id
        name
      }
      status
    }
  }
`;

interface AcceptContactResult {
  acceptContact: boolean;
}

interface AcceptContactVariables {
  id: number;
}

export const ACCEPT_CONTACT: TypedDocumentNode<AcceptContactResult, AcceptContactVariables> = gql`
  mutation AcceptContact($id: Int!) {
    acceptContact(id: $id)
  }
`;

interface CloseContactResult {
  closeContact: boolean;
}

interface CloseContactVariables {
  id: number;
}

export const CLOSE_CONTACT: TypedDocumentNode<CloseContactResult, CloseContactVariables> = gql`
  mutation CloseContact($id: Int!) {
    closeContact(id: $id)
  }
`;

interface TranserContactResult {
  transferContact: boolean;
}

interface TransferContactVariables {
  id: number;
  assignedTo: number;
}

export const TRANSFER_CONTACT: TypedDocumentNode<
  TranserContactResult,
  TransferContactVariables
> = gql`
  mutation TransferContact($id: Int!, $assignedTo: Int!) {
    transferContact(id: $id, assignedTo: $assignedTo)
  }
`;

interface ReturnContactResult {
  returnContact: boolean;
}

interface ReturnContactVariables {
  id: number;
}

export const RETURN_CONTACT: TypedDocumentNode<ReturnContactResult, ReturnContactVariables> = gql`
  mutation ReturnContact($id: Int!) {
    returnContact(id: $id)
  }
`;

interface ReopenContactResult {
  reopenContact: boolean;
}

interface ReonenContactVariables {
  id: number;
}

export const REOPEN_CONTACT: TypedDocumentNode<ReopenContactResult, ReonenContactVariables> = gql`
  mutation ReopenContact($id: Int!) {
    reopenContact(id: $id)
  }
`;
