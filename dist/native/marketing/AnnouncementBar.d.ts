import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type AnnouncementTone = 'primary' | 'accent' | 'neutral';
export interface AnnouncementBarProps {
    /** Banner message. */
    message: React.ReactNode;
    /**
     * Optional trailing call-to-action. On web this is a link/button node; the
     * native mirror renders `actionLabel` + `onPress` as a pressable link, and
     * also accepts an arbitrary `action` node for parity.
     */
    action?: React.ReactNode;
    /** Label for the built-in trailing link (paired with `onPress`). */
    actionLabel?: string;
    /** Called when the trailing link is pressed (web `href` → native `onPress`). */
    onPress?: () => void;
    /** Color treatment. */
    tone?: AnnouncementTone;
    /** Hide the dismiss control. */
    dismissible?: boolean;
    /** Accessible label for the close button. */
    closeLabel?: string;
    /** Called after the bar is dismissed. */
    onDismiss?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Compact dismissible top banner — the native mirror of the web
 * `AnnouncementBar`. A message with an optional trailing link (`href` →
 * `onPress`) and a dismiss control; dismissal is session state only. Token-only.
 */
export declare function AnnouncementBar({ message, action, actionLabel, onPress, tone, dismissible, closeLabel, onDismiss, style, }: AnnouncementBarProps): React.ReactElement | null;
//# sourceMappingURL=AnnouncementBar.d.ts.map