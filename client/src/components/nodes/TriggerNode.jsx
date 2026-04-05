import { Play } from 'lucide-react';
import BaseNode from './BaseNode';

const TriggerNode = ({ data, selected }) => {
    return (
        <BaseNode
            label="Manual Trigger"
            description="Starts the flow manually"
            icon={Play}
            accentColor="#22c55e"
            handles={{ left: false, right: true }}
            selected={selected}
        />
    );
};

export default TriggerNode;