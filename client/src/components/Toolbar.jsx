import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Play, Save, ChevronRight } from 'lucide-react';
import authService from '@/services/authService';

const Toolbar = ({ flowName, onFlowNameChange }) => {
    const navigate = useNavigate();
    const user = authService.getUser();
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(flowName || 'Untitled Flow');

    const handleNameBlur = () => {
        setEditing(false);
        if (onFlowNameChange) onFlowNameChange(name);
    };

    const handleNameKeyDown = (e) => {
        if (e.key === 'Enter') {
            setEditing(false);
            if (onFlowNameChange) onFlowNameChange(name);
        }
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="h-12 border-b border-border bg-background flex items-center justify-between px-4 flex-shrink-0">
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">
                    FlowForge
                </span>
                <ChevronRight size={14} className="text-muted-foreground" />
                {editing ? (
                    <input
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleNameBlur}
                        onKeyDown={handleNameKeyDown}
                        className="text-sm text-foreground bg-transparent border-b border-primary outline-none px-1 w-40"
                    />
                ) : (
                    <span
                        className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => setEditing(true)}
                    >
                        {name}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                    <Save size={13} />
                    Save
                </Button>
                <Button size="sm" className="gap-1.5">
                    <Play size={13} />
                    Run
                </Button>
                <div className="ml-2 flex items-center gap-2 pl-2 border-l border-border">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <LogOut size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toolbar;