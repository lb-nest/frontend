import { gql, TypedDocumentNode } from '@apollo/client';

interface UploadResult {
  upload: string;
}

interface UploadVariables {
  file: File;
}

export const UPLOAD: TypedDocumentNode<UploadResult, UploadVariables> = gql`
  mutation Upload($file: Upload!) {
    upload(file: $file)
  }
`;
