import * as React from 'react';
/** Visual treatment of an {@link ImpactStat}. */
export type ImpactStatVariant = 'plain' | 'card' | 'tile';
export type ImpactStatTone = 'primary' | 'success' | 'accent';
export interface ImpactStatProps extends React.HTMLAttributes<HTMLDivElement> {
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
    /** Surface treatment (default `plain`). `tile` adds a tinted panel. */
    variant?: ImpactStatVariant;
    /** Accent tone for the glyph chip / value (default `primary`). */
    tone?: ImpactStatTone;
}
/**
 * Web parity of the native `ImpactStat`: a single impact metric — a large
 * token-scaled figure, an optional unit, a caption label, and an optional glyph
 * chip. `variant` renders it bare (`plain`), inside a bordered `card`, or as a
 * tinted `tile`. The glyph is decorative; the metric is exposed as a group with
 * an `aria-label`. All colors come from the `--xen-*` token classes — no literal
 * colors.
 */
export declare const ImpactStat: React.ForwardRefExoticComponent<ImpactStatProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ImpactStat.d.ts.map