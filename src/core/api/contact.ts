import { gql, TypedDocumentNode } from '@apollo/client';
import { Contact } from '../types';

interface ImportContactsVariables {
  csvOrXls: File;
}

interface ImportContactsResult {
  importContacts: boolean;
}

export const IMPORT_CONTACTS: TypedDocumentNode<
  ImportContactsResult,
  ImportContactsVariables
> = gql`
  mutation ImportContacts($csvOrXls: Upload!) {
    importContacts(csvOrXls: $csvOrXls)
  }
`;

interface ContactsResult {
  contacts: Contact[];
}

export const CONTACTS: TypedDocumentNode<ContactsResult> = gql`
  query Contacts {
    contacts {
      id
      name
      avatarUrl
      notes
      status
      telegramId
      webchatId
      whatsappId
      assignedTo {
        id
        name
      }
      priority
      resolved
      customFields {
        id
        name
        value
      }
      tags {
        tag {
          id
          name
          description
          color
        }
      }
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
    $name: String
    $notes: String
    $tags: [Int!]
    $resolved: Boolean
  ) {
    updateContact(id: $id, name: $name, notes: $notes, tags: $tags, resolved: $resolved) {
      id
      name
      avatarUrl
      notes
      status
      telegramId
      webchatId
      whatsappId
      assignedTo {
        id
        name
      }
      priority
      resolved
      customFields {
        id
        name
        value
      }
      tags {
        tag {
          id
          name
          description
          color
        }
      }
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
