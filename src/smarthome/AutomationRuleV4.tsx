import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
import type { AutomationRuleProps } from './AutomationRule';

/** Drop-in for {@link AutomationRuleProps} — same props, the V4 "ambient" design. */
export type AutomationRuleV4Props = AutomationRuleProps;

/**
 * AutomationRule — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on an automation row: an **enabled rule glows** — when
 * active the card takes a soft `primary`-tinted wash, a primary border, and a
 * glowing icon disc; disabled or `offline` rules stay calm and muted. The
 * "when → then" clause reads as a trigger glyph → action glyph line, and a text
 * `On`/`Off`/`Offline` label carries the state independent of color. The enable
 * {@link Switch} is blocked while `offline`. Same props/behavior as
 * {@link AutomationRuleProps}; all colors from `--xen-*` token classes (no literals).
 */
export const AutomationRuleV4 = React.forwardRef<HTMLDivElement, AutomationRuleV4Props>(
  function AutomationRuleV4({ name, trigger, action, icon = '⚙️', enabled = false, offline = false, onToggle, className, style }, ref) {
    const active = enabled && !offline;
    const statusLabel = offline ? 'Offline' : enabled ? 'On' : 'Off';

    return (
      <Card
        ref={ref}
        style={style}
        className={cn(
          'rounded-[var(--xen-radius-lg)] border',
          active ? 'border-primary/50 bg-primary/[0.08] shadow-md' : 'border-border bg-surface shadow-sm',
          offline && 'opacity-70',
          className
        )}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          {/* Glowing icon disc — the ambient signature. */}
          <span
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border',
              active ? 'border-primary/40 bg-primary/15' : 'border-border bg-on-surface/5'
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
            {trigger != null && action != null ? (
              <span className={cn('text-xs font-bold', active ? 'text-primary' : 'text-muted')}>→</span>
            ) : null}
            {action != null ? <span className="text-xs text-muted">{action}</span> : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
