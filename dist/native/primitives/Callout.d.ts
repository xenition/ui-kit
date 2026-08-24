import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type CalloutTone = 'info' | 'success' | 'warn' | 'danger' | 'neutral';
export interface CalloutProps {
    tone?: CalloutTone;
    /** Leading icon node (e.g. an `<Icon glyph="💡" />`). */
    icon?: React.ReactNode;
    /** Bold heading above the body. */
    title?: string;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Callout — a lightweight boxed emphasis block for asides and tips, lighter
 * than `Banner` (no solid fill). A `surface` card with a full 1px border and
 * title tinted to the tone token (`info`→primary, `success`→success,
 * `warn`→warn, `danger`→danger, `neutral`→border/muted), plus an optional
 * leading icon. Body copy stays `onSurface`. No literal colors.
 */
export declare function Callout({ tone, icon, title, children, style }: CalloutProps): React.ReactElement;
//# sourceMappingURL=Callout.d.ts.map