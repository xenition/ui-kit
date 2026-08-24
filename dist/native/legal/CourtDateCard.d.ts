import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type CourtEventType, type CourtUrgency } from './internal';
export type CourtDateCardVariant = 'default' | 'compact';
export interface CourtDateCardProps {
    /** Kind of court event — glyph + word chip. */
    type: CourtEventType;
    /** Pre-formatted date label (e.g. "Sep 14, 2026"). */
    date: string;
    /** Pre-formatted time label. */
    time?: string;
    /** Court / venue name. */
    court?: string;
    /** Judge / hearing officer. */
    judge?: string;
    /** Associated case number. */
    caseNumber?: string;
    /** Time-relative urgency — glyph + word pill (today/soon/upcoming/past). */
    urgency?: CourtUrgency;
    /** Optional countdown label (e.g. "in 3 days"). */
    countdown?: string;
    /** Density. */
    variant?: CourtDateCardVariant;
    /** Tap handler. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A court date / filing deadline card: a leading urgency-tinted date block, the
 * event type and urgency pills (each glyph + word so nothing rests on color
 * alone), and venue / judge / case metadata. A `today` or `soon` urgency drives
 * a token-tinted header rail for at-a-glance triage. All colors are theme tokens
 * — no literals.
 */
export declare function CourtDateCard({ type, date, time, court, judge, caseNumber, urgency, countdown, variant, onPress, testID, style, }: CourtDateCardProps): React.ReactElement;
//# sourceMappingURL=CourtDateCard.d.ts.map