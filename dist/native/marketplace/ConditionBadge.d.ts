import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { Condition } from './internal';
export type ConditionBadgeSize = 'sm' | 'md';
export type ConditionBadgeVariant = 'solid' | 'soft' | 'outline';
export interface ConditionBadgeProps {
    /** Item condition grade. */
    condition: Condition;
    /** Visual weight — mirrors the shared `Badge` variants. Default `soft`. */
    variant?: ConditionBadgeVariant;
    /** Size scale. Default `md`. */
    size?: ConditionBadgeSize;
    /** Override the visible label (defaults to a humanized condition). */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A themed condition chip for a marketplace listing — `new` / `like-new` /
 * `used` / `refurb`. A thin, presentational wrapper over the shared `Badge`
 * that maps each grade to a semantic tone and a readable label, so condition is
 * conveyed by text (never color alone). Token-only colors via `Badge`.
 */
export declare function ConditionBadge({ condition, variant, size, label, style, }: ConditionBadgeProps): React.ReactElement;
//# sourceMappingURL=ConditionBadge.d.ts.map