import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type UtilityKind, type ServiceState } from './internal/status';
export type { UtilityKind, ServiceState };
export interface ServiceStatusProps {
    /** Utility line — drives the leading glyph and label. */
    kind: UtilityKind;
    /** Operational state — conveyed by text + glyph + color. */
    state: ServiceState;
    /** Service point / address label (e.g. "123 Main St"). */
    location?: string;
    /** Localized "last updated" string. */
    updated?: string;
    /** Supporting detail line (e.g. "Crews on site · ETA 4:00 PM"). */
    detail?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A status card for one service connection. The `state` (active/outage/
 * maintenance/degraded) is conveyed by **glyph + label + a tint that traces to a
 * `SemanticColors` slot** (active → success, outage → danger) — never color
 * alone. A left rail tinted to the state's tone reinforces it without carrying
 * the signal by itself. Purely presentational; every color traces to a token.
 */
export declare function ServiceStatus({ kind, state, location, updated, detail, style, }: ServiceStatusProps): React.ReactElement;
//# sourceMappingURL=ServiceStatus.d.ts.map