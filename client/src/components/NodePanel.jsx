import { useEffect, useState } from 'react';
import useFlowStore from '@/store/useFlowStore';
import {
    Play,
    Brain,
    MessageSquare,
    Globe,
    GitBranch,
} from 'lucide-react';

const categoryConfig = {
    trigger: { label: 'Trigger', color: '#22c55e' },
    llm: { label: 'LLM', color: '#a855f7' },
    tool: { label: 'Tool', color: '#3b82f6' },
    logic: { label: 'Logic', color: '#eab308' },
    output: { label: 'Output', color: '#ef4444' },
    transform: { label: 'Transform', color: '#f97316' },
    memory: { label: 'Memory', color: '#ec4899' },
};

const nodeIcons = {
    'manual-trigger': Play,
    'llm': Brain,
    'text-output': MessageSquare,
    'http-request': Globe,
    'condition': GitBranch,
};

const NodePanel = () => {
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
        <div className="w-56 border-r border-border bg-background h-full overflow-y-auto flex flex-col">
            <div className="p-3 border-b border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Nodes
                </span>
            </div>
            <div className="p-2 flex flex-col gap-4">
                {Object.entries(grouped).map(([category, nodes]) => {
                    const config = categoryConfig[category] || {
                        label: category,
                        color: '#888',
                    };
                    return (
                        <div key={category}>
                            <div className="flex items-center gap-2 px-1 mb-1">
                                <div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: config.color }}
                                />
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {config.label}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                {nodes.map((node) => {
                                    const Icon = nodeIcons[node.type];
                                    return (
                                        <div
                                            key={node.type}
                                            draggable
                                            onDragStart={(e) =>
                                                handleDragStart(e, node.type)
                                            }
                                            className="flex items-center gap-2.5 px-2 py-2 rounded-md cursor-grab hover:bg-accent transition-colors group"
                                        >
                                            <div
                                                className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    backgroundColor: `${config.color}20`,
                                                }}
                                            >
                                                {Icon && (
                                                    <Icon
                                                        size={13}
                                                        style={{
                                                            color: config.color,
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs font-medium text-foreground truncate">
                                                    {node.label}
                                                </span>
                                                <span className="text-xs text-muted-foreground truncate">
                                                    {node.description.slice(0, 28)}...
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NodePanel;