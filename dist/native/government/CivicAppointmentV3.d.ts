import * as React from 'react';
import type { CivicAppointmentProps } from './CivicAppointment';
/** Drop-in replacement for {@link CivicAppointment} — identical props, distinct design. */
export type CivicAppointmentV3Props = CivicAppointmentProps;
/**
 * CivicAppointment, alternate design **V3** — a dense agenda line. A left
 * date/time column (bold date over muted time) leads, the service and office
 * share the middle, and the lifecycle status closes the line as a text + glyph +
 * color pill (never color alone). Tight rhythm for a day/agenda list. Same
 * `CivicAppointmentProps`; drops in for `CivicAppointment`. Token-pure.
 */
export declare function CivicAppointmentV3({ service, office, date, time, status, location, reference, style, }: CivicAppointmentV3Props): React.ReactElement;
//# sourceMappingURL=CivicAppointmentV3.d.ts.map