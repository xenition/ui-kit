import * as React from 'react';
export interface PopconfirmProps {
    /** Pressable trigger (e.g. a Delete button). */
    trigger: React.ReactNode;
    message: React.ReactNode;
    onConfirm: () => void;
    /** Fires when the user cancels (native extra; web only closes). */
    onCancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
}
/**
 * Themed confirmation bubble — the native mirror of the web `Popconfirm`. RN
 * has no anchored DOM portal, so the confirm bubble opens in a centered `Modal`
 * over a translucent backdrop rather than floating next to the trigger (native
 * simplification). Mirrors the web `onConfirm` / `confirmLabel` / `cancelLabel`
 * contract. No literal colors.
 */
export declare function Popconfirm({ trigger, message, onConfirm, onCancel, confirmLabel, cancelLabel, }: PopconfirmProps): React.ReactElement;
//# sourceMappingURL=Popconfirm.d.ts.map