import * as React from 'react';
export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Column count at the `lg` breakpoint (default 6 — spans of 2/4 make the classic bento). */
    columns?: number;
}
export interface BentoCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    /** Column span at `lg` (default 2). Mix 4s and 2s for asymmetry. */
    span?: number;
    /** Row span at `lg` (default 1). */
    rowSpan?: number;
    /** Icon slot, rendered in a ramp-gradient tile. */
    icon?: React.ReactNode;
    /** Small stat chip in the top-right corner (e.g. "38ms p99"). */
    metric?: React.ReactNode;
    /** Card title. */
    title?: React.ReactNode;
    /**
     * Micro-visual slot below the body — a mini `ProductMock` chart, a
     * `ParticleField`, an equalizer… whatever sells the card.
     */
    visual?: React.ReactNode;
    /** Small emphasized footer line pinned to the bottom. */
    detail?: React.ReactNode;
    /** Radial "energy wash" that fades in from the top corner on hover (default true). */
    wash?: boolean;
}
/**
 * Asymmetric bento feature grid generalized from the SaaS template: a
 * 6-column canvas where cards declare their own spans (4/2 over 2/4 is the
 * signature rhythm). Pure composition — wrap cards in `Reveal`/`Stagger`
 * for the cascade.
 */
export declare const BentoGrid: React.ForwardRefExoticComponent<BentoGridProps & React.RefAttributes<HTMLDivElement>>;
/**
 * One bento cell: icon tile + metric chip header, title, body (children), an
 * optional micro-visual slot, and a pinned detail line — with a token-mixed
 * hover energy wash. All slots optional; an empty card is a styled panel.
 */
export declare const BentoCard: React.ForwardRefExoticComponent<BentoCardProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Bento.d.ts.map