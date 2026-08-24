import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Visual density of a {@link CauseCard}. */
export type CauseCardVariant = 'default' | 'compact' | 'featured';
export interface CauseCardProps {
    /** Cause / program name. */
    title: string;
    /** Short description of the cause. */
    description?: string;
    /** Cover image URL; a token-filled placeholder is drawn when absent. */
    imageUrl?: string;
    /** Alt text for the cover (defaults to the title). */
    imageAlt?: string;
    /** Category label rendered as a badge (e.g. `Education`). */
    category?: string;
    /** Amount raised so far, integer **cents** (enables the mini progress meter). */
    raisedCents?: number;
    /** Goal, integer **cents**. */
    goalCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Density / emphasis. `featured` enlarges the cover and title. */
    variant?: CauseCardVariant;
    /** Press handler for the whole card. */
    onPress?: () => void;
    /** Show a skeleton placeholder instead of content. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A browse tile for a single cause / program: cover (image or token
 * placeholder), a category badge, title, blurb, and an optional inline
 * `CampaignProgress` meter when a goal is supplied. `variant` switches between a
 * full card, a `compact` cover-less row, and a larger `featured` treatment; the
 * whole card is pressable via `onPress`. All colors come from the compiled theme
 * tokens — no literal colors.
 */
export declare function CauseCard({ title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency, variant, onPress, loading, style, }: CauseCardProps): React.ReactElement;
//# sourceMappingURL=CauseCard.d.ts.map