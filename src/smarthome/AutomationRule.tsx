import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';

export interface AutomationRuleProps {
  /** Rule name (e.g. "Lights off at sunset"). */
  name: string;
  /** Human "when" clause (e.g. "When sunset"). */
  trigger?: string;
  /** Human "then" clause (e.g. "Turn off all lights"). */
  action?: string;
  /** Leading glyph/emoji. Default "⚙️". */
  icon?: string;
  /** Whether the rule is enabled. */
  enabled?: boolean;
  /** Rule references an unreachable device — disables the toggle. */
  offline?: boolean;
  /** Fires with the requested enabled value. */
  onToggle?: (next: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * An automation rule row — name plus a "when → then" trigger/action summary and
 * an enable {@link Switch}. Enabled rules tint the glyph with `primary`; disabled
 * or `offline` rules fall back to `muted`, and a text `On`/`Off`/`Offline` label
 * carries the state independent of color. The trigger and action clauses join
 * with a token-colored arrow. `offline` blocks toggling. No literal colors.
 */
export const AutomationRule = React.forwardRef<HTMLDivElement, AutomationRuleProps>(
  function AutomationRule({ name, trigger, action, icon = '⚙️', enabled = false, offline = false, onToggle, className, style }, ref) {
    const active = enabled && !offline;
    const statusLabel = offline ? 'Offline' : enabled ? 'On' : 'Off';

    return (
      <Card ref={ref} style={style} className={cn(offline && 'opacity-70', className)}>
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-md)] border bg-surface',
              active ? 'border-primary' : 'border-border'
            )}
          >
            <Icon glyph={icon} color={active ? 'primary' : 'muted'} size="lg" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-on-surface">{name}</p>
            <p className="text-xs text-muted">{statusLabel}</p>
          </div>
          <Switch checked={enabled} disabled={offline} onCheckedChange={onToggle} aria-label={`${name} enabled`} />
        </div>

        {trigger != null || action != null ? (
          <div className="mt-[var(--xen-space-sm)] flex flex-wrap items-center gap-1">
            {trigger != null ? <span className="text-xs text-on-surface">{trigger}</span> : null}
            {trigger != null && action != null ? <span className="text-xs font-bold text-primary">→</span> : null}
            {action != null ? <span className="text-xs text-muted">{action}</span> : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
