import * as React from 'react';
export interface PopoverProps {
    /** Clickable trigger. */
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'start' | 'center' | 'end';
    className?: string;
}
/** Click-triggered floating panel bound to the theme tokens. Closes on outside click / Escape. */
export declare function Popover({ trigger, children, align, className }: PopoverProps): React.ReactElement;
//# sourceMappingURL=Popover.d.ts.map