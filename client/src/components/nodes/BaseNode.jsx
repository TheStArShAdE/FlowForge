import { Handle, Position } from '@xyflow/react';

const BaseNode = ({
    label,
    description,
    icon: Icon,
    accentColor,
    handles = { top: false, bottom: false, left: true, right: true },
    selected,
    children,
}) => {
    return (
        <div
            className={`
                min-w-[180px] max-w-[220px] rounded-lg border bg-card
                transition-all duration-150
                ${selected
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : 'border-border shadow-md'
                }
            `}
        >
            {/* Header */}
            <div
                className="flex items-center gap-2 px-3 py-2 rounded-t-lg"
                style={{ backgroundColor: `${accentColor}18` }}
            >
                <div
                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${accentColor}30` }}
                >
                    {Icon && (
                        <Icon
                            size={13}
                            style={{ color: accentColor }}
                        />
                    )}
                </div>
                <span className="text-xs font-semibold text-foreground truncate">
                    {label}
                </span>
            </div>

            {/* Description */}
            {description && (
                <div className="px-3 py-2 border-t border-border">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>
            )}

            {/* Children (config preview) */}
            {children && (
                <div className="px-3 py-2 border-t border-border">
                    {children}
                </div>
            )}

            {/* Handles */}
            {handles.left && (
                <Handle
                    type="target"
                    position={Position.Left}
                    className="!w-3 !h-3 !rounded-full !border-2 !border-border !bg-muted"
                />
            )}
            {handles.right && (
                <Handle
                    type="source"
                    position={Position.Right}
                    className="!w-3 !h-3 !rounded-full !border-2 !border-border !bg-muted"
                />
            )}
            {handles.top && (
                <Handle
                    type="target"
                    position={Position.Top}
                    className="!w-3 !h-3 !rounded-full !border-2 !border-border !bg-muted"
                />
            )}
            {handles.bottom && (
                <Handle
                    type="source"
                    position={Position.Bottom}
                    className="!w-3 !h-3 !rounded-full !border-2 !border-border !bg-muted"
                />
            )}
        </div>
    );
};

export default BaseNode;