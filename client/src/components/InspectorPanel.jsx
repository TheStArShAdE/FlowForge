import useFlowStore from '@/store/useFlowStore';

const InspectorPanel = () => {
    const selectedNode = useFlowStore((state) => state.selectedNode);

    if (!selectedNode) {
        return (
            <div className="w-64 border-l border-border bg-background h-full flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                    Select a node to inspect
                </span>
            </div>
        );
    }

    return (
        <div className="w-64 border-l border-border bg-background h-full overflow-y-auto">
            <div className="p-3 border-b border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Inspector
                </span>
            </div>
            <div className="p-3 flex flex-col gap-3">
                <div>
                    <span className="text-xs text-muted-foreground">Type</span>
                    <p className="text-sm text-foreground mt-1">
                        {selectedNode.type}
                    </p>
                </div>
                <div>
                    <span className="text-xs text-muted-foreground">ID</span>
                    <p className="text-sm text-foreground mt-1 font-mono">
                        {selectedNode.id}
                    </p>
                </div>
                <div>
                    <span className="text-xs text-muted-foreground">
                        Position
                    </span>
                    <p className="text-sm text-foreground mt-1">
                        x: {Math.round(selectedNode.position.x)}, y:{' '}
                        {Math.round(selectedNode.position.y)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InspectorPanel;