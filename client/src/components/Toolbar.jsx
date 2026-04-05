import { Button } from '@/components/ui/button';

const Toolbar = ({ flowName }) => {
    return (
        <div className="h-12 border-b border-border bg-background flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">
                    FlowForge
                </span>
                <span className="text-muted-foreground text-sm">/</span>
                <span className="text-sm text-foreground">
                    {flowName || 'Untitled Flow'}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                    Save
                </Button>
                <Button size="sm">
                    Run
                </Button>
            </div>
        </div>
    );
};

export default Toolbar;