import * as React from 'react';
import type { ServiceStatusProps } from './ServiceStatus';
/** Same public contract as {@link ServiceStatus} — a drop-in alternate design. */
export type ServiceStatusV3Props = ServiceStatusProps;
/**
 * ServiceStatus, redesigned (v3): a **compact inline chip line**. A state dot +
 * utility glyph lead, the line label and a soft state badge sit together, and the
 * location / "updated" caption trails muted on the right — a single scannable row
 * with no card. Distinct at a glance from v1's rail card and v2's banner. Same
 * props; state is dot + glyph + label (never color alone); token-pure.
 */
export declare function ServiceStatusV3({ kind, state, location, updated, style, }: ServiceStatusV3Props): React.ReactElement;
//# sourceMappingURL=ServiceStatusV3.d.ts.map