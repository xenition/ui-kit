import * as React from 'react';
import type { ShareSheetProps } from './ShareSheet';
/** Drop-in for {@link ShareSheetProps} — same props, the V4 "feed" design. */
export type ShareSheetV4Props = ShareSheetProps;
/**
 * ShareSheet — **V4** "feed" design (web parity of the native V4). A clean,
 * airy bottom share surface: a dimmed backdrop and a rounded panel holding a
 * wrapping grid of share targets — each a soft-primary tinted glyph disc with a
 * ≥44px tap target and a label — plus a full-width copy-link/Cancel row. Same
 * props/behavior as {@link ShareSheetProps} (self-contained overlay, empty-list
 * handling, `onSelect`/`onClose`); all colors from `--xen-*` token classes (no
 * literals). `role="dialog"`.
 */
export declare const ShareSheetV4: React.ForwardRefExoticComponent<ShareSheetProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShareSheetV4.d.ts.map