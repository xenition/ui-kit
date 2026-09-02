import * as React from 'react';
import type { MatterStatusProps } from './MatterStatus';
/** Drop-in for {@link MatterStatusProps} — same props, the V4 "chambers" design. */
export type MatterStatusV4Props = MatterStatusProps;
/**
 * MatterStatus — **V4** "chambers" design (web parity of the native V4), and the
 * ONE reserved gradient moment of the legal V4 "chambers" line: the header
 * (matter title, current stage glyph + word, and a frosted "Stage N of 6" chip)
 * rides a brand-gradient ground (`bg-gradient-to-br from-primary-500 to-primary-700`)
 * in near-white ink (`text-primary-50` / `text-primary-100`). The body — the
 * segmented **intake → active → discovery → trial → settlement → closed** meter —
 * stays on the plain surface: segments up to the current stage fill with the
 * stage tone token, the rest use the border token. Status is carried by glyph +
 * stage word, never color alone; exposes an ARIA `progressbar`. Reuses the base
 * `variant` (`default` / `compact`). All colors from `--xen-*` token classes /
 * gradient utilities (no literals).
 */
export declare const MatterStatusV4: React.ForwardRefExoticComponent<MatterStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatterStatusV4.d.ts.map