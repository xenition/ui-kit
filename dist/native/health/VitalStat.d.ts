import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
export type VitalStatVariant = 'heart-rate' | 'steps' | 'calories' | 'distance' | 'oxygen' | 'blood-pressure' | 'temperature' | 'respiration';
export interface VitalStatProps {
    /** Which vital sign this tile shows; drives the default icon, label, unit, and tone. */
    variant: VitalStatVariant;
    /** The measured value (e.g. `72`, `"120/80"`). */
    value: React.ReactNode;
    /** Override the variant's default unit suffix. Pass `''` to hide it. */
    unit?: string;
    /** Override the variant's default label. */
    label?: string;
    /** Optional change readout, e.g. `"+4"`; positive reads success, negative danger. */
    delta?: number;
    onPress?: () => void;
    /** Surface treatment for visual diversity; defaults to `classic` (the historical look). */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single vital-sign tile: an emoji icon, the measured value with its unit, a
 * caption, and an optional trend delta. The `variant` picks sensible defaults
 * (icon / unit / accent tone) that individual props can override. `appearance`
 * selects the surface treatment (classic by default). Colors resolve from
 * `SemanticColors` via `useXenitionTheme()` — no literal colors. Pressable when
 * `onPress` is provided.
 */
export declare function VitalStat({ variant, value, unit, label, delta, onPress, appearance, style, }: VitalStatProps): React.ReactElement;
//# sourceMappingURL=VitalStat.d.ts.map