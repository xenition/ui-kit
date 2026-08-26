import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type VolumeFaderVariant = 'labeled' | 'bare';
export interface VolumeFaderProps {
    /** Current fader position in `[min, max]`. */
    value: number;
    /** Range bounds (default `0`…`100`). */
    min?: number;
    max?: number;
    /** Snap step (default `1`). */
    step?: number;
    /** Channel / control name shown above the track. */
    label?: string;
    /**
     * - `labeled` — name + numeric read-out around the track (default).
     * - `bare` — just the track (for dense strips).
     */
    variant?: VolumeFaderVariant;
    /** Muted state — dims the fader and appends a muted note to a11y. */
    muted?: boolean;
    /** Suffix for the numeric read-out, e.g. `'dB'`, `'%'`. */
    unit?: string;
    disabled?: boolean;
    /**
     * Fires with the new value as the user drags. Prefer `onChange` — that is the
     * kit's one canonical name for "the value changed". `onValueChange` is this
     * component's original spelling, kept so existing callers keep working; if
     * both are passed this one wins.
     */
    onValueChange?: (value: number) => void;
    /** Canonical spelling of `onValueChange` (see it for the precedence rule). */
    onChange?: (value: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A labelled volume fader — a thin wrapper over the `Slider` primitive that
 * adds a name and a live numeric read-out, plus a `muted` state surfaced in
 * both the dimming *and* the a11y label (never color alone). It owns no audio;
 * drags report out through `onValueChange`. Token-only styling.
 */
export declare function VolumeFader({ value, min, max, step, label, variant, muted, unit, disabled, onValueChange, onChange, style, }: VolumeFaderProps): React.ReactElement;
//# sourceMappingURL=VolumeFader.d.ts.map