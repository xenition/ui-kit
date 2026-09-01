import * as React from 'react';
import type { OpenTextResponseProps } from './OpenTextResponse';
/** Drop-in for {@link OpenTextResponseProps} — same props, the V4 "focus" design. */
export type OpenTextResponseV4Props = OpenTextResponseProps;
/**
 * OpenTextResponse — **V4** "clean form / focus" design. A big, comfortable
 * multiline answer field on a calm `bg-surface`: a `border-border` hairline that
 * lifts to a soft **primary** ring/border on focus (the single signature accent),
 * an optional label, and a live character counter that turns **danger** once the
 * text meets or exceeds `maxLength`. Generous padding, rounded control, no
 * gradients. Fully controlled (`value`/`onChange`); preserves the `textbox`
 * a11y (`aria-label`, `aria-invalid`) and `maxLength` guard. Same props/behavior
 * as {@link OpenTextResponseProps}; all colors from `--xen-*` token classes (no
 * literal colors).
 */
export declare const OpenTextResponseV4: React.ForwardRefExoticComponent<OpenTextResponseProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OpenTextResponseV4.d.ts.map