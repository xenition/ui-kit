import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge } from '../primitives/Badge';
import type { SceneCardProps } from './SceneCard';

/** Drop-in for {@link SceneCardProps} — same props, the V4 "ambient" design. */
export type SceneCardV4Props = SceneCardProps;

/**
 * SceneCard — **V4** "ambient" design (web parity of the native V4). A calm scene
 * tile: a glyph sits in a tinted disc, with the scene name, an optional
 * description, and a device count. When `active`, the whole card glows — a soft
 * primary-tinted wash (`bg-primary/[0.08]`), a primary border, and a glowing glyph
 * disc (`bg-primary/15 border-primary/40`) — plus an "Active" {@link Badge} so the
 * running state is labeled, not color-only. The card is a `role="button"` surface
 * firing `onActivate` on click / Enter / Space. `deviceCount` renders defensively
 * (only when a positive number). Same props/behavior as {@link SceneCardProps};
 * all colors from `--xen-*` token classes (no literals).
 */
export const SceneCardV4 = React.forwardRef<HTMLDivElement, SceneCardV4Props>(function SceneCardV4(
  { name, icon = '✨', description, deviceCount, active = false, onActivate, className, style },
  ref
) {
  const count = typeof deviceCount === 'number' && deviceCount > 0 ? deviceCount : 0;

  return (
    <Card
      ref={ref}
      style={style}
      variant="flat"
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`${name} scene${active ? ', active' : ''}`}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate?.();
        }
      }}
      className={cn(
        'cursor-pointer border transition-shadow',
        active
          ? 'border-primary/50 bg-primary/[0.08] shadow-md'
          : 'border-border bg-surface shadow-sm hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        {/* Glowing glyph disc — the ambient signature. */}
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border',
            active ? 'border-primary/40 bg-primary/15' : 'border-border bg-on-surface/5'
          )}
        >
          <Icon glyph={icon} color={active ? 'primary' : 'onSurface'} size="xl" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <span className="min-w-0 shrink truncate text-base font-bold text-on-surface">{name}</span>
            {active ? <Badge tone="primary">Active</Badge> : null}
          </div>
          {description != null ? <p className="mt-0.5 line-clamp-2 text-xs text-muted">{description}</p> : null}
          {count > 0 ? (
            <p className="mt-0.5 text-xs text-muted">{`${count} ${count === 1 ? 'device' : 'devices'}`}</p>
          ) : null}
        </div>
      </div>
    </Card>
  );
});
