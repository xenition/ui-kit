import * as React from 'react';
export interface PopconfirmProps {
    /**
     * The control that opens the bubble — normally a kit `<Button>`. Popconfirm
     * clones the element and injects its own `onClick` rather than wrapping it in
     * a click-catching `<span>` (see the note below), so the trigger stays the
     * real button: its `disabled` state still blocks the dialog, and any
     * `onClick` it already carries still runs. A trigger that cannot take an
     * `onClick` — a bare string, or a component that drops the prop — should be
     * wrapped by the caller in an element that can.
     */
    trigger: React.ReactNode;
    message: React.ReactNode;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
}
/** Inline confirmation popover bound to the theme tokens — for destructive actions. */
export declare function Popconfirm({ trigger, message, onConfirm, confirmLabel, cancelLabel, }: PopconfirmProps): React.ReactElement;
//# sourceMappingURL=Popconfirm.d.ts.map