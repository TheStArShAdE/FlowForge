import { useCallback, useRef } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/base.css';
import useFlowStore from '@/store/useFlowStore';
import Toolbar from '@/components/Toolbar';
import NodePanel from '@/components/NodePanel';
import InspectorPanel from '@/components/InspectorPanel';

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
                type: 'default',
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
                <div className="flex-1" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeClick={onNodeClick}
                        onPaneClick={onPaneClick}
                        fitView
                    >
                        <Background variant={BackgroundVariant.Dots} />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </div>
                <InspectorPanel />
            </div>
        </div>
    );
};

export default Canvas;