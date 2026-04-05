import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';

const useFlowStore = create((set, get) => ({
    nodes: [],
    edges: [],
    selectedNode: null,

    onNodesChange: (changes) => {
        set({ nodes: applyNodeChanges(changes, get().nodes) });
    },

    onEdgesChange: (changes) => {
        set({ edges: applyEdgeChanges(changes, get().edges) });
    },

    onConnect: (connection) => {
        set({ edges: addEdge(connection, get().edges) });
    },

    setSelectedNode: (node) => {
        set({ selectedNode: node });
    },

    addNode: (node) => {
        set({ nodes: [...get().nodes, node] });
    },

    resetFlow: () => {
        set({ nodes: [], edges: [], selectedNode: null });
    },
}));

export default useFlowStore;