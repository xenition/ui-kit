import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ReviewCardVariant = 'default' | 'compact';
export interface ReviewCardProps {
    /** Reviewer name. */
    author: string;
    /** Star rating (0–5). */
    rating: number;
    /** Review body text. */
    text?: string;
    /** Human date string (e.g. "2 weeks ago"). */
    date?: string;
    /** Service the review is about (e.g. "Balayage"). Shown as a chip. */
    service?: string;
    /** Reviewer avatar URL; initials fall back. */
    avatarUrl?: string;
    /** Marks a verified booking with a success note. */
    verified?: boolean;
    /** Density. `compact` hides the body text. */
    variant?: ReviewCardVariant;
    /** Salon reply text, shown as a nested block. */
    reply?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A customer review card: avatar + author, a star `Rating`, an optional service
 * chip and verified badge, the review body, and an optional salon reply block.
 * `variant="compact"` drops the body for dense lists. The verified state is a
 * spoken/labelled note (not color alone). Token-only colors — chips/reply use
 * `withAlpha` tints over semantic slots.
 */
export declare function ReviewCard({ author, rating, text, date, service, avatarUrl, verified, variant, reply, style, }: ReviewCardProps): React.ReactElement;
//# sourceMappingURL=ReviewCard.d.ts.map