import * as React from 'react';
import type { PianoKeysProps } from './PianoKeys';
/** Drop-in for {@link PianoKeysProps} — same props, the V4 "session" design. */
export type PianoKeysV4Props = PianoKeysProps;
/**
 * PianoKeys — **V4** "session" design. The tactile take on an on-screen
 * keyboard: white keys read as satisfying `surface` controls on a rounded token
 * bed, black keys sit on a token-dark (`onSurface`) fill, and a held key lights
 * with a soft-primary tint **plus** a filled marker dot (never color alone) and
 * the a11y `selected` state. No gradient — performance surfaces stay clean and
 * tactile. Honors both `variant`s (`full` / `compact`), the `showLabels`,
 * `disabled`, black-vs-white layout and `onKeyPress(note)` behavior identical to
 * {@link PianoKeysProps}. Token-only colors via `useXenitionTheme()`.
 */
export declare function PianoKeysV4({ startOctave, octaves, highlightedNotes, variant, showLabels, disabled, onKeyPress, style, }: PianoKeysV4Props): React.ReactElement;
//# sourceMappingURL=PianoKeysV4.d.ts.map