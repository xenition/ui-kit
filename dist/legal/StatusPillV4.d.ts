import * as React from 'react';
import type { StatusPillProps } from './StatusPill';
/** Drop-in for {@link StatusPillProps} — same props, the V4 "chambers" design. */
export type StatusPillV4Props = StatusPillProps;
/**
 * StatusPill — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on the shared status indicator: a rounded
 * **glyph + word** pill so state is never carried by color alone. The `soft`
 * variant reads as a tone-tinted well with a hairline ring; `solid` fills;
 * `inline` drops the chrome for dense rows. Keeps the base `variant`
 * (`soft` / `inline` / `solid`) and `size` (`sm` / `md`). Color always resolves
 * from a `--xen-*` token class, never a literal. Identical props/behavior to
 * {@link StatusPillProps}.
 */
export declare const StatusPillV4: React.ForwardRefExoticComponent<StatusPillProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=StatusPillV4.d.ts.map