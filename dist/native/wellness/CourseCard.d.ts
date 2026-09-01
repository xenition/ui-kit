import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CourseCardProps {
    /** Program title. */
    title: string;
    /** Secondary line — a short description. */
    subtitle?: string;
    /** Small uppercase category kicker. */
    category?: string;
    /** Total number of days in the program. */
    totalDays: number;
    /** Days completed so far. Default `0`. */
    completedDays?: number;
    /** Glyph shown on the gradient cover tile. Default `'🌿'`. */
    coverGlyph?: string;
    /** Fires when the card is tapped; the card is a button only when set. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * CourseCard — a multi-day program on a calm, clean surface card. A single small
 * gradient cover tile and a slim gradient progress fill are the only color; the
 * rest stays on the neutral surface with `onSurface`/`mutedText` type, in the
 * spirit of restraint. Progress is stated in words ("Day 3 of 10") as well as
 * the bar, so it never depends on color alone. Every value is a token, so it
 * adapts light + dark and restyles from the seed.
 */
export declare function CourseCard({ title, subtitle, category, totalDays, completedDays, coverGlyph, onPress, style, }: CourseCardProps): React.ReactElement;
//# sourceMappingURL=CourseCard.d.ts.map