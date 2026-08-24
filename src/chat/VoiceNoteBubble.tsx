import * as React from 'react';
import { cn } from '../primitives/cn';
import { ChatBubble } from '../primitives';

export interface VoiceNoteBubbleProps {
  /** `me` aligns right on the primary fill; `them` aligns left on a surface fill. */
  side?: 'me' | 'them';
  /** Total clip length in seconds. */
  durationSec: number;
  /** Whether the clip is currently playing (controlled). */
  playing?: boolean;
  /** Playback progress 0–1 (drives the waveform fill). */
  progress?: number;
  /** Normalized waveform samples 0–1; a default pattern is used when omitted. */
  waveform?: number[];
  /** Optional meta (author / time) shown above the bubble. */
  meta?: React.ReactNode;
  /** Toggle play/pause. */
  onPlayToggle?: () => void;
  className?: string;
}

const DEFAULT_WAVE = [0.3, 0.6, 0.9, 0.5, 0.7, 1, 0.4, 0.8, 0.5, 0.6, 0.35, 0.7, 0.9, 0.5, 0.3];

function fmt(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}

/**
 * Voice-message bubble — a play/pause control, a waveform whose fill reflects
 * `progress`, and a duration readout, wrapped in the primitive `ChatBubble` so
 * it shares alignment and theming with text messages. Colors adapt to the
 * `me`/`them` side (onPrimary vs. onSurface). No literal colors.
 */
export const VoiceNoteBubble = React.forwardRef<HTMLDivElement, VoiceNoteBubbleProps>(
  function VoiceNoteBubble(
    { side = 'them', durationSec, playing = false, progress = 0, waveform, meta, onPlayToggle, className },
    ref
  ) {
    const me = side === 'me';
    const fgClass = me ? 'text-on-primary' : 'text-on-surface';
    const barClass = me ? 'bg-on-primary' : 'bg-on-surface';
    const bars = waveform && waveform.length > 0 ? waveform : DEFAULT_WAVE;
    const clamped = Math.min(1, Math.max(0, progress));

    return (
      <ChatBubble ref={ref} side={side} meta={meta} className={className}>
        <div
          aria-label={`Voice message, ${fmt(durationSec)}`}
          className={cn('flex items-center gap-2', fgClass)}
          style={{ minWidth: 160 }}
        >
          <button
            type="button"
            aria-pressed={playing}
            aria-label={playing ? 'Pause voice message' : 'Play voice message'}
            onClick={onPlayToggle}
            className={cn('text-lg leading-none focus-visible:outline-none', fgClass)}
          >
            {playing ? '⏸' : '▶'}
          </button>
          <div className="flex flex-1 items-center gap-0.5" style={{ height: 24 }}>
            {bars.map((h, i) => {
              const filled = i / bars.length <= clamped;
              return (
                <span
                  key={i}
                  className={cn('flex-1 rounded-full', barClass, filled ? 'opacity-100' : 'opacity-40')}
                  style={{ height: Math.max(3, h * 24) }}
                />
              );
            })}
          </div>
          <span className={cn('text-xs opacity-90', fgClass)}>{fmt(durationSec)}</span>
        </div>
      </ChatBubble>
    );
  }
);
