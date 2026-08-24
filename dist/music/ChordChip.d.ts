import * as React from 'react';
import { type AccentSlot, type Chord } from './types';
export type ChordChipVariant = 'solid' | 'soft' | 'outline';
export type ChordChipSize = 'sm' | 'md' | 'lg';
export interface ChordChipProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'color'> {
    /** The chord to display (root + quality → label). */
    chord: Chord;
    /**
     * - `soft` — tinted fill (default).
     * - `solid` — filled accent.
     * - `outline` — ringed only.
     */
    variant?: ChordChipVariant;
    /** Chip size (default `md`). */
    size?: ChordChipSize;
    /** Selected / active state (e.g. current chord in a progression). */
    selected?: boolean;
    /** Accent slot (default `primary`). */
    color?: AccentSlot;
    /** Disable the chip. */
    disabled?: boolean;
    /** Fires with the chord when tapped (omit for a static label). */
    onClick?: (chord: Chord) => void;
}
/**
 * A chord label chip — a UI shell only, and the DOM parity of `native/music`'s
 * `ChordChip`. Renders a chord's label (from `chord.label` or `root`+`quality`)
 * as a pill; a real `<button>` when `onClick` is given (fires with the chord),
 * a static `<span>` otherwise. `selected` is surfaced in `aria-pressed` and a
 * heavier ring/weight, not color alone. Accent comes from a semantic token
 * class; no literal colors.
 */
export declare const ChordChip: React.ForwardRefExoticComponent<ChordChipProps & React.RefAttributes<HTMLButtonElement | HTMLSpanElement>>;
//# sourceMappingURL=ChordChip.d.ts.map