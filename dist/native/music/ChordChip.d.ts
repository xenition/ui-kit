import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Chord } from './types';
export type ChordChipVariant = 'solid' | 'soft' | 'outline';
export type ChordChipSize = 'sm' | 'md' | 'lg';
export interface ChordChipProps {
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
    color?: keyof import('../theme').SemanticColors;
    disabled?: boolean;
    /** Fires with the chord when tapped (omit for a static label). */
    onPress?: (chord: Chord) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A chord label chip — a UI shell only. Renders a chord's label (from
 * `chord.label` or `root`+`quality`) as a pill; tappable when `onPress` is
 * given (fires with the chord), static otherwise. `selected` is surfaced in
 * the a11y `selected` state and a heavier ring/weight, not color alone. Accent
 * comes from a semantic token slot; no literal colors.
 */
export declare function ChordChip({ chord, variant, size, selected, color, disabled, onPress, style, }: ChordChipProps): React.ReactElement;
//# sourceMappingURL=ChordChip.d.ts.map