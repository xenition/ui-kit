import * as React from 'react';
import type { JsonViewerProps } from './JsonViewer';
export type { JsonViewerProps as JsonViewerV4Props };
/**
 * **V4 JSON viewer** — the web twin of the native `JsonViewerV4`, same props as
 * {@link JsonViewer}, a different design line.
 *
 * Four changes:
 *
 * 1. **The syntax colours become readable.** `text-accent`, `text-primary` and
 *    `text-warn` are FILL colours; the compiler makes no contrast promise
 *    about any of them as ink on `surface`. The native twin was fixed for this
 *    — its audit found keys measuring 1.43:1 in light mode — and this twin was
 *    left behind, so the same viewer was legible on a phone and not in a
 *    browser. All five roles now take their `*Text` forms.
 * 2. **A calm, recessed ground.** The tree sat on `bg-surface`, the same
 *    colour as the page. It sinks by the same 4% neutral step `CodeBlockV4`
 *    and the V4 tables use, mixed from the two scheme-resolved slots so it
 *    inverts with the scheme.
 * 3. **Depth gets a guide, not just an indent.** Each level draws a hairline
 *    at its left edge, and the indent step becomes a token instead of the
 *    literal `0.75rem` that made this twin a different shape from its native
 *    counterpart. This is the one place a rule earns itself against §9: an
 *    indent with nothing in it stops telling you which parent a row belongs to
 *    as soon as the parent scrolls off the top, and re-finding that is the
 *    entire task a JSON inspector exists for (§33).
 * 4. **The focus ring is a token.** `ring-primary-300` was a ramp step;
 *    `ring-ring` is the semantic slot, so the ring survives a hue change.
 *
 * **No gradient and no new palette.** Five roles all drawn from seed tokens is
 * the whole colour system here, and §35.5 would not thank us for a sixth.
 */
export declare const JsonViewerV4: React.ForwardRefExoticComponent<JsonViewerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JsonViewerV4.d.ts.map