import * as React from 'react';
import type { PianoKeysProps } from './PianoKeys';
/** Same public contract as {@link PianoKeys} — a drop-in alternate design. */
export type PianoKeysV2Props = PianoKeysProps;
/**
 * PianoKeys, redesigned (v2): a **large keyboard with raised keys and labels**.
 * Tall white keys sit under overlaid black keys that read as physically raised
 * (drop shadow + a lit top edge), and every white key carries its note label.
 * A held key (`highlightedNotes`) tints **and** drops a filled marker plus the
 * a11y `selected` state — never color alone. Pressing fires `onKeyPress(note)`.
 * Token-only styling. Distinct at a glance from v1's flatter octave. Same props.
 */
export declare function PianoKeysV2({ startOctave, octaves, highlightedNotes, variant, showLabels, disabled, onKeyPress, style, }: PianoKeysV2Props): React.ReactElement;
//# sourceMappingURL=PianoKeysV2.d.ts.map