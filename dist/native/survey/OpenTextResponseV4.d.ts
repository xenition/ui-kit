import * as React from 'react';
import type { OpenTextResponseProps } from './OpenTextResponse';
/** Drop-in for {@link OpenTextResponseProps} — same props, the V4 "focus" design. */
export type OpenTextResponseV4Props = OpenTextResponseProps;
/**
 * OpenTextResponse — **V4** "clean form / focus" design. A big, comfortable
 * multiline answer field on a calm `surface`: a `border` hairline that lifts to a
 * soft **primary** ring/border while focused (the single signature accent), an
 * optional label, and a live character counter that turns **danger** once the
 * text meets or exceeds `maxLength`. Generous padding, rounded control, no
 * gradients. Fully controlled (`value`/`onChange`); preserves the multiline
 * `TextInput` a11y (`accessibilityLabel`) and `maxLength` guard. Same
 * props/behavior as {@link OpenTextResponseProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha` (no literal colors).
 */
export declare function OpenTextResponseV4({ value, onChange, placeholder, label, rows, maxLength, error, disabled, style, }: OpenTextResponseV4Props): React.ReactElement;
//# sourceMappingURL=OpenTextResponseV4.d.ts.map