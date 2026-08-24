import * as React from 'react';
import type { ServiceStatusProps } from './ServiceStatus';
/** Same public contract as {@link ServiceStatus} — a drop-in alternate design. */
export type ServiceStatusV2Props = ServiceStatusProps;
/**
 * ServiceStatus, redesigned (v2): a **big status banner card**. A state-tinted
 * banner fills the top with a large service-glyph tile and an oversized state
 * headline (glyph + label) beside the utility line and location; the detail and
 * "updated" caption sit in a plain body below. Lifted with a shadow. Distinct at
 * a glance from v1's slim left-rail card and v3's inline chip. Same props; state
 * is glyph + label + a tint that traces to a `SemanticColors` slot (never color
 * alone); token-pure.
 */
export declare function ServiceStatusV2({ kind, state, location, updated, detail, style, }: ServiceStatusV2Props): React.ReactElement;
//# sourceMappingURL=ServiceStatusV2.d.ts.map