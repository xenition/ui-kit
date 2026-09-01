import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce/EmptyState';
import { VolumeFaderV4 } from './VolumeFaderV4';
import {
  clamp,
  padAccentKey,
  ACCENT_BORDER_CLASS,
  ACCENT_BG_CLASS,
  ACCENT_TEXT_CLASS,
  ACCENT_STRONG_BG_CLASS,
  type AccentSlot,
} from './types';
import type { MixerProps } from './Mixer';

/** Drop-in for {@link MixerProps} — same props, the V4 "session" design. */
export type MixerV4Props = MixerProps;

/**
 * Mixer — **V4** "session" design (web parity of the native V4). The tactile DAW
 * take on a channel mixer: each `MixerChannel` becomes a rounded control surface
 * (`bg-surface` + `border`) housing a `VolumeFaderV4`, a mute toggle, and (in
 * `full`) a solo toggle plus a token-well level meter. Every strip keeps its
 * **channel accent** — cycled through the module's semantic slots via
 * `padAccentKey` and applied only through the `ACCENT_*` token classes (never a
 * literal). Armed / mute / solo states light with a soft-token fill *and* a
 * glyph/label marker (never color alone), surfaced in `aria-pressed` + label.
 * Honors both `variant`s (`full` / `compact`), identical props/behavior to
 * {@link MixerProps}. Renders an `EmptyState` when there are no channels.
 * Token-only styling.
 */
export const MixerV4 = React.forwardRef<HTMLDivElement, MixerV4Props>(function MixerV4(
  {
    channels,
    variant = 'full',
    title,
    emptyLabel = 'No channels',
    onVolumeChange,
    onToggleMute,
    onToggleSolo,
    className,
    ...rest
  },
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
    <Card ref={ref} className={cn('flex flex-col gap-[var(--xen-space-md)]', className)} {...rest}>
      {title ? (
        <p role="heading" aria-level={3} className="text-base font-bold text-on-surface">
          {title}
        </p>
      ) : null}
      {channels.map((ch, index) => {
        // The channel accent — cycled through the module's semantic slots, so it
        // always traces to a token class (never a literal color).
        const accent = padAccentKey(index);
        const armed = ch.armed === true;
        return (
          <div
            key={ch.id}
            className={cn(
              'flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border bg-surface p-[var(--xen-space-sm)] transition-colors',
              armed ? ACCENT_BORDER_CLASS[accent] : 'border-border'
            )}
          >
            <div className="flex items-center gap-[var(--xen-space-xs)]">
              {/* Accent dot marks the channel's color (a marker, never color alone). */}
              <span aria-hidden="true" className={cn('h-2 w-2 shrink-0 rounded-full', ACCENT_BG_CLASS[accent])} />
              {armed ? (
                <span className={cn('inline-flex items-center gap-1 text-xs font-bold', ACCENT_TEXT_CLASS[accent])}>
                  <Icon glyph="●" size="xs" color="danger" aria-label="Record armed" />
                  ARM
                </span>
              ) : null}
            </div>
            <VolumeFaderV4
              label={ch.name}
              value={ch.volume}
              muted={ch.muted}
              onValueChange={(v) => onVolumeChange?.(ch, v)}
            />
            {variant === 'full' ? <Meter level={ch.level} muted={ch.muted} accent={accent} /> : null}
            <div className="flex gap-[var(--xen-space-xs)]">
              <StripToggle
                label="M"
                glyph="🔇"
                a11y={`${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`}
                active={ch.muted === true}
                activeClass="border-warn bg-warn/20 text-warn"
                onClick={() => onToggleMute?.(ch)}
              />
              {variant === 'full' ? (
                <StripToggle
                  label="S"
                  glyph="◎"
                  a11y={`${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`}
                  active={ch.soloed === true}
                  activeClass={cn(ACCENT_BORDER_CLASS[accent], ACCENT_STRONG_BG_CLASS[accent], ACCENT_TEXT_CLASS[accent])}
                  onClick={() => onToggleSolo?.(ch)}
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </Card>
  );
});

function Meter({
  level,
  muted,
  accent,
}: {
  level?: number;
  muted?: boolean;
  accent: AccentSlot;
}): React.ReactElement {
  const pct = muted ? 0 : clamp((level ?? 0) * 100, 0, 100);
  // The channel accent tints the meter fill (token class only); overloads still
  // warn/danger so a hot signal is never signalled by color alone below.
  const tone = pct > 85 ? 'bg-danger' : pct > 60 ? 'bg-warn' : ACCENT_BG_CLASS[accent];
  return (
    <div
      role="img"
      aria-label={`Output level ${Math.round(pct)} percent`}
      className="h-1 overflow-hidden rounded-full bg-primary/15"
    >
      <div className={cn('h-full', tone)} style={{ width: `${pct}%` }} />
    </div>
  );
}

function StripToggle({
  label,
  glyph,
  a11y,
  active,
  activeClass,
  onClick,
}: {
  label: string;
  glyph: string;
  a11y: string;
  active: boolean;
  activeClass: string;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={a11y}
      onClick={onClick}
      className={cn(
        'inline-flex min-w-[44px] items-center justify-center gap-1 rounded-[var(--xen-radius-sm)] border px-[var(--xen-space-sm)] py-1 text-center text-xs font-bold tabular-nums transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        active ? activeClass : 'border-border bg-transparent text-muted hover:opacity-80'
      )}
    >
      {/* Glyph marker so the armed state never reads by color alone. */}
      {active ? <span aria-hidden="true">{glyph}</span> : null}
      {label}
    </button>
  );
}
