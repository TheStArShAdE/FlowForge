import { useEffect, useState } from 'react';
import useFlowStore from '@/store/useFlowStore';

const categoryColors = {
    trigger: 'bg-green-500',
    llm: 'bg-purple-500',
    tool: 'bg-blue-500',
    logic: 'bg-yellow-500',
    output: 'bg-red-500',
    transform: 'bg-orange-500',
    memory: 'bg-pink-500',
};

const NodePanel = () => {
    const [nodes, setNodes] = useState([]);
    const [grouped, setGrouped] = useState({});
    const addNode = useFlowStore((state) => state.addNode);

    useEffect(() => {
        const fetchNodes = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const res = await fetch('http://localhost:5000/api/nodes', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (data.success) {
                    setNodes(data.data.nodes);
                    const groups = data.data.nodes.reduce((acc, node) => {
                        if (!acc[node.category]) acc[node.category] = [];
                        acc[node.category].push(node);
                        return acc;
                    }, {});
                    setGrouped(groups);
                }
            } catch (error) {
                console.error('Failed to fetch nodes:', error);
            }
        };

        fetchNodes();
    }, []);

    const handleDragStart = (e, nodeType) => {
        e.dataTransfer.setData('nodeType', nodeType);
    };

    return (
        <div className="w-56 border-r border-border bg-background h-full overflow-y-auto">
            <div className="p-3 border-b border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Nodes
                </span>
            </div>
            <div className="p-2">
                {Object.entries(grouped).map(([category, nodes]) => (
                    <div key={category} className="mb-4">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                            {category}
                        </span>
                        <div className="mt-1 flex flex-col gap-1">
                            {nodes.map((node) => (
                                <div
                                    key={node.type}
                                    draggable
                                    onDragStart={(e) =>
                                        handleDragStart(e, node.type)
                                    }
                                    className="flex items-center gap-2 px-2 py-2 rounded-md cursor-grab hover:bg-accent transition-colors"
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full ${categoryColors[category] || 'bg-gray-500'}`}
                                    />
                                    <span className="text-sm text-foreground">
                                        {node.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NodePanel;