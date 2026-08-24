import * as React from 'react';
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
    /** Badge size. */
    size?: 'sm' | 'md';
    /** Fires when the badge is tapped. */
    onPress?: () => void;
}
/**
 * A compact behavior chip for logging conduct: an icon + label, optionally with
 * a signed point value. Positive/negative is conveyed by the glyph and the
 * numeric sign in addition to the badge tone (never color alone). Delegates all
 * color to the shared `Badge` primitive — token-only.
 */
export declare function BehaviorBadge({ label, tone, points, icon, size, onPress, }: BehaviorBadgeProps): React.ReactElement;
//# sourceMappingURL=BehaviorBadge.d.ts.map