import * as React from 'react';
import type { ServiceCardProps } from './ServiceCard';
/** Drop-in replacement for {@link ServiceCard} — identical props, distinct design. */
export type ServiceCardV3Props = ServiceCardProps;
/**
 * ServiceCard, alternate design **V3** — a minimal directory line. A small
 * primary category dot and glyph lead, the title and category label share the
 * line, and the delivery channel (text + glyph, never color alone) plus
 * turnaround close it on the right. Tight rhythm for long service lists. Same
 * `ServiceCardProps`; drops in for `ServiceCard`. Token-pure.
 */
export declare function ServiceCardV3({ category, title, description, channel, estimatedTime, onStart, onPress, style, }: ServiceCardV3Props): React.ReactElement;
//# sourceMappingURL=ServiceCardV3.d.ts.map