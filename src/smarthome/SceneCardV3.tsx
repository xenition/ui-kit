import * as React from 'react';
import { cn } from '../primitives/cn';
import type { SceneCardProps } from './SceneCard';

/** Same public contract as {@link SceneCard} — a drop-in alternate design. */
export type SceneCardV3Props = SceneCardProps;

/**
 * SceneCard, redesigned (v3): a **compact scene row**. A leading icon, the name
 * over a description·device-count line, and an "Active" dot + word on the trailing
 * edge — hairline-bordered for a scenes list. Tapping runs the scene. The
 * opposite of v2's tile. Same props, token-only.
 */
export const SceneCardV3 = React.forwardRef<HTMLButtonElement, SceneCardV3Props>(function SceneCardV3(
  { name, icon = '🎬', description, deviceCount, active = false, onActivate, className, style },
  ref
) {
  const sub = [description, typeof deviceCount === 'number' ? `${deviceCount} devices` : null].filter((s): s is string => !!s).join(' · ');

  return (
    <button
      ref={ref}
      type="button"
      data-xen-scene-card=""
      aria-pressed={active}
      aria-label={`Run scene ${name}${active ? ', active' : ''}`}
      onClick={onActivate}
      style={style}
      className={cn('flex w-full items-center gap-3 border-b border-border py-2.5 text-left transition-colors hover:bg-neutral-50', className)}
    >
      <span className="text-lg leading-none">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
      </div>
      {active ? (
        <span className="flex items-center gap-1 text-xs font-semibold text-accent">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden /> Active
        </span>
      ) : null}
    </button>
  );
});
