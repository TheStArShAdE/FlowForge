import { useState, useEffect } from 'react';
import useFlowStore from '@/store/useFlowStore';
import {
    Play,
    Brain,
    MessageSquare,
    Globe,
    GitBranch,
} from 'lucide-react';

const nodeConfig = {
    'manual-trigger': {
        icon: Play,
        color: '#22c55e',
        label: 'Manual Trigger',
        fields: [
            { key: 'inputText', label: 'Input Text', type: 'textarea', placeholder: 'Enter input text...' },
        ],
    },
    'llm': {
        icon: Brain,
        color: '#a855f7',
        label: 'LLM',
        fields: [
            { key: 'provider', label: 'Provider', type: 'select', options: ['openai', 'anthropic', 'google', 'groq'] },
            { key: 'model', label: 'Model', type: 'text', placeholder: 'gpt-4o' },
            { key: 'systemPrompt', label: 'System Prompt', type: 'textarea', placeholder: 'You are a helpful assistant.' },
            { key: 'temperature', label: 'Temperature', type: 'number', placeholder: '0.7' },
            { key: 'maxTokens', label: 'Max Tokens', type: 'number', placeholder: '1000' },
        ],
    },
    'text-output': {
        icon: MessageSquare,
        color: '#ef4444',
        label: 'Text Output',
        fields: [],
    },
    'http-request': {
        icon: Globe,
        color: '#3b82f6',
        label: 'HTTP Request',
        fields: [
            { key: 'method', label: 'Method', type: 'select', options: ['GET', 'POST', 'PUT', 'DELETE'] },
            { key: 'url', label: 'URL', type: 'text', placeholder: 'https://api.example.com' },
        ],
    },
    'condition': {
        icon: GitBranch,
        color: '#eab308',
        label: 'Condition',
        fields: [
            { key: 'operator', label: 'Operator', type: 'select', options: ['equals', 'contains', 'greater_than', 'less_than'] },
            { key: 'value', label: 'Compare Value', type: 'text', placeholder: 'value to compare' },
        ],
    },
};

const inputClass = 'w-full px-2.5 py-1.5 rounded-md border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-ring';

const InspectorPanel = () => {
    const { selectedNode, nodes, onNodesChange } = useFlowStore();
    const [data, setData] = useState({});

    useEffect(() => {
        if (selectedNode) {
            setData(selectedNode.data || {});
        }
    }, [selectedNode]);

    if (!selectedNode) {
        return (
            <div className="w-64 border-l border-border bg-background h-full flex items-center justify-center">
                <span className="text-xs text-muted-foreground text-center px-4">
                    Select a node to configure it
                </span>
            </div>
        );
    }

    const config = nodeConfig[selectedNode.type];
    if (!config) return null;

    const Icon = config.icon;

    const handleChange = (key, value) => {
        const updatedData = { ...data, [key]: value };
        setData(updatedData);
        onNodesChange([{
            type: 'reset',
            item: {
                ...selectedNode,
                data: updatedData,
            },
        }]);
    };

    return (
        <div className="w-64 border-l border-border bg-background h-full overflow-y-auto flex flex-col">
            <div className="p-3 border-b border-border flex items-center gap-2">
                <div
                    className="w-6 h-6 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}20` }}
                >
                    <Icon size={12} style={{ color: config.color }} />
                </div>
                <span className="text-xs font-semibold text-foreground">
                    {config.label}
                </span>
            </div>

            <div className="p-3 flex flex-col gap-4">
                {config.fields.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                        No configuration needed.
                    </p>
                )}
                {config.fields.map((field) => (
                    <div key={field.key} className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-muted-foreground">
                            {field.label}
                        </label>
                        {field.type === 'textarea' && (
                            <textarea
                                rows={3}
                                value={data[field.key] || ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                className={inputClass}
                            />
                        )}
                        {field.type === 'text' && (
                            <input
                                type="text"
                                value={data[field.key] || ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                className={inputClass}
                            />
                        )}
                        {field.type === 'number' && (
                            <input
                                type="number"
                                value={data[field.key] || ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                className={inputClass}
                            />
                        )}
                        {field.type === 'select' && (
                            <select
                                value={data[field.key] || ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Select...</option>
                                {field.options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InspectorPanel;