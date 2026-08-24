import * as React from 'react';
import { type StatusMeta } from './internal';
export type StatusPillVariant = 'soft' | 'inline' | 'solid';
export type StatusPillSize = 'sm' | 'md';
export interface StatusPillProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** The glyph + label + tone triple to render. */
    meta: StatusMeta;
    /** `soft` (default) tints a neutral chrome; `inline` is a bare glyph+word; `solid` fills the tone. */
    variant?: StatusPillVariant;
    size?: StatusPillSize;
}
/**
 * Reusable status indicator for the web HR module — the DOM parity of the
 * native `StatusPill`. Renders a {@link StatusMeta} as a **glyph + word** pill so
 * state is never conveyed by color alone. Every color resolves from a `--xen-*`
 * token class (`text-primary`, `bg-success`, …), never a literal. `soft`
 * (default) draws neutral pill chrome with a tone-colored glyph + word; `inline`
 * drops the chrome for dense rows; `solid` fills the tone. `forwardRef` to the
 * root `<span>`.
 */
export declare const StatusPill: React.ForwardRefExoticComponent<StatusPillProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=StatusPill.d.ts.map