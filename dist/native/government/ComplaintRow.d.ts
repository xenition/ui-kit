import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Lifecycle of a citizen complaint / 311 service request. */
export type ComplaintStatus = 'open' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
/** Triage priority of the request. */
export type ComplaintPriority = 'low' | 'normal' | 'high' | 'urgent';
export interface ComplaintRowProps {
    /** Ticket / request reference (e.g. "311-88214"). */
    ticketNumber: string;
    /** Short description of the complaint (e.g. "Pothole on 5th Ave"). */
    title: string;
    /** Lifecycle status — conveyed by text + glyph + color. */
    status: ComplaintStatus;
    /** Category (e.g. "Roads", "Sanitation"). */
    category?: string;
    /** Triage priority — rendered as a text+glyph badge when `high`/`urgent`. */
    priority?: ComplaintPriority;
    /** Localized filed / updated date. */
    date?: string;
    /** Fires on row press (open request detail); button only when supplied. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One line in a citizen-complaint / 311 service-request list: a tinted status
 * glyph disc, a title/ticket stack, and status + optional priority pills — each
 * conveyed by **glyph + label + a color that traces to a `SemanticColors`
 * slot** (resolved → success, urgent → danger), never color alone. Becomes a
 * button only when `onPress` is supplied.
 */
export declare function ComplaintRow({ ticketNumber, title, status, category, priority, date, onPress, style, }: ComplaintRowProps): React.ReactElement;
//# sourceMappingURL=ComplaintRow.d.ts.map