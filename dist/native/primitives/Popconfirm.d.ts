import * as React from 'react';
export interface PopconfirmProps {
    /**
     * The control that opens the bubble — normally a kit `<Button>`. Popconfirm
     * does not wrap it in a second pressable; it clones the element and injects
     * its own `onPress` (see the note below), so the trigger stays the real
     * button: its `disabled` state still blocks the dialog, and any `onPress` it
     * already carries still runs. A trigger that cannot take an `onPress` — a
     * bare string, or a component that drops the prop — should be wrapped by the
     * caller in a `<Pressable>`, which can.
     */
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