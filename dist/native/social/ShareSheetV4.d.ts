import * as React from 'react';
import type { ShareSheetProps } from './ShareSheet';
/** Drop-in for {@link ShareSheetProps} — same props, the V4 "feed" design. */
export type ShareSheetV4Props = ShareSheetProps;
/**
 * ShareSheet — **V4** "feed" design. A clean, airy bottom share surface: a
 * dimmed backdrop and a rounded panel holding a wrapping grid of share targets
 * — each a soft-primary tinted glyph disc with a ≥44px tap target and a label —
 * plus a full-width copy-link/Cancel row. Same props/behavior as
 * {@link ShareSheetProps} (self-contained overlay, empty-list handling,
 * `onSelect`/`onClose`); token-only colors via `useXenitionTheme()`. The
 * `appearance` prop is accepted for parity but the panel stays on the clean
 * surface in the feed line.
 */
export declare function ShareSheetV4({ visible, title, subtitle, targets, onSelect, onClose, emptyLabel, style, }: ShareSheetV4Props): React.ReactElement | null;
//# sourceMappingURL=ShareSheetV4.d.ts.map