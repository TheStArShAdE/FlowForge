import { Brain } from 'lucide-react';
import BaseNode from './BaseNode';

const LLMNode = ({ data, selected }) => {
    return (
        <BaseNode
            label="LLM"
            description={data?.model || 'No model selected'}
            icon={Brain}
            accentColor="#a855f7"
            handles={{ left: true, right: true }}
            selected={selected}
        />
    );
};

export default LLMNode;