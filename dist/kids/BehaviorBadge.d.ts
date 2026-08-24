import * as React from 'react';
/** Whether the behavior is positive, negative, or neutral. */
export type BehaviorTone = 'positive' | 'negative' | 'neutral';
export interface BehaviorBadgeProps {
    /** Behavior label, e.g. "Shared toys" or "Interrupted". */
    label: string;
    /** Whether the behavior is positive, negative, or neutral. */
    tone?: BehaviorTone;
    /** Points awarded/deducted; rendered with a +/− sign. */
    points?: number;
    /** Explicit emoji/glyph (overrides the tone's default). */
    icon?: string;
    /** Badge size (kept for prop parity; the web {@link Badge} is single-size). */
    size?: 'sm' | 'md';
    /** Fires when the badge is activated. */
    onClick?: () => void;
}
/**
 * A compact behavior chip for logging conduct: an icon + label, optionally with
 * a signed point value. Positive/negative is conveyed by the glyph and the
 * numeric sign in addition to the {@link Badge} tone (never color alone). When
 * `onClick` is set the chip is a real `<button>`. Token-bound throughout — no
 * literal colors.
 */
export declare const BehaviorBadge: React.ForwardRefExoticComponent<BehaviorBadgeProps & React.RefAttributes<HTMLButtonElement | HTMLSpanElement>>;
//# sourceMappingURL=BehaviorBadge.d.ts.map