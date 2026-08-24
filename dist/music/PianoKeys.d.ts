import * as React from 'react';
export type PianoKeysVariant = 'full' | 'compact';
export interface PianoKeysProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onKeyPress'> {
    /** Lowest octave number (default `4`). */
    startOctave?: number;
    /** How many octaves to render (default `1`). Clamped to `>= 1`. */
    octaves?: number;
    /** Note names currently held down, e.g. `['C4','E4','G4']` (playing state). */
    highlightedNotes?: string[];
    /**
     * - `full` — labelled white keys + overlaid black keys (default).
     * - `compact` — shorter keys, no labels.
     */
    variant?: PianoKeysVariant;
    /** Show the note name on each white key (default true in `full`). */
    showLabels?: boolean;
    /** Disable the whole keyboard. */
    disabled?: boolean;
    /** Fires with the note name (e.g. `'C#4'`) when a key is pressed. */
    onKeyPress?: (note: string) => void;
}
/**
 * An on-screen keyboard — one or more octaves of piano keys, a UI shell only
 * (it makes no sound), and the DOM parity of `native/music`'s `PianoKeys`. White
 * keys lay out in a row of real `<button>`s with the black keys overlaid at the
 * correct positions; `highlightedNotes` lights held keys via a tint **and** a
 * filled marker (never color alone) plus `aria-pressed`. Pressing a key fires
 * `onKeyPress(note)` with a name like `'C#4'`. Token-only styling.
 */
export declare const PianoKeys: React.ForwardRefExoticComponent<PianoKeysProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PianoKeys.d.ts.map