import * as React from 'react';
import { cn } from '../primitives/cn';

/** Semantic color slots that map to a `text-*` token class. Mirrors the native `SemanticColors` keys. */
export type MentionColor =
  | 'surface'
  | 'onSurface'
  | 'primary'
  | 'onPrimary'
  | 'accent'
  | 'onAccent'
  | 'muted'
  | 'border'
  | 'success'
  | 'onSuccess'
  | 'warn'
  | 'onWarn'
  | 'danger'
  | 'onDanger';

type TypeScaleKey = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

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

const SIZE_CLASS: Record<TypeScaleKey, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

export interface MentionTextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Raw body text. `@handles` and `#hashtags` are auto-highlighted. */
  text: string;
  /** Base color slot for plain text. Default `'onSurface'`. */
  color?: MentionColor;
  /** Highlight color slot for mentions/hashtags/links. Default `'primary'`. */
  linkColor?: MentionColor;
  /** Font size from the typography scale. Default `'base'`. */
  size?: TypeScaleKey;
  /** Clamp to N lines. */
  numberOfLines?: number;
  /** Fired with the bare handle (no `@`) when a mention is clicked. */
  onPressMention?: (handle: string) => void;
  /** Fired with the bare tag (no `#`) when a hashtag is clicked. */
  onPressHashtag?: (tag: string) => void;
}

type Segment = { kind: 'text' | 'mention' | 'hashtag'; value: string };

/** Split a string into plain / @mention / #hashtag segments (order preserved). */
export function parseMentions(text: string): Segment[] {
  const segments: Segment[] = [];
  const re = /([@#][\w]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const token = match[0] ?? '';
    if (match.index > lastIndex) {
      segments.push({ kind: 'text', value: text.slice(lastIndex, match.index) });
    }
    segments.push({
      kind: token.charAt(0) === '@' ? 'mention' : 'hashtag',
      value: token,
    });
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    segments.push({ kind: 'text', value: text.slice(lastIndex) });
  }
  return segments;
}

/**
 * Rich body text that highlights `@mentions` and `#hashtags` in the theme's
 * link color and makes each clickable. Everything else renders in the base
 * color. Web parity of the native `MentionText` — token-only, no literal colors.
 * Mentions/hashtags become inline `<button>`s only when a handler is supplied,
 * otherwise plain (non-interactive) spans.
 */
export const MentionText = React.forwardRef<HTMLSpanElement, MentionTextProps>(function MentionText(
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
});
