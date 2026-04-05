import TriggerNode from './TriggerNode';
import LLMNode from './LLMNode';
import OutputNode from './OutputNode';
import ToolNode from './ToolNode';
import LogicNode from './LogicNode';

export const nodeTypes = {
    'manual-trigger': TriggerNode,
    'llm': LLMNode,
    'text-output': OutputNode,
    'http-request': ToolNode,
    'condition': LogicNode,
};