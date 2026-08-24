import * as React from 'react';
import type { StatusMeta } from './internal';
export type StatusPillVariant = 'soft' | 'inline' | 'solid';
export type StatusPillSize = 'sm' | 'md';
export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** The glyph + label + tone triple to render. */
    meta: StatusMeta;
    /** `soft` (default) tints the tone; `inline` is a bare glyph+word; `solid` fills. */
    variant?: StatusPillVariant;
    size?: StatusPillSize;
}
/**
 * Reusable status indicator for the legal module (web) — renders a
 * {@link StatusMeta} as a **glyph + word** pill so state is never conveyed by
 * color alone. Color always resolves from a `--xen-*` token utility class, never
 * a literal. `inline` drops the pill chrome for use inside a dense row. Not
 * domain-specific; every legal block composes it.
 */
export declare const StatusPill: React.ForwardRefExoticComponent<StatusPillProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=StatusPill.d.ts.map