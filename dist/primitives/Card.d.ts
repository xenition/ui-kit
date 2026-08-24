import * as React from 'react';
export type CardVariant = 'elevated' | 'outlined' | 'flat' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'sm' | 'md' | 'lg' | 'full';
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Surface treatment. Defaults to the historical bordered surface
     * (`outlined`). `elevated` deepens the shadow, `flat` drops the border and
     * shadow, `interactive` keeps the border plus a hover raise for tappable
     * cards.
     */
    variant?: CardVariant;
    /** Padding scale. Defaults to the historical `lg` padding. */
    padding?: CardPadding;
    /** Corner radius scale. Defaults to the historical `lg` radius. */
    radius?: CardRadius;
}
/**
 * Themed surface container: token-bound background, border, and radius. The
 * default (`outlined`, `lg` padding, `lg` radius) renders exactly as before;
 * `variant`/`padding`/`radius` are additive opt-ins mirroring the native
 * `Card`. No literal colors.
 */
export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Card.d.ts.map