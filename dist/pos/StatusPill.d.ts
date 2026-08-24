import * as React from 'react';
import { type StatusMeta } from './internal';
export type StatusPillVariant = 'soft' | 'inline' | 'solid';
export type StatusPillSize = 'sm' | 'md';
export interface StatusPillProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** The glyph + label + tone triple to render. */
    meta: StatusMeta;
    /** `soft` (default) tints the tone; `inline` is a bare glyph+word; `solid` fills. */
    variant?: StatusPillVariant;
    size?: StatusPillSize;
}
/**
 * Reusable status indicator for the POS module — the DOM parity of the native
 * `StatusPill`. Renders a {@link StatusMeta} as a **glyph + word** so state is
 * never conveyed by color alone. Color always resolves from a `--xen-*` token
 * class, never a literal. `inline` drops the pill chrome for dense rows. Every
 * POS block composes it, so tender / ticket / refund state reads the same.
 */
export declare const StatusPill: React.ForwardRefExoticComponent<StatusPillProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=StatusPill.d.ts.map