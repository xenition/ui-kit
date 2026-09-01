import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
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
export const DeviceToggleRowV4 = React.forwardRef<HTMLDivElement, DeviceToggleRowV4Props>(
  function DeviceToggleRowV4(
    {
      label,
      icon,
      subtitle,
      checked = false,
      offline = false,
      onCheckedChange,
      onChange,
      last = false,
      className,
      style,
      ...rest
    },
    ref
  ) {
    const secondary = offline ? 'Offline' : subtitle;
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onCheckedChange ?? onChange;
    const isOn = checked && !offline;

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          'flex min-h-11 items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
          isOn ? 'bg-primary/[0.08]' : 'bg-surface',
          !last && 'border-b border-border',
          offline && 'opacity-70',
          className
        )}
        {...rest}
      >
        {/* Glowing glyph disc — the ambient signature. */}
        {icon != null ? (
          <span
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border',
              isOn ? 'border-primary/40 bg-primary/15 shadow-sm' : 'border-border bg-on-surface/5'
            )}
          >
            <Icon glyph={icon} color={isOn ? 'primary' : 'muted'} size="lg" />
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-on-surface">{label}</p>
          {secondary != null ? <p className="truncate text-xs text-muted">{secondary}</p> : null}
        </div>
        <Switch checked={checked} disabled={offline} onCheckedChange={emit} aria-label={label} />
      </div>
    );
  }
);
