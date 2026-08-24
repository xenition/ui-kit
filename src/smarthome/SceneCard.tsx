import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge } from '../primitives/Badge';

export interface SceneCardProps {
  /** Scene name (e.g. "Movie Night", "Good Morning"). */
  name: string;
  /** Leading glyph/emoji (e.g. "🎬", "🌅"). */
  icon?: string;
  /** Short description of what the scene does. */
  description?: string;
  /** Number of devices the scene controls. */
  deviceCount?: number;
  /** Whether this scene is currently active. */
  active?: boolean;
  /** Fires when the card is clicked to run the scene. */
  onActivate?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A clickable scene / preset card — glyph, name, description and a device count.
 * When `active`, the card elevates, tints the glyph with `primary`, and shows an
 * "Active" {@link Badge} so the running state is labeled, not color-only. The
 * card is a `role="button"` surface firing `onActivate` on click / Enter / Space.
 * `deviceCount` is rendered defensively (only when a positive number).
 * Token-bound throughout — no literal colors.
 */
export const SceneCard = React.forwardRef<HTMLDivElement, SceneCardProps>(function SceneCard(
  { name, icon = '✨', description, deviceCount, active = false, onActivate, className, style },
  ref
) {
  const count = typeof deviceCount === 'number' && deviceCount > 0 ? deviceCount : 0;

  return (
    <Card
      ref={ref}
      style={style}
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
        'cursor-pointer transition-shadow hover:shadow-md',
        active ? 'border-primary shadow-md' : 'shadow-sm',
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)] border bg-surface',
            active ? 'border-primary' : 'border-border'
          )}
        >
          <Icon glyph={icon} color={active ? 'primary' : 'onSurface'} size="xl" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <span className="min-w-0 shrink truncate text-base font-semibold text-on-surface">{name}</span>
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
