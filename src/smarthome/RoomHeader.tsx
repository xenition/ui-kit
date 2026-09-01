import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

export interface RoomHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The room's display name — the hero headline (e.g. "Living Room"). */
  roomName: string;
  /** Optional emoji/glyph for the room, shown as a frosted disc (e.g. "🛋️"). */
  glyph?: string;
  /** Optional current temperature, already formatted (e.g. "71°"). */
  temperature?: string;
  /** Optional current humidity, already formatted (e.g. "44%"). */
  humidity?: string;
  /** Optional count of devices currently on in the room. */
  devicesOn?: number;
  /** Optional total device count in the room (paired with `devicesOn`). */
  deviceCount?: number;
  /** When set, the all-off control shows; fires when the user turns everything off. */
  onAllOff?: () => void;
  /** When set, the all-on control shows; fires when the user turns everything on. */
  onAllOn?: () => void;
  /**
   * Optional lights state, driving which combined control is emphasised:
   * `true` → offer "All off", `false` → offer "All on". When omitted, both
   * provided controls render.
   */
  lightsOn?: boolean;
}

/**
 * RoomHeader — a room **hero** for the smart-home module (web parity of the
 * native twin). A brand-gradient ground carries an optional frosted glyph disc,
 * a big near-white room name, climate + devices-on frosted tiles, and an
 * all-off / all-on control. When `lightsOn` is set it picks the more useful
 * single control (on → "All off", off → "All on"); otherwise both provided
 * controls render. Every color derives from the brand ramp — gradient
 * `from-primary-500 to-primary-700`, ink `text-primary-50/100`, frosted tiles
 * `bg-primary-50/15` + `border-primary-50/30` — token-only, no literals, light +
 * dark. Presentational: shaped data + callbacks, nothing fetches.
 */
export const RoomHeader = React.forwardRef<HTMLDivElement, RoomHeaderProps>(function RoomHeader(
  { roomName, glyph, temperature, humidity, devicesOn, deviceCount, onAllOff, onAllOn, lightsOn, className, ...rest },
  ref
) {
  const tiles: { label: string; value: string }[] = [];
  if (temperature != null) tiles.push({ label: 'Temperature', value: temperature });
  if (humidity != null) tiles.push({ label: 'Humidity', value: humidity });
  if (devicesOn != null) {
    tiles.push({
      label: 'Devices on',
      value: deviceCount != null ? `${devicesOn} / ${deviceCount}` : String(devicesOn),
    });
  }

  // Which controls to render — respect `lightsOn` to emphasise the useful one.
  const showAllOff = onAllOff != null && (lightsOn === undefined || lightsOn === true);
  const showAllOn = onAllOn != null && (lightsOn === undefined || lightsOn === false);

  const controlClass =
    'inline-flex min-h-[44px] flex-1 items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300';

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        {glyph ? (
          <span
            role="img"
            aria-hidden
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30"
          >
            <Icon glyph={glyph} size="xl" aria-hidden />
          </span>
        ) : null}
        <p className="min-w-0 flex-1 truncate text-3xl font-extrabold tracking-tight text-primary-50">{roomName}</p>
      </div>

      {tiles.length > 0 ? (
        <div className="mt-[var(--xen-space-lg)] flex flex-wrap gap-[var(--xen-space-sm)]">
          {tiles.map((t) => (
            <div
              key={t.label}
              className="flex min-w-[104px] flex-1 flex-col justify-center rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]"
            >
              <p className="truncate text-lg font-bold text-primary-50">{t.value}</p>
              <p className="truncate text-xs text-primary-100">{t.label}</p>
            </div>
          ))}
        </div>
      ) : null}

      {showAllOff || showAllOn ? (
        <div className="mt-[var(--xen-space-md)] flex gap-[var(--xen-space-sm)]">
          {showAllOff ? (
            <button type="button" aria-label="Turn all off" onClick={onAllOff} className={controlClass}>
              <Icon glyph="⏻" size="sm" aria-hidden />
              All off
            </button>
          ) : null}
          {showAllOn ? (
            <button type="button" aria-label="Turn all on" onClick={onAllOn} className={controlClass}>
              <Icon glyph="💡" size="sm" aria-hidden />
              All on
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
