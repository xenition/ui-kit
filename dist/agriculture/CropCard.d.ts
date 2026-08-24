import * as React from 'react';
/** Growth phase of a planting. Drives the stage chip + default glyph. */
export type GrowthStage = 'seeding' | 'growing' | 'flowering' | 'mature' | 'harvested';
/** Plant health — colors the health value and pairs with a text chip. */
export type CropHealth = 'healthy' | 'stressed' | 'critical';
/** Visual density. `detailed` shows the maturity bar + meta; `compact` is a slim row. */
export type CropCardVariant = 'detailed' | 'compact';
export interface CropCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Crop / planting name (e.g. "Winter Wheat"). */
    name: string;
    /** Cultivar / variety line (e.g. "Skyfall"). */
    variety?: string;
    /** Leading glyph/emoji. Defaults to a stage-appropriate glyph. */
    icon?: string;
    /** Growth phase. Default `'growing'`. */
    stage?: GrowthStage;
    /** Plant health — colors the health label and shows a text status chip. */
    health?: CropHealth;
    /** Maturity progress 0–100 (rendered as a bar in `detailed`). Guarded/clamped. */
    progress?: number;
    /** Field / plot the crop sits in (e.g. "North 40"). */
    fieldLabel?: string;
    /** Days-to-harvest or ready hint (e.g. "42 days to harvest"). */
    harvestLabel?: string;
    /** Density variant. Default `'detailed'`. */
    variant?: CropCardVariant;
    /** Show a muted placeholder while data loads. */
    loading?: boolean;
    /** Fires when the card is activated (opens the planting). */
    onClick?: () => void;
}
/**
 * A single crop / planting summary — glyph, name + variety, a growth-stage
 * {@link Badge}, an optional health chip (color is always paired with a text
 * label so an at-risk crop reads without color), and, in the `detailed`
 * variant, a maturity {@link Progress} bar plus field / harvest meta. When
 * `onClick` is set the card is an accessible `role="button"` with keyboard
 * activation; `loading` renders a muted placeholder. Token-bound throughout —
 * no literal colors.
 */
export declare const CropCard: React.ForwardRefExoticComponent<CropCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CropCard.d.ts.map