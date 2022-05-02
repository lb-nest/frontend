export enum AttachmentType {
  Audio = 'Audio',
  Document = 'Document',
  Image = 'Image',
  Video = 'Video',
}

export interface Attachment {
  type: AttachmentType;
  url: string;
  name: string;
}
