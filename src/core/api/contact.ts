import { gql, TypedDocumentNode } from '@apollo/client';
import { AssigneeType, Contact, ContactStatus } from '../types';

interface CreateContactResult {
  createContact: Contact;
}

interface CreateContactVariables {
  name: string;
  avatarUrl?: string;
  notes?: string;
  tags?: number[];
  assignedTo?: {
    id: number;
    type: AssigneeType;
  };
  status?: ContactStatus;
  priority?: number;
}

export const CREATE_CONTACT: TypedDocumentNode<CreateContactResult, CreateContactVariables> = gql`
  mutation CreateContact(
    $name: String
    $avatarUrl: String
    $notes: String
    $tags: [Int!]
    $assignedTo: CreateAssignedToInput
    $status: ContactStatus
    $priority: Int
  ) {
    createContact(
      name: $name
      avatarUrl: $avatarUrl
      notes: $notes
      tags: $tags
      assignedTo: $assignedTo
      status: $status
      priority: $priority
    ) {
      id
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
      status
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
    }
  }
`;

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
      tags {
        tag {
          id
          name
          description
          color
        }
      }
      status
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
    }
  }
`;

interface UpdateContactResult {
  updateContact: Contact;
}

interface UpdateContactVariables extends Partial<CreateContactVariables> {
  id: number;
  resolved?: boolean;
}

export const UPDATE_CONTACT: TypedDocumentNode<UpdateContactResult, UpdateContactVariables> = gql`
  mutation UpdateContact(
    $id: Int!
    $name: String
    $avatarUrl: String
    $notes: String
    $tags: [Int!]
    $assignedTo: CreateAssignedToInput
    $status: ContactStatus
    $priority: Int
    $resolved: Boolean
  ) {
    updateContact(
      id: $id
      name: $name
      avatarUrl: $avatarUrl
      notes: $notes
      tags: $tags
      assignedTo: $assignedTo
      status: $status
      priority: $priority
      resolved: $resolved
    ) {
      id
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
      status
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
    }
  }
`;
