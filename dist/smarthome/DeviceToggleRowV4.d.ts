import * as React from 'react';
import type { DeviceToggleRowProps } from './DeviceToggleRow';
/** Drop-in for {@link DeviceToggleRowProps} — same props, the V4 "ambient" design. */
export type DeviceToggleRowV4Props = DeviceToggleRowProps;
/**
 * DeviceToggleRow — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on a list row: a **leading glyph glows** in a soft
 * primary-tinted disc when the device is `on`, and the whole row takes a gentle
 * primary wash so an active device reads at a glance; `off`/`offline` stay calm
 * on `surface`. The name + subtitle sit beside a trailing on/off {@link Switch};
 * when `offline` the switch is disabled and the subtitle is replaced by a muted
 * "Offline" note so unreachability is textual, not color-only. Rows are ≥44px
 * tall for comfortable touch. Same props/behavior as {@link DeviceToggleRowProps}
 * (both `onCheckedChange`/`onChange` spellings, `last` divider); all colors from
 * `--xen-*` token classes (no literals).
 */
export declare const DeviceToggleRowV4: React.ForwardRefExoticComponent<DeviceToggleRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DeviceToggleRowV4.d.ts.map