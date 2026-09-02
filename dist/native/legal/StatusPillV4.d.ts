import * as React from 'react';
import type { StatusPillProps } from './StatusPill';
/** Drop-in for {@link StatusPillProps} — same props, the V4 "chambers" design. */
export type StatusPillV4Props = StatusPillProps;
/**
 * StatusPill — **V4** "chambers" design (native twin of the web V4). The
 * distinguished, chambers take on the shared status indicator: a rounded
 * **glyph + word** pill so state is never carried by color alone. The `soft`
 * variant reads as a tone-tinted well with a hairline ring; `solid` fills;
 * `inline` drops the chrome for dense rows. Keeps the base `variant`
 * (`soft` / `inline` / `solid`) and `size` (`sm` / `md`). Color resolves from a
 * compiled token (or a token-tinted `withAlpha`), never a literal.
 */
export declare function StatusPillV4({ meta, variant, size, style }: StatusPillV4Props): React.ReactElement;
//# sourceMappingURL=StatusPillV4.d.ts.map