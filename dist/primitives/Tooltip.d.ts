import * as React from 'react';
export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';
export interface TooltipProps {
    /** Tip content shown on hover/focus. */
    label: React.ReactNode;
    side?: TooltipSide;
    children: React.ReactNode;
    className?: string;
}
/** Hover/focus tooltip bound to the theme tokens. Wrap the trigger as children. */
export declare function Tooltip({ label, side, children, className }: TooltipProps): React.ReactElement;
//# sourceMappingURL=Tooltip.d.ts.map