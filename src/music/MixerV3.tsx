import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce/EmptyState';
import { VolumeFader } from './VolumeFader';
import type { MixerProps } from './Mixer';

/** Same public contract as {@link Mixer} — a drop-in alternate design. */
export type MixerV3Props = MixerProps;

/**
 * Mixer, redesigned (v3): a **compact fader list**. Each channel is one thin row
 * — name on the left, a bare inline fader filling the middle, and a small mute
 * dot toggle on the right — for embedding many strips in a tight panel. The
 * opposite of v2's tile grid. Same props, token-only.
 */
export const MixerV3 = React.forwardRef<HTMLDivElement, MixerV3Props>(function MixerV3(
  { channels, variant, title, emptyLabel = 'No channels', onVolumeChange, onToggleMute, onToggleSolo, className, ...rest },
  ref
) {
  void variant;
  void onToggleSolo;

  if (channels.length === 0) {
    return (
      <EmptyState
        ref={ref}
        icon={<Icon glyph="🎚️" size="2xl" color="muted" aria-label="Mixer" />}
        title={emptyLabel}
        className={className}
        {...rest}
      />
    );
  }

  return (
    <div ref={ref} className={cn('flex flex-col', className)} {...rest}>
      {title ? (
        <p role="heading" aria-level={3} className="mb-1 text-sm font-bold text-on-surface">
          {title}
        </p>
      ) : null}
      {channels.map((ch) => (
        <div key={ch.id} className="flex items-center gap-3 border-b border-border py-1.5">
          <span className="w-16 shrink-0 truncate text-xs font-medium text-on-surface">{ch.name}</span>
          <div className="min-w-0 flex-1">
            <VolumeFader
              label={ch.name}
              value={ch.volume}
              muted={ch.muted}
              variant="bare"
              onValueChange={(v) => onVolumeChange?.(ch, v)}
            />
          </div>
          <button
            type="button"
            aria-pressed={ch.muted === true}
            aria-label={`${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`}
            onClick={() => onToggleMute?.(ch)}
            className={cn(
              'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
              ch.muted ? 'border-warn bg-warn/20 text-warn' : 'border-border text-muted'
            )}
          >
            M
          </button>
        </div>
      ))}
    </div>
  );
});
