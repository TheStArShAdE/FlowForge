import { Globe } from 'lucide-react';
import BaseNode from './BaseNode';

const ToolNode = ({ data, selected }) => {
    return (
        <BaseNode
            label="HTTP Request"
            description={data?.url || 'No URL configured'}
            icon={Globe}
            accentColor="#3b82f6"
            handles={{ left: true, right: true }}
            selected={selected}
        />
    );
};

export default ToolNode;