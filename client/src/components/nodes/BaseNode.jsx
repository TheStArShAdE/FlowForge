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
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: accentColor,
                        border: '2px solid oklch(0.16 0.02 250)',
                    }}
                />
            )}
            {handles.right && (
                <Handle
                    type="source"
                    position={Position.Right}
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: accentColor,
                        border: '2px solid oklch(0.16 0.02 250)',
                    }}
                />
            )}
            {handles.top && (
                <Handle
                    type="target"
                    position={Position.Top}
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: accentColor,
                        border: '2px solid oklch(0.16 0.02 250)',
                    }}
                />
            )}
            {handles.bottom && (
                <Handle
                    type="source"
                    position={Position.Bottom}
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: accentColor,
                        border: '2px solid oklch(0.16 0.02 250)',
                    }}
                />
            )}
        </div>
    );
};

export default BaseNode;