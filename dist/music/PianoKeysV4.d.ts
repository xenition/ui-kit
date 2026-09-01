import * as React from 'react';
import type { PianoKeysProps } from './PianoKeys';
/** Drop-in for {@link PianoKeysProps} — same props, the V4 "session" design. */
export type PianoKeysV4Props = PianoKeysProps;
/**
 * PianoKeys — **V4** "session" design (web parity of the native V4). The tactile
 * take on an on-screen keyboard: white keys read as satisfying `bg-surface`
 * controls with a rounded token base, black keys sit on a token-dark
 * (`bg-on-surface`) fill, and a held key lights with a soft-primary tint **plus**
 * a filled marker dot (never color alone) and `aria-pressed`. No gradient —
 * performance surfaces stay clean and tactile. Honors both `variant`s (`full` /
 * `compact`), the `showLabels`, `disabled`, black-vs-white layout and
 * `onKeyPress(note)` behavior identical to {@link PianoKeysProps}. All colors
 * from `--xen-*` token classes (no literals).
 */
export declare const PianoKeysV4: React.ForwardRefExoticComponent<PianoKeysProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PianoKeysV4.d.ts.map