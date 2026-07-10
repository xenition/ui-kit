import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type AlertTone = 'info' | 'success' | 'warn' | 'danger';
export interface AlertProps {
    tone?: AlertTone;
    /** Bold heading above the body. */
    title?: React.ReactNode;
    /** Renders a dismiss (✕) button that calls this. */
    onClose?: () => void;
    /** Optional leading icon/glyph. */
    icon?: React.ReactNode;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Inline, optionally dismissible alert — the native mirror of the web `Alert`.
 * A token-bound surface with a colored left rule keyed to the tone
 * (`info`→primary, `success`→success, `warn`→accent, `danger`→danger). The
 * `danger` tone announces via the `alert` role; the rest use `status`. The
 * `warn` tone maps to the `accent` token because there is no dedicated warning
 * slot in the primitive token whitelist. No literal colors.
 */
export declare function Alert({ tone, title, onClose, icon, children, style, }: AlertProps): React.ReactElement;
//# sourceMappingURL=Alert.d.ts.map