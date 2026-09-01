import * as React from 'react';
import type { RoomGroupProps } from './RoomGroup';
/** Drop-in for {@link RoomGroupProps} — same props, the V4 "ambient" design. */
export type RoomGroupV4Props = RoomGroupProps;
/**
 * RoomGroup — **V4** "ambient" design. The control-panel take on a room card:
 * when **any** device is on, the whole card takes a soft `primary`-tinted wash,
 * a primary border, and a glowing icon disc so an active room reads at a glance.
 * A **bold numeral** summarizes how many devices are on, and a group all-on/off
 * {@link Switch} keeps parity with the base header. Idle rooms stay calm and
 * muted; status is carried by icon + a text summary (never color alone). Same
 * props/behavior as {@link RoomGroupProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function RoomGroupV4({ name, icon, devices, onDeviceToggle, onToggleAll, emptyTitle, children, style, }: RoomGroupV4Props): React.ReactElement;
//# sourceMappingURL=RoomGroupV4.d.ts.map