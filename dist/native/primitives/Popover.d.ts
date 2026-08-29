import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface PopoverProps {
    /**
     * The control that opens the panel (`onClick`→`onPress`) — normally a kit
     * `<Button>`. Popover does not wrap it in a second pressable; it clones the
     * element and injects its own `onPress` (see the note below), so the trigger
     * stays the real button: its `disabled` state still blocks the panel, and any
     * `onPress` it already carries still runs. A trigger that cannot take an
     * `onPress` — a bare string, or a component that drops the prop — should be
     * wrapped by the caller in a `<Pressable>`, which can.
     */
    trigger: React.ReactNode;
    /** Panel content. */
    children: React.ReactNode;
    /** Horizontal placement of the panel within the overlay (default `start`). */
    align?: 'start' | 'center' | 'end';
    /** Optional controlled open state (mirrors the web open/onOpenChange pair). */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed popover — the native mirror of the web `Popover`. RN has no anchored
 * DOM portal, so the panel opens in a `Modal` over a translucent backdrop
 * instead of floating next to the trigger. `align` shifts the panel left /
 * center / right within the overlay but does not anchor to the trigger's
 * on-screen position (native simplification). No literal colors.
 */
export declare function Popover({ trigger, children, align, open, onOpenChange, style, }: PopoverProps): React.ReactElement;
//# sourceMappingURL=Popover.d.ts.map