import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_TEXT, TONE_SOFT, TONE_SOLID } from './internal';
import type { StatusPillProps } from './StatusPill';

/** Drop-in for {@link StatusPillProps} — same props, the V4 "register" design. */
export type StatusPillV4Props = StatusPillProps;

/**
 * StatusPill — **V4** "register" design (web parity of the native V4). A refined,
 * tactile status chip: the same **glyph + word** contract (state never by color
 * alone), rendered as a crisp soft-tint rounded pill with a touch more presence —
 * slightly bolder label, a hair more padding for legibility at the counter. Color
 * always resolves from a `--xen-*` token class for the base's tone. `inline`
 * drops the pill chrome for dense rows; `solid` fills. Same props/behavior as
 * {@link StatusPillProps} (tones + sizes preserved); no literals.
 */
export const StatusPillV4 = React.forwardRef<HTMLSpanElement, StatusPillV4Props>(
  function StatusPillV4({ meta, variant = 'soft', size = 'md', className, ...rest }, ref) {
    const inline = variant === 'inline';
    const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
    const toneClass = inline
      ? TONE_TEXT[meta.tone]
      : variant === 'solid'
        ? TONE_SOLID[meta.tone]
        : TONE_SOFT[meta.tone];

    return (
      <span
        ref={ref}
        aria-label={meta.label}
        data-xen-status-pill=""
        className={cn(
          'inline-flex items-center gap-1 font-bold tracking-tight',
          textSize,
          inline ? '' : cn('rounded-full', size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1'),
          toneClass,
          className
        )}
        {...rest}
      >
        <span aria-hidden="true">{meta.glyph}</span>
        <span>{meta.label}</span>
      </span>
    );
  }
);
