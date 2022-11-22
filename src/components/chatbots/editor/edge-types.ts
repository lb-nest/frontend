import { EdgeProps } from 'react-flow-renderer';
import { Standard } from './edges';
import { EdgeType } from './types';

export const edgeTypes: Record<EdgeType, React.FC<EdgeProps>> = {
  [EdgeType.Standard]: Standard,
};
