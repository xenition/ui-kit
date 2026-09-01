import * as React from 'react';
import type { CannedResponseProps } from './CannedResponse';
/** Drop-in for {@link CannedResponseProps} — same props, the V4 "calm console" design. */
export type CannedResponseV4Props = CannedResponseProps;
/**
 * CannedResponse — **V4** "calm console" design (web parity of the native V4).
 * A saved-reply card reimagined as an elevated rounded surface: title with an
 * optional shortcut/category chip, the body preview set on a calm inset panel,
 * and a full-width-friendly primary **Insert** affordance (≥44px tap target).
 * Activating the body fires `onClick` (click + keyboard); **Insert** reports the
 * full response via `onInsert`. One accent = primary; selection/hover use a
 * soft-primary tint. Same props/behavior as {@link CannedResponseProps}; all
 * colors from `--xen-*` token classes (no literal hex). Dark-mode safe.
 */
export declare const CannedResponseV4: React.ForwardRefExoticComponent<CannedResponseProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CannedResponseV4.d.ts.map