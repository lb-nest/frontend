import { gql, TypedDocumentNode } from '@apollo/client';
import { Hsm, HsmButton } from '../types';

interface CreateHsmResult {
  createHsm: Hsm;
}

interface CreateHsmVariables {
  code: string;
  text: string;
  buttons?: HsmButton[];
}

export const CREATE_HSM: TypedDocumentNode<CreateHsmResult, CreateHsmVariables> = gql`
  mutation CreateHsm($code: String!, $text: String!, $buttons: [JSON!]) {
    createHsm(code: $code, text: $text, buttons: $buttons) {
      id
      code
      text
      buttons
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
      buttons
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

interface UpdateHsmVariables {
  id: number;
  text?: string;
  buttons?: HsmButton[];
}

export const UPDATE_HSM: TypedDocumentNode<UpdateHsmResult, UpdateHsmVariables> = gql`
  mutation UpdateHsm($id: Int!, $text: String, $buttons: [JSON!]) {
    updateHsm(id: $id, text: $text, buttons: $buttons) {
      id
      code
      text
      buttons
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
      buttons
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
