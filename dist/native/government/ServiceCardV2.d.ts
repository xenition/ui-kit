import * as React from 'react';
import type { ServiceCardProps } from './ServiceCard';
/** Drop-in replacement for {@link ServiceCard} — identical props, distinct design. */
export type ServiceCardV2Props = ServiceCardProps;
/**
 * ServiceCard, alternate design **V2** — an elevated tile. A large tinted
 * category glyph tile anchors the header beside the title; the delivery channel
 * reads as a prominent text + glyph availability badge (never color alone); a
 * quiet turnaround footer sits above a **full-width primary Start CTA**. Same
 * `ServiceCardProps`; drops in for `ServiceCard`. Token-pure.
 */
export declare function ServiceCardV2({ category, title, description, channel, estimatedTime, actionLabel, onStart, onPress, style, }: ServiceCardV2Props): React.ReactElement;
//# sourceMappingURL=ServiceCardV2.d.ts.map