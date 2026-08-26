import * as React from 'react';
export interface PopoverProps {
    /**
     * The control that opens the panel — normally a kit `<Button>`. Popover
     * clones the element and injects its own `onClick` rather than wrapping it in
     * a click-catching `<span>` (see the note below), so the trigger stays the
     * real button: its `disabled` state still blocks the panel, and any `onClick`
     * it already carries still runs. A trigger that cannot take an `onClick` — a
     * bare string, or a component that drops the prop — should be wrapped by the
     * caller in an element that can.
     */
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'start' | 'center' | 'end';
    className?: string;
}
/** Click-triggered floating panel bound to the theme tokens. Closes on outside click / Escape. */
export declare function Popover({ trigger, children, align, className }: PopoverProps): React.ReactElement;
//# sourceMappingURL=Popover.d.ts.map