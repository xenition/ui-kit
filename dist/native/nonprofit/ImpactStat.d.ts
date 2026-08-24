import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Visual treatment of an {@link ImpactStat}. */
export type ImpactStatVariant = 'plain' | 'card' | 'tile';
export type ImpactStatTone = 'primary' | 'success' | 'accent';
export interface ImpactStatProps {
    /** The headline figure, e.g. `12,480` or `3.2M`. */
    value: React.ReactNode;
    /** What the figure counts, e.g. `Meals served`. */
    label: string;
    /** Optional unit rendered muted after the value (e.g. `liters`). */
    unit?: string;
    /** Optional leading glyph/emoji (e.g. `💧`). */
    glyph?: string;
    /** Optional supporting caption below the label. */
    caption?: string;
    /** Surface treatment (default `plain`). `tile` adds a tinted accent panel. */
    variant?: ImpactStatVariant;
    /** Accent tone for the glyph chip / tile (default `primary`). */
    tone?: ImpactStatTone;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single impact metric — a large token-scaled figure, an optional unit, a
 * caption label, and an optional glyph chip. `variant` renders it bare
 * (`plain`), inside a bordered `card`, or as a tinted `tile`. The glyph is
 * decorative; the metric is announced as a `summary`. All colors come from the
 * compiled theme tokens (accent tints via `withAlpha`) — no literal colors.
 */
export declare function ImpactStat({ value, label, unit, glyph, caption, variant, tone, style, }: ImpactStatProps): React.ReactElement;
//# sourceMappingURL=ImpactStat.d.ts.map