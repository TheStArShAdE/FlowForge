import { MessageSquare } from 'lucide-react';
import BaseNode from './BaseNode';

const OutputNode = ({ data, selected }) => {
    return (
        <BaseNode
            label="Text Output"
            description="Displays the final result"
            icon={MessageSquare}
            accentColor="#ef4444"
            handles={{ left: true, right: false }}
            selected={selected}
        />
    );
};

export default OutputNode;