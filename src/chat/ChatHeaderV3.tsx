import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Icon } from '../primitives';
import { PresenceDot } from './PresenceDot';
import type { ChatHeaderProps } from './ChatHeader';

/** Drop-in alternate design for {@link ChatHeader} — identical props. */
export type ChatHeaderV3Props = ChatHeaderProps;

/**
 * ChatHeader — **compact centered** variant. A slim iOS-style bar: the back
 * affordance pinned far-left and the trailing actions far-right (each in a
 * fixed-width cluster so the center stays optically centered), with a small
 * `xs` avatar stacked above a centered title + subtitle in the middle. Minimal
 * height, borderless-but-for a hairline rule — the counterpart to the roomy v2
 * header. Same props as `ChatHeader`. No literal colors.
 */
export const ChatHeaderV3 = React.forwardRef<HTMLElement, ChatHeaderV3Props>(function ChatHeaderV3(
  { title, subtitle, avatarUri, presence, typing = false, onBack, onPressTitle, actions, className, ...rest },
  ref
) {
  return (
    <header
      ref={ref}
      className={cn('flex items-center border-b border-border bg-surface px-2 py-1', className)}
      {...rest}
    >
      {/* Left cluster (fixed width keeps the center title optically centered). */}
      <span className="flex w-16 items-center">
        {onBack ? (
          <button type="button" aria-label="Back" onClick={onBack} className="shrink-0">
            <Icon glyph="‹" color="primary" size="2xl" />
          </button>
        ) : null}
      </span>

      <button
        type="button"
        aria-label={title}
        onClick={onPressTitle}
        disabled={!onPressTitle}
        className="flex min-w-0 flex-1 flex-col items-center gap-0.5 text-center disabled:pointer-events-none"
      >
        <span className="relative">
          <Avatar size="xs" src={avatarUri} name={title} />
          {presence ? (
            <span className="absolute -bottom-0.5 -right-0.5">
              <PresenceDot status={presence} />
            </span>
          ) : null}
        </span>
        <span className="max-w-full truncate text-sm font-bold text-on-surface">{title}</span>
        {typing ? (
          <span aria-live="polite" className="max-w-full truncate text-xs text-primary">
            typing…
          </span>
        ) : subtitle ? (
          <span className="max-w-full truncate text-xs text-muted">{subtitle}</span>
        ) : null}
      </button>

      {/* Right cluster (mirrors the left width to keep the title centered). */}
      <span className="flex w-16 items-center justify-end gap-1">
        {actions?.map((action) => (
          <button
            key={action.id}
            type="button"
            aria-label={action.label}
            onClick={action.onClick}
            className="shrink-0 p-1"
          >
            <Icon glyph={action.glyph} color="primary" size="lg" />
          </button>
        ))}
      </span>
    </header>
  );
});
