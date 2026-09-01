import * as React from 'react';
import type { CannedResponseProps } from './CannedResponse';
/** Drop-in for {@link CannedResponseProps} — same props, the V4 "calm console" design. */
export type CannedResponseV4Props = CannedResponseProps;
/**
 * CannedResponse — **V4** "calm console" design. A saved-reply card reimagined as
 * an elevated rounded surface: title with an optional shortcut/category chip, the
 * body preview set on a calm inset panel, and a primary **Insert** affordance
 * (≥44px tap target). Tapping the body fires `onPress` (e.g. to expand);
 * **Insert** reports the full response via `onInsert`. One accent = primary;
 * press paints a soft-primary tint. Same props/behavior as
 * {@link CannedResponseProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Dark-mode safe.
 */
export declare function CannedResponseV4({ response, previewLines, onInsert, onPress, insertLabel, style, }: CannedResponseV4Props): React.ReactElement;
//# sourceMappingURL=CannedResponseV4.d.ts.map