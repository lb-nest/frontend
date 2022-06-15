import { useMutation } from '@apollo/client';
import { DataObjectOutlined, SaveOutlined } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import merge from 'lodash.merge';
import React from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  Node,
  NodeMouseHandler,
  OnConnect,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'react-flow-renderer';
import { useForm } from 'react-hook-form';
import { UPDATE_CHATBOT } from '../../../core/api';
import { Chatbot } from '../../../core/types';
import { createEdgeId, createNodeId, getNodeDataByType } from './helpers';
import { Sidebar } from './sidebar';
import { EdgeType, edgeTypes, NodeType, nodeTypes } from './types';

interface Variables {
  name: string;
}

interface ChatbotEditorProps extends Chatbot {}

export const ChatbotEditor: React.FC<ChatbotEditorProps> = ({ id, name, flow }) => {
  const [updateChatbot] = useMutation(UPDATE_CHATBOT);

  const form = useForm<Variables>({
    defaultValues: {
      name,
    },
  });

  const [selectedNode, setSelectedNode] = React.useState<Node<any>>();
  const [variables, setVariables] = React.useState(flow.variables);

  const ref = React.useRef<HTMLDivElement>();
  const instance = useReactFlow();
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const handleDeleteEdge = React.useCallback(
    (id: string) => {
      return () => {
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
      };
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

  const onConnect: OnConnect = React.useCallback(
    (params) => {
      setEdges((edges) => {
        const id = createEdgeId();
        return addEdge(
          {
            ...params,
            id,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            type: EdgeType.Standard,
            data: {
              onDelete: handleDeleteEdge(id),
            },
          },
          edges,
        );
      });
    },
    [setEdges, handleDeleteEdge],
  );

  const handlePaneClick: React.MouseEventHandler = React.useCallback((event) => {
    event.preventDefault();
    setSelectedNode(undefined);
  }, []);

  const handleNodeClick: NodeMouseHandler = React.useCallback((event, node) => {
    event.preventDefault();
    setSelectedNode(node);
  }, []);

  const handleDrop: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/react-flow') as NodeType;

      if (!(type in NodeType)) {
        return;
      }

      const id = createNodeId();

      const data = getNodeDataByType(type);
      Object.assign(data, {
        onChange: handleChangeNode(id),
        onDelete: handleDeleteNode(id),
      });

      const rect = ref.current.getBoundingClientRect();
      const position = instance.project({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });

      setNodes((nodes) =>
        nodes.concat({
          id,
          type,
          data,
          position,
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

  const handleSubmit = React.useCallback(
    async ({ name }: Variables) => {
      if (!instance) {
        return;
      }

      const flow = Object.assign({}, instance.toObject(), { variables });
      try {
        await updateChatbot({
          variables: {
            id,
            name,
            flow,
          },
        });
      } catch {}
    },
    [instance, variables, updateChatbot, id],
  );

  React.useEffect(() => {
    setEdges(
      flow.edges.map((edge) =>
        merge(edge, {
          data: {
            onDelete: handleDeleteEdge(edge.id),
          },
        }),
      ),
    );

    setNodes(
      flow.nodes.map((node) =>
        merge(node, {
          data: {
            onChange: handleChangeNode(node.id),
            onDelete: handleDeleteNode(node.id),
          },
        }),
      ),
    );
  }, [flow, setNodes, setEdges]);

  return (
    <Box
      ref={ref}
      component='form'
      width='100%'
      height='100%'
      position='relative'
      onSubmit={form.handleSubmit(handleSubmit)}>
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
        attributionPosition='bottom-right'
        style={{
          background: '#f0f1f3',
        }}>
        <Controls />
        <Background color='#000000' variant={BackgroundVariant.Dots} gap={50} />
      </ReactFlow>
      <Box
        position='absolute'
        right='50%'
        top={0}
        padding={1}
        zIndex={1001}
        sx={{
          transform: 'translateX(50%)',
        }}>
        <TextField
          variant='standard'
          inputProps={{
            style: {
              textAlign: 'center',
            },
          }}
          {...form.register('name')}
        />
      </Box>
      <Box position='absolute' right={0} top={0} padding={1} zIndex={1001}>
        <IconButton size='large' color='info'>
          <DataObjectOutlined />
        </IconButton>
        <IconButton type='submit' size='large' color='success'>
          <SaveOutlined />
        </IconButton>
      </Box>
      <Sidebar node={selectedNode} />
    </Box>
  );
};
