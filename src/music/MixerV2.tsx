import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce/EmptyState';
import { VolumeFader } from './VolumeFader';
import type { MixerProps } from './Mixer';

/** Same public contract as {@link Mixer} — a drop-in alternate design. */
export type MixerV2Props = MixerProps;

/**
 * Mixer, redesigned (v2): a **console of channel tiles**. Each strip is its own
 * bordered card in a responsive two-column grid — name header, a labelled fader,
 * and pill Mute/Solo toggles — rather than v1's flat stack. Elevated feel. Same
 * props, token-only.
 */
export const MixerV2 = React.forwardRef<HTMLDivElement, MixerV2Props>(function MixerV2(
  { channels, variant = 'full', title, emptyLabel = 'No channels', onVolumeChange, onToggleMute, onToggleSolo, className, ...rest },
  ref
) {
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
    <div ref={ref} className={cn('flex flex-col gap-3', className)} {...rest}>
      {title ? (
        <p role="heading" aria-level={3} className="text-base font-bold text-on-surface">
          {title}
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-2">
        {channels.map((ch) => (
          <div key={ch.id} className="flex flex-col gap-2 rounded-lg bg-surface p-3 shadow-sm">
            <p className="truncate text-xs font-semibold text-on-surface">{ch.name}</p>
            <VolumeFader
              label={ch.name}
              value={ch.volume}
              muted={ch.muted}
              variant="bare"
              onValueChange={(v) => onVolumeChange?.(ch, v)}
            />
            <div className="flex gap-1.5">
              <button
                type="button"
                aria-pressed={ch.muted === true}
                aria-label={`${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`}
                onClick={() => onToggleMute?.(ch)}
                className={cn(
                  'flex-1 rounded-md border px-2 py-1 text-xs font-bold transition-colors',
                  ch.muted ? 'border-warn bg-warn/20 text-warn' : 'border-border text-muted hover:bg-neutral-50'
                )}
              >
                M
              </button>
              {variant === 'full' ? (
                <button
                  type="button"
                  aria-pressed={ch.soloed === true}
                  aria-label={`${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`}
                  onClick={() => onToggleSolo?.(ch)}
                  className={cn(
                    'flex-1 rounded-md border px-2 py-1 text-xs font-bold transition-colors',
                    ch.soloed ? 'border-primary bg-primary/20 text-primary' : 'border-border text-muted hover:bg-neutral-50'
                  )}
                >
                  S
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
