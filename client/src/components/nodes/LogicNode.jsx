import { GitBranch } from 'lucide-react';
import BaseNode from './BaseNode';

const LogicNode = ({ data, selected }) => {
    return (
        <BaseNode
            label="Condition"
            description={data?.operator || 'No condition set'}
            icon={GitBranch}
            accentColor="#eab308"
            handles={{ left: true, right: true }}
            selected={selected}
        />
    );
};

export default LogicNode;