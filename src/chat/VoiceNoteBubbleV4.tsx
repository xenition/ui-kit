import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChatBubbleV4 } from '../primitives/ChatBubbleV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { clock } from './internal/thread-v4';
import type { VoiceNoteBubbleProps } from './VoiceNoteBubble';

export interface VoiceNoteBubbleV4Props extends VoiceNoteBubbleProps {
  /** Copy on the transport, by state. */
  playLabel?: string;
  pauseLabel?: string;
  /** Build the spoken position. Default `'0:12 of 0:42'`. */
  formatPosition?: (elapsed: string, total: string) => string;
}

/** A default waveform, when the caller has no samples. Geometric. */
const DEFAULT_WAVE = [0.3, 0.6, 0.4, 0.8, 0.5, 0.9, 0.4, 0.7, 0.35, 0.6, 0.45, 0.8];

/** How solid an unplayed bar sits against a played one. */
const UNPLAYED_ALPHA = '45%';

/**
 * **V4 voice note bubble** — the web twin of the native `VoiceNoteBubbleV4`,
 * same props as {@link VoiceNoteBubble} plus `playLabel`, `pauseLabel` and
 * `formatPosition`.
 *
 * ## Four changes
 *
 * 1. **It reports its position.** The base painted the waveform with
 *    `progress` and announced only "Voice message, 0:42" — so a sighted user
 *    could see how far through they were and a screen-reader user could not.
 *    The bubble is now a `progressbar` carrying elapsed and total, and the
 *    elapsed time is drawn beside the duration.
 * 2. **The transport clears 44.** It was a bare glyph button.
 * 3. **Unplayed bars are a translucent wash of the *same* ink**, not an
 *    `opacity` on the element — 0.38 is the band that means disabled, and an
 *    unplayed second is not disabled.
 * 4. **The waveform is hidden from the reader.** Twelve unlabelled bars are
 *    twelve stops on a tab-through; the bubble's own value carries it.
 */
export const VoiceNoteBubbleV4 = React.forwardRef<HTMLDivElement, VoiceNoteBubbleV4Props>(
  function VoiceNoteBubbleV4(
    {
      side = 'them',
      durationSec,
      playing = false,
      progress = 0,
      waveform,
      meta,
      playLabel = 'Play',
      pauseLabel = 'Pause',
      formatPosition,
      onPlayToggle,
      className,
    },
    ref
  ) {
    const me = side === 'me';
    const bars = waveform && waveform.length > 0 ? waveform : DEFAULT_WAVE;
    const clamped = Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0));

    const total = clock(durationSec);
    const elapsed = clock(durationSec * clamped);
    const position = (formatPosition ?? ((e: string, t: string) => `${e} of ${t}`))(elapsed, total);

    // The bubble's own ink, so the waveform never falls to a fixed grey.
    const ink = me ? 'var(--xen-color-on-primary)' : 'var(--xen-color-on-card)';

    return (
      <ChatBubbleV4 ref={ref} side={side} meta={meta} className={className}>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(clamped * 100)}
          aria-label={`Voice message, ${position}`}
          className="flex min-w-[12rem] items-center gap-sm"
        >
          <button
            type="button"
            aria-label={playing ? pauseLabel : playLabel}
            aria-pressed={playing}
            onClick={onPlayToggle}
            data-xen-v4-chrome="on-primary"
            className={cn(
              'inline-flex aspect-square shrink-0 items-center justify-center rounded-full text-lg',
              MIN_TAP_CLASS
            )}
            style={{ color: ink }}
          >
            {playing ? '⏸' : '▶'}
          </button>

          {/* Twelve unlabelled bars are twelve stops on a tab-through. */}
          <span aria-hidden className="flex h-lg flex-1 items-center gap-[2px]">
            {bars.map((h, i) => {
              const played = i / bars.length <= clamped;
              return (
                <span
                  key={i}
                  className="flex-1 rounded-full"
                  style={{
                    height: `max(2px, ${Math.round(h * 100)}%)`,
                    background: played
                      ? ink
                      : `color-mix(in srgb, ${ink} ${UNPLAYED_ALPHA}, transparent)`,
                  }}
                />
              );
            })}
          </span>

          <span className="shrink-0 text-xs tabular-nums" style={{ color: ink }}>
            {clamped > 0 ? `${elapsed} / ${total}` : total}
          </span>
        </div>
      </ChatBubbleV4>
    );
  }
);
