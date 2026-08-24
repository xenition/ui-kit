import * as React from 'react';
export type BadgeTone = 'neutral' | 'muted' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeSize = 'sm' | 'md';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone;
    /** `solid` (default) is the historical fill; `soft` tints it; `outline` rings it. */
    variant?: BadgeVariant;
    /** Size scale. Defaults to the historical `md`. */
    size?: BadgeSize;
    /** Render a leading status dot (optionally alongside a label). */
    dot?: boolean;
    /** Numeric count; when set it becomes the label, clamped by `max`. */
    count?: number;
    /** Cap for `count` before rolling over to `${max}+` (default 99). */
    max?: number;
}
/**
 * Small status/label pill bound to the theme tokens — for statuses, tags,
 * counts. The default (`neutral`, `solid`, `md`) renders exactly as before;
 * the `accent` tone, `soft`/`outline` variants, `sm` size, a `dot` status mode,
 * and a numeric `count` (`max`-capped to `${max}+`) are additive opt-ins
 * mirroring the native `Badge`. No literal colors.
 */
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Badge.d.ts.map