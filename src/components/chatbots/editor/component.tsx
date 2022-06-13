import { useMutation } from '@apollo/client';
import React from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  NodeMouseHandler,
  OnConnect,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'react-flow-renderer';
import { UPDATE_CHATBOT } from '../../../core/api';
import { Chatbot } from '../../../core/types';
import { createNodeId, getNodeDataByType } from './helpers';
import { edgeTypes, NodeType, nodeTypes } from './types';

interface ChatbotEditorProps extends Chatbot {}

export const ChatbotEditor: React.FC<ChatbotEditorProps> = ({ id, flow }) => {
  const [updateChatbot] = useMutation(UPDATE_CHATBOT);

  const [variables, setVariables] = React.useState(flow.variables);

  const instance = useReactFlow();
  const [edges, setEdges, onEdgesChange] = useEdgesState(flow.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState(flow.nodes);

  const handleDeleteEdge = React.useCallback(
    (id: string) => {
      setEdges((edges) => edges.filter((edge) => edge.id !== id));
    },
    [setEdges],
  );

  const handleDeleteNode = React.useCallback(
    (id: string) => {
      return () => {
        setNodes((nodes) => nodes.filter((node) => node.id == id));
        setEdges((edges) => {
          return edges.filter((edge) => ![edge.source, edge.target].includes(id));
        });
      };
    },
    [setNodes, setEdges],
  );

  const handleChangeNode = React.useCallback((id: string) => {
    return (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              [event.target.id]: event.target.value,
            };
          }

          return node;
        }),
      );
    };
  }, []);

  const onConnect: OnConnect = React.useCallback((params) => {
    setEdges((edges) => addEdge(params, edges));
  }, []);

  const handlePaneClick: React.MouseEventHandler = React.useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleNodeClick: NodeMouseHandler = React.useCallback((event, node) => {
    event.preventDefault();
  }, []);

  const handleDrop: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/react-flow') as NodeType;

      if (type === undefined) {
        return;
      }

      const id = createNodeId();

      const data = getNodeDataByType(type);
      Object.assign(data, {
        onChange: handleChangeNode(id),
        onDelete: handleDeleteNode(id),
      });

      setNodes((nodes) =>
        nodes.concat({
          id,
          type,
          position: {
            x: event.clientX,
            y: event.clientY,
          },
          data,
        }),
      );
    },
    [setNodes, handleDeleteNode],
  );

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = React.useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDragEnd: React.DragEventHandler<HTMLDivElement> = React.useCallback((event) => {
    event.preventDefault();
  }, []);

  const save = React.useCallback(async () => {
    if (!instance) {
      return;
    }

    const flow = Object.assign({}, instance.toObject(), { variables });
    try {
      await updateChatbot({
        variables: {
          id,
          flow,
        },
      });
    } catch {}
  }, [instance, variables, updateChatbot, id]);

  React.useEffect(() => {}, [flow]);

  return (
    <ReactFlow
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
      edges={edges}
      nodes={nodes}
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
      onPaneClick={handlePaneClick}
      onConnect={onConnect}
      onNodeClick={handleNodeClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      deleteKeyCode={undefined}
      fitView
      attributionPosition='bottom-right'>
      <Controls />
      <Background color='#000000' variant={BackgroundVariant.Dots} gap={50} />
    </ReactFlow>
  );
};
