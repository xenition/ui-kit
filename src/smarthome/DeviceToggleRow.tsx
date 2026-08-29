import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';

export interface DeviceToggleRowProps {
  /** Device / entity label. */
  label: string;
  /** Leading glyph/emoji. */
  icon?: string;
  /** Secondary line (e.g. "Dimmable · 60%"). */
  subtitle?: string;
  /** Whether the device is on. */
  checked?: boolean;
  /** Device is unreachable — disables the switch and shows an offline label. */
  offline?: boolean;
  /**
   * Fires with the requested on/off value. Prefer `onChange` — that is the
   * kit's one canonical name for "the value changed". `onCheckedChange` is this
   * component's original spelling, kept so existing callers keep working; if
   * both are passed this one wins.
   */
  onCheckedChange?: (next: boolean) => void;
  /** Canonical spelling of `onCheckedChange` (see it for the precedence rule). */
  onChange?: (next: boolean) => void;
  /** Hide the bottom divider (e.g. last row in a group). */
  last?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A compact list row with a trailing on/off {@link Switch} — the building block
 * of {@link RoomGroup}. Renders a glyph, label, and optional subtitle; when
 * `offline` the switch is disabled and the subtitle is replaced by a muted
 * "Offline" note so unreachability is textual, not color-only. A hairline
 * `border` divider separates rows unless `last`. Token-bound throughout (no
 * literal colors).
 */
export const DeviceToggleRow = React.forwardRef<HTMLDivElement, DeviceToggleRowProps>(
  function DeviceToggleRow(
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
    },
    ref
  ) {
    const secondary = offline ? 'Offline' : subtitle;
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onCheckedChange ?? onChange;

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
          !last && 'border-b border-border',
          offline && 'opacity-70',
          className
        )}
      >
        {icon != null ? <Icon glyph={icon} color={checked && !offline ? 'primary' : 'muted'} size="lg" /> : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-on-surface">{label}</p>
          {secondary != null ? <p className="truncate text-xs text-muted">{secondary}</p> : null}
        </div>
        <Switch checked={checked} disabled={offline} onCheckedChange={emit} aria-label={label} />
      </div>
    );
  }
);
