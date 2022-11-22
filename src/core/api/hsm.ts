import { gql, TypedDocumentNode } from '@apollo/client';
import { Attachment, Hsm, Button } from '../types';

interface CreateHsmResult {
  createHsm: Hsm;
}

interface CreateHsmVariables {
  code: string;
  text: string;
  attachments?: Attachment[];
  buttons?: Button[];
}

export const CREATE_HSM: TypedDocumentNode<CreateHsmResult, CreateHsmVariables> = gql`
  mutation CreateHsm(
    $code: String!
    $text: String!
    $attachments: [CreateAttachmentInput!]
    $buttons: [CreateButtonInput!]
  ) {
    createHsm(code: $code, text: $text, attachments: $attachments, buttons: $buttons) {
      id
      code
      text
      attachments {
        type
        url
        name
      }
      buttons {
        type
        text
        url
        phone
      }
      approval {
        channel {
          id
          name
          status
          type
        }
        status
      }
    }
  }
`;

interface HsmResult {
  hsm: Hsm[];
}

export const HSM: TypedDocumentNode<HsmResult> = gql`
  query Hsm {
    hsm {
      id
      code
      text
      attachments {
        type
        url
        name
      }
      buttons {
        type
        text
        url
        phone
      }
      approval {
        channel {
          id
          name
          status
          type
        }
        status
      }
    }
  }
`;

interface UpdateHsmResult {
  updateHsm: Hsm;
}

interface UpdateHsmVariables extends Partial<Omit<CreateHsmVariables, 'code'>> {
  id: number;
}

export const UPDATE_HSM: TypedDocumentNode<UpdateHsmResult, UpdateHsmVariables> = gql`
  mutation UpdateHsm(
    $id: Int!
    $text: String
    $attachments: [CreateAttachmentInput!]
    $buttons: [CreateButtonInput!]
  ) {
    updateHsm(id: $id, text: $text, attachments: $attachments, buttons: $buttons) {
      id
      code
      text
      attachments {
        type
        url
        name
      }
      buttons {
        type
        text
        url
        phone
      }
      approval {
        channel {
          id
          name
          status
          type
        }
        status
      }
    }
  }
`;

interface RemoveHsmResult {
  removeHsm: Hsm;
}

interface RemoveHsmVariables {
  id: number;
}

export const REMOVE_HSM: TypedDocumentNode<RemoveHsmResult, RemoveHsmVariables> = gql`
  mutation RemoveHsm($id: Int!) {
    removeHsm(id: $id) {
      id
      code
      text
      attachments {
        type
        url
        name
      }
      buttons {
        type
        text
        url
        phone
      }
      approval {
        channel {
          id
          name
          status
          type
        }
        status
      }
    }
  }
`;
