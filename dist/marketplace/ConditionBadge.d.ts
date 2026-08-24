import * as React from 'react';
import { type BadgeProps } from '../primitives';
import type { Condition } from './internal';
export type ConditionBadgeSize = 'sm' | 'md';
export type ConditionBadgeVariant = 'solid' | 'soft' | 'outline';
export interface ConditionBadgeProps extends Omit<BadgeProps, 'tone' | 'children'> {
    /** Item condition grade. */
    condition: Condition;
    /**
     * Visual weight — retained for parity with the native chip. The web `Badge`
     * ships a single soft-pill treatment, so this is currently informational.
     * Default `soft`.
     */
    variant?: ConditionBadgeVariant;
    /** Size scale — retained for native parity; the web `Badge` is a fixed size. Default `md`. */
    size?: ConditionBadgeSize;
    /** Override the visible label (defaults to a humanized condition). */
    label?: string;
}
/**
 * A themed condition chip for a marketplace listing — `new` / `like-new` /
 * `used` / `refurb`. A thin, presentational wrapper over the shared `Badge` that
 * maps each grade to a semantic tone and a readable label, so condition is
 * conveyed by text (never color alone). Token-only colors via `Badge`.
 */
export declare const ConditionBadge: React.ForwardRefExoticComponent<ConditionBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=ConditionBadge.d.ts.map