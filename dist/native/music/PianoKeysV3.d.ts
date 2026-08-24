import * as React from 'react';
import type { PianoKeysProps } from './PianoKeys';
/** Same public contract as {@link PianoKeys} — a drop-in alternate design. */
export type PianoKeysV3Props = PianoKeysProps;
/**
 * PianoKeys, redesigned (v3): a **compact slim keyboard** — short, thin white
 * keys with narrow flat black keys, no labels by default, sized for a header
 * strip or a small inline control. A held key (`highlightedNotes`) reads via a
 * tint plus a small filled marker and the a11y `selected` state — never color
 * alone. Pressing fires `onKeyPress(note)`. Token-only styling. Distinct at a
 * glance from v1's taller labelled octave. Same props.
 */
export declare function PianoKeysV3({ startOctave, octaves, highlightedNotes, variant, showLabels, disabled, onKeyPress, style, }: PianoKeysV3Props): React.ReactElement;
//# sourceMappingURL=PianoKeysV3.d.ts.map