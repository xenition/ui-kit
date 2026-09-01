import * as React from 'react';
import { cn } from '../primitives/cn';
import { parseMentions } from './MentionText';
import type { MentionTextProps, MentionColor } from './MentionText';

/** Drop-in for {@link MentionTextProps} — same props, the V4 "feed" design. */
export type MentionTextV4Props = MentionTextProps;

const COLOR_CLASS: Record<MentionColor, string> = {
  surface: 'text-surface',
  onSurface: 'text-on-surface',
  primary: 'text-primary',
  onPrimary: 'text-on-primary',
  accent: 'text-accent',
  onAccent: 'text-on-accent',
  muted: 'text-muted',
  border: 'text-border',
  success: 'text-success',
  onSuccess: 'text-on-success',
  warn: 'text-warn',
  onWarn: 'text-on-warn',
  danger: 'text-danger',
  onDanger: 'text-on-danger',
};

const SIZE_CLASS = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
} as const;

/**
 * MentionText — **V4** "feed" design (web parity of the native V4). The clean,
 * airy mention-aware body: `@mentions` and `#hashtags` render in **primary**
 * and become tappable, everything else in the on-surface base color. Reuses the
 * shared {@link parseMentions} splitter. Same props/behavior as
 * {@link MentionTextProps}; token-only, no literal colors. Mentions/hashtags
 * become inline `<button>`s only when a handler is supplied, otherwise plain
 * (non-interactive) spans.
 */
export const MentionTextV4 = React.forwardRef<HTMLSpanElement, MentionTextV4Props>(
  function MentionTextV4(
    {
      text,
      color = 'onSurface',
      linkColor = 'primary',
      size = 'base',
      numberOfLines,
      onPressMention,
      onPressHashtag,
      className,
      style,
      ...rest
    },
    ref
  ) {
    const segments = parseMentions(text);
    const clamp: React.CSSProperties | undefined =
      numberOfLines != null
        ? {
            display: '-webkit-box',
            WebkitLineClamp: numberOfLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }
        : undefined;

    return (
      <span
        ref={ref}
        className={cn('leading-relaxed', SIZE_CLASS[size], COLOR_CLASS[color], className)}
        style={clamp ? { ...clamp, ...style } : style}
        {...rest}
      >
        {segments.map((seg, i) => {
          if (seg.kind === 'text') {
            return <span key={i}>{seg.value}</span>;
          }
          const bare = seg.value.slice(1);
          const handler =
            seg.kind === 'mention'
              ? onPressMention
                ? () => onPressMention(bare)
                : undefined
              : onPressHashtag
                ? () => onPressHashtag(bare)
                : undefined;
          const linkClass = cn('font-semibold', COLOR_CLASS[linkColor]);
          if (handler) {
            return (
              <button key={i} type="button" className={cn(linkClass, 'hover:underline')} onClick={handler}>
                {seg.value}
              </button>
            );
          }
          return (
            <span key={i} className={linkClass}>
              {seg.value}
            </span>
          );
        })}
      </span>
    );
  }
);
