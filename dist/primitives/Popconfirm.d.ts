import * as React from 'react';
export interface PopconfirmProps {
    /** Clickable trigger (e.g. a Delete button). */
    trigger: React.ReactNode;
    message: React.ReactNode;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
}
/** Inline confirmation popover bound to the theme tokens — for destructive actions. */
export declare function Popconfirm({ trigger, message, onConfirm, confirmLabel, cancelLabel, }: PopconfirmProps): React.ReactElement;
//# sourceMappingURL=Popconfirm.d.ts.map