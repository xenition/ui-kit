import * as React from 'react';
import { cn } from '../primitives/cn';
import type { SceneCardProps } from './SceneCard';

/** Same public contract as {@link SceneCard} — a drop-in alternate design. */
export type SceneCardV2Props = SceneCardProps;

/**
 * SceneCard, redesigned (v2): a **bold scene tile**. A large icon in an accent
 * disc, the name and description centered, and a device-count footer; the active
 * scene fills with an accent ring + tint. Tapping runs the scene. Distinct from
 * v1's row. Same props, token-only.
 */
export const SceneCardV2 = React.forwardRef<HTMLButtonElement, SceneCardV2Props>(function SceneCardV2(
  { name, icon = '🎬', description, deviceCount, active = false, onActivate, className, style },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      data-xen-scene-card=""
      aria-pressed={active}
      aria-label={`Run scene ${name}${active ? ', active' : ''}`}
      onClick={onActivate}
      style={style}
      className={cn(
        'flex flex-col items-center gap-2 rounded-lg bg-surface p-4 text-center shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        active && 'bg-accent/10 ring-2 ring-accent',
        className
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl">{icon}</span>
      <div>
        <p className="text-sm font-bold text-on-surface">{name}</p>
        {description ? <p className="text-xs text-muted">{description}</p> : null}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted">
        {typeof deviceCount === 'number' ? <span>{deviceCount} devices</span> : null}
        {active ? <span className="font-semibold text-accent">· Active</span> : null}
      </div>
    </button>
  );
});
