import * as React from 'react';
import type { GroomingCardProps } from './GroomingCard';
/** V4 layout choices for the "companion" design. */
export type GroomingCardLayout = 'card' | 'compact';
/** Drop-in for {@link GroomingCardProps} — same props, the V4 "companion" design. */
export interface GroomingCardV4Props extends GroomingCardProps {
    /** V4 layout: `card` (default) or `compact` (dense single row). */
    variant?: GroomingCardLayout;
}
/**
 * GroomingCard — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a grooming service: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the service glyph in a soft-primary
 * tinted well, a bold service name, a muted groomer line, a labelled status Badge,
 * and the last/next dates shown as soft-primary chips beside a rounded book CTA.
 * "Book" stays for anything not yet done. Same props/behavior as
 * {@link GroomingCardProps}; service + status both read via glyph + labelled chip
 * (never color alone). All colors from `--xen-*` token classes (no literals).
 */
export declare const GroomingCardV4: React.ForwardRefExoticComponent<GroomingCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GroomingCardV4.d.ts.map