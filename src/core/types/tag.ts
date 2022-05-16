export interface Tag {
  id: number;
  name: string;
  description?: string;
  color: string;
  parent: Omit<Tag, 'parent' | 'children'>;
  children: Array<Omit<Tag, 'parent' | 'children'>>;
}
