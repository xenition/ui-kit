import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ConflictCheck, type IntakeStatus, type PracticeArea } from './internal';
export type ClientIntakeRowVariant = 'default' | 'compact';
export interface ClientIntakeRowProps {
    /** Prospective client name. */
    name: string;
    /** Matter type / practice area of the inquiry. */
    practiceArea?: PracticeArea;
    /** Intake stage — glyph + word pill, never color alone. */
    status?: IntakeStatus;
    /** Conflict-check outcome — glyph + word pill. */
    conflict?: ConflictCheck;
    /** Pre-formatted inquiry date / source label. */
    source?: string;
    /** Short summary of the matter. */
    summary?: string;
    /** Avatar image URL (initials fallback otherwise). */
    avatarUrl?: string;
    /** Density. */
    variant?: ClientIntakeRowVariant;
    /** Render the accept/decline action row. */
    actionable?: boolean;
    /** Accept / retain the prospective client. */
    onAccept?: () => void;
    /** Decline the inquiry. */
    onDecline?: () => void;
    /** Tap handler for the whole row. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A prospective-client intake row: name, matter type, intake stage and
 * conflict-check pills (each a glyph + word so state never rests on color
 * alone). When `actionable` and still open, an accept/decline row is shown. All
 * colors are theme tokens — no literals.
 */
export declare function ClientIntakeRow({ name, practiceArea, status, conflict, source, summary, avatarUrl, variant, actionable, onAccept, onDecline, onPress, testID, style, }: ClientIntakeRowProps): React.ReactElement;
//# sourceMappingURL=ClientIntakeRow.d.ts.map