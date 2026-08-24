import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type RequestState } from './internal/status';
export type { RequestState };
/** Kind of service request — drives the leading glyph. */
export type ServiceRequestKind = 'repair' | 'connect' | 'disconnect' | 'transfer' | 'inspection' | 'meter' | 'other';
export interface ServiceRequestRowProps {
    /** Request reference / ticket number (e.g. "SR-10482"). */
    requestNumber: string;
    /** Short summary (e.g. "Water heater leak"). */
    title: string;
    /** Lifecycle state — conveyed by text + glyph + color. */
    status: RequestState;
    /** Request kind — drives the leading glyph (default `other`). */
    kind?: ServiceRequestKind;
    /** Localized scheduled/updated date. */
    date?: string;
    /** Priority — surfaces an extra "Urgent" tag when `high`. */
    priority?: 'low' | 'normal' | 'high';
    /** Fires on row press (e.g. open request detail); becomes a button when supplied. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One line in a service-request / work-order list: a tinted kind glyph disc, a
 * title/number stack, an optional date, and a status pill. The state is conveyed
 * redundantly (glyph + label + a color that traces to a `SemanticColors` slot:
 * completed → success, cancelled → neutral) so it is never color-alone; a `high`
 * priority adds an explicit "Urgent" tag rather than relying on color. Becomes a
 * button only when `onPress` is supplied.
 */
export declare function ServiceRequestRow({ requestNumber, title, status, kind, date, priority, onPress, style, }: ServiceRequestRowProps): React.ReactElement;
//# sourceMappingURL=ServiceRequestRow.d.ts.map