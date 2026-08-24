import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type AlertTone = 'info' | 'success' | 'warn' | 'danger';
export type AlertVariant = 'subtle' | 'solid' | 'outline';
export interface AlertProps {
    tone?: AlertTone;
    /** Surface treatment. `subtle` (default) is the bordered left-rule card. */
    variant?: AlertVariant;
    /** Bold heading above the body. */
    title?: React.ReactNode;
    /** Renders a dismiss (✕) button that calls this. */
    onClose?: () => void;
    /** Optional leading icon/glyph. */
    icon?: React.ReactNode;
    /** Optional trailing action (e.g. a button/link). */
    action?: React.ReactNode;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Inline, optionally dismissible alert — the native mirror of the web `Alert`.
 * The default (`subtle`) is a token-bound surface with a colored left rule
 * keyed to the tone (`info`→primary, `success`→success, `warn`→accent,
 * `danger`→danger). Additive `variant`s `solid` (filled) and `outline` layer
 * on top without changing the default. The `danger` tone announces via the
 * `alert` role; the rest use `summary`. No literal colors.
 */
export declare function Alert({ tone, variant, title, onClose, icon, action, children, style, }: AlertProps): React.ReactElement;
//# sourceMappingURL=Alert.d.ts.map