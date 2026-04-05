import { useCallback, useRef } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    BackgroundVariant,
    ConnectionLineType,
} from '@xyflow/react';
import '@xyflow/react/dist/base.css';
import useFlowStore from '@/store/useFlowStore';
import Toolbar from '@/components/Toolbar';
import NodePanel from '@/components/NodePanel';
import InspectorPanel from '@/components/InspectorPanel';
import { nodeTypes } from '@/components/nodes';

let nodeId = 1;
const getId = () => `node_${nodeId++}`;

const Canvas = () => {
    const reactFlowWrapper = useRef(null);
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode,
        setSelectedNode,
    } = useFlowStore();

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (e) => {
            e.preventDefault();
            const nodeType = e.dataTransfer.getData('nodeType');
            if (!nodeType) return;

            const bounds = reactFlowWrapper.current.getBoundingClientRect();
            const position = {
                x: e.clientX - bounds.left - 75,
                y: e.clientY - bounds.top - 20,
            };

            const newNode = {
                id: getId(),
                type: nodeType,
                position,
                data: { label: nodeType },
            };

            addNode(newNode);
        },
        [addNode]
    );

    const onNodeClick = useCallback(
        (e, node) => {
            setSelectedNode(node);
        },
        [setSelectedNode]
    );

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, [setSelectedNode]);

    return (
        <div className="h-screen flex flex-col bg-background">
            <Toolbar />
            <div className="flex flex-1 overflow-hidden">
                <NodePanel />
                <div className="flex-1 bg-[oklch(0.19_0.03_250)] relative" ref={reactFlowWrapper}>
                    {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                            <div className="flex flex-col items-center gap-3 opacity-40">
                                <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-muted-foreground flex items-center justify-center">
                                    <span className="text-3xl">+</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Drag a node to get started
                                </p>
                            </div>
                        </div>
                    )}
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeClick={onNodeClick}
                        onPaneClick={onPaneClick}
                        fitView
                        defaultEdgeOptions={{
                            type: 'smoothstep',
                            style: {
                                stroke: 'oklch(0.55 0.08 250)',
                                strokeWidth: 2,
                            },
                            animated: true,
                        }}
                        connectionLineType={ConnectionLineType.SmoothStep}
                    >
                        <Background
                            variant={BackgroundVariant.Dots}
                            color="oklch(0.55 0.08 250)"
                            gap={24}
                            size={2}
                        />
                        <Controls />
                        <MiniMap
                            style={{
                                backgroundColor: 'oklch(0.18 0.025 250)',
                                border: '1px solid oklch(1 0 0 / 8%)',
                            }}
                            nodeColor="oklch(0.35 0.06 250)"
                            maskColor="oklch(0.16 0.02 250 / 60%)"
                        />
                    </ReactFlow>
                </div>
                <InspectorPanel />
            </div>
        </div>
    );
};

export default Canvas;