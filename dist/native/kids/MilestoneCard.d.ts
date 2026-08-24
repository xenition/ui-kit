import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type MilestoneCategory = 'physical' | 'cognitive' | 'social' | 'language' | 'emotional' | 'other';
export interface MilestoneCardProps {
    /** Milestone title, e.g. "First steps". */
    title: string;
    /** Developmental category; drives the icon + label. */
    category?: MilestoneCategory;
    /** Date the milestone was reached (or is expected). */
    date?: string;
    /** Typical age band, e.g. "12–15 mo". */
    ageLabel?: string;
    /** Free-text description / note. */
    description?: string;
    /** Whether the milestone has been achieved. */
    achieved?: boolean;
    /** Loading placeholder state. */
    loading?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A developmental milestone: a category icon, title, date/age band, an optional
 * note, and an achieved/upcoming chip. State is conveyed by glyph + text + a11y
 * label (never color alone). Renders a muted skeleton while `loading`.
 * Token-only colors.
 */
export declare function MilestoneCard({ title, category, date, ageLabel, description, achieved, loading, onPress, style, }: MilestoneCardProps): React.ReactElement;
//# sourceMappingURL=MilestoneCard.d.ts.map