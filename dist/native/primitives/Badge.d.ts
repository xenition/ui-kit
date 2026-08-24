import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeSize = 'sm' | 'md';
export interface BadgeProps {
    tone?: BadgeTone;
    /** `solid` (default) fills the tone; `soft` tints it; `outline` rings it. */
    variant?: BadgeVariant;
    /** Size scale. Defaults to the historical `md`. */
    size?: BadgeSize;
    /** Render as a tiny status dot (optionally alongside a label). */
    dot?: boolean;
    /** Numeric count; when set it becomes the label, clamped by `max`. */
    count?: number;
    /** Cap for `count` before rolling over to `${max}+` (default 99). */
    max?: number;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Small status/label pill — the native mirror of the web `Badge`. Token-bound
 * per tone; the default (`neutral`, `solid`, `md`) renders exactly as before.
 * Additive: `accent` tone, `soft`/`outline` variants, `sm` size, a `dot` status
 * mode, and a numeric `count` (`max`-capped to `${max}+`). No literal colors.
 */
export declare function Badge({ tone, variant, size, dot, count, max, style, children, }: BadgeProps): React.ReactElement;
//# sourceMappingURL=Badge.d.ts.map