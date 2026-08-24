import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Relative due-date urgency. */
export type DueDateTone = 'overdue' | 'today' | 'upcoming';
export interface DueDatePillProps {
    /** Pre-formatted date label (e.g. `'Aug 24'`, `'Tomorrow'`). */
    label: string;
    /** Urgency tone; drives the semantic color. */
    tone?: DueDateTone;
    /** Optional leading glyph override (default a calendar/clock per tone). */
    glyph?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Compact due-date pill — a token-bound background/foreground keyed off the
 * urgency `tone`, with a leading glyph. For deadlines on task rows and cards.
 * Every color traces to a `SemanticColors` slot. No literal colors.
 */
export declare function DueDatePill({ label, tone, glyph, style }: DueDatePillProps): React.ReactElement;
//# sourceMappingURL=DueDatePill.d.ts.map