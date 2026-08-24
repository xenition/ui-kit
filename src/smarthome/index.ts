/**
 * `@xenition/ui/smarthome` — presentational IoT / smart-home / device-control
 * blocks for React DOM. The web parity of `@xenition/ui/native/smarthome`:
 * identical names + prop contract, with `onPress`→`onClick` and React Native
 * views/`Pressable`s rewritten to DOM elements. Composed from the web primitives
 * (`Card`, `Button`, `Icon`, `Badge`, `Switch`, `Slider`) and the shared inline-
 * SVG `BarChart`, plus the shared `EmptyState`. Styled exclusively through the
 * Tailwind `--xen-*` token classes — no literal colors; the circular
 * `ThermostatDial` is a dependency-free inline `<svg>` arc whose stroke/fill
 * reference `var(--xen-*)`. Status is always carried by text + a glyph (never
 * color alone), interactive parts expose proper a11y roles, and every component
 * has empty / loading affordances. None fetches or imports the SDK.
 */

export { DeviceTile } from './DeviceTile';
export type { DeviceTileProps, DeviceState } from './DeviceTile';
export { DeviceTileV2 } from './DeviceTileV2';
export type { DeviceTileV2Props } from './DeviceTileV2';
export { DeviceTileV3 } from './DeviceTileV3';
export type { DeviceTileV3Props } from './DeviceTileV3';

export { ThermostatDial } from './ThermostatDial';
export type { ThermostatDialProps, ThermostatMode } from './ThermostatDial';
export { ThermostatDialV2 } from './ThermostatDialV2';
export type { ThermostatDialV2Props } from './ThermostatDialV2';
export { ThermostatDialV3 } from './ThermostatDialV3';
export type { ThermostatDialV3Props } from './ThermostatDialV3';

export { LightControl } from './LightControl';
export type { LightControlProps } from './LightControl';
export { LightControlV2 } from './LightControlV2';
export type { LightControlV2Props } from './LightControlV2';
export { LightControlV3 } from './LightControlV3';
export type { LightControlV3Props } from './LightControlV3';

export { SceneCard } from './SceneCard';
export type { SceneCardProps } from './SceneCard';
export { SceneCardV2 } from './SceneCardV2';
export type { SceneCardV2Props } from './SceneCardV2';
export { SceneCardV3 } from './SceneCardV3';
export type { SceneCardV3Props } from './SceneCardV3';

export { SensorReading } from './SensorReading';
export type { SensorReadingProps, SensorStatus } from './SensorReading';

export { AutomationRule } from './AutomationRule';
export type { AutomationRuleProps } from './AutomationRule';

export { EnergyUsage } from './EnergyUsage';
export type { EnergyUsageProps } from './EnergyUsage';

export { CameraTile } from './CameraTile';
export type { CameraTileProps } from './CameraTile';

export { LockControl } from './LockControl';
export type { LockControlProps, LockState } from './LockControl';

export { RoomGroup } from './RoomGroup';
export type { RoomGroupProps, RoomDevice } from './RoomGroup';

export { DeviceToggleRow } from './DeviceToggleRow';
export type { DeviceToggleRowProps } from './DeviceToggleRow';

export { ScheduleRow } from './ScheduleRow';
export type { ScheduleRowProps } from './ScheduleRow';
