import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';
import type { PermissionPromptProps, PermissionKind } from './PermissionPrompt';

/** Drop-in for {@link PermissionPrompt} — identical props, different design. */
export type PermissionPromptV3Props = PermissionPromptProps;

/** §10: geometry only — 44 (`h-11`) is the minimum tap target and the badge size. */
const TAP_TARGET_CLASS = 'min-h-11';

const KIND_GLYPH: Record<PermissionKind, string> = {
  notifications: '🔔',
  location: '📍',
  camera: '📷',
  microphone: '🎤',
  photos: '🖼️',
  contacts: '👥',
  generic: '🔒',
};

/**
 * Permission pre-prompt — V3, the compact line. No hero panel and no medallion
 * stage: a 44px badge sits beside a left-aligned headline, the rationale runs
 * underneath at the small step, and the benefit rows tighten to a single line
 * each. Sized for a sheet or a mid-flow nudge where a full hero would be
 * theatre.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero.
 *
 * Like the base component it never fires a permission dialog itself — `onAllow`
 * is the host's cue to make the real request.
 *
 * Same props as {@link PermissionPrompt}. Token-pure.
 */
export const PermissionPromptV3 = React.forwardRef<HTMLDivElement, PermissionPromptV3Props>(
  function PermissionPromptV3(
    {
      kind = 'generic',
      icon,
      title,
      rationale,
      allowLabel = 'Allow',
      denyLabel = 'Not now',
      onAllow,
      onDeny,
      state = 'idle',
      deniedMessage = 'You can enable this later in Settings.',
      fullScreen = false,
      illustration: _illustration,
      benefits = [],
      progress,
      onBack,
      onDismiss,
      grantedMessage = "You're all set.",
      className,
      ...rest
    },
    ref
  ) {
    const glyph = icon ?? KIND_GLYPH[kind];
    const granted = state === 'granted';
    const showHeader = fullScreen && (onBack != null || onDismiss != null || progress != null);

    const header = (
      <div className="flex items-center gap-md text-left">
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
            granted ? 'bg-success' : 'bg-primary-50'
          )}
        >
          <Icon glyph={granted ? '✓' : glyph} size="lg" color={granted ? 'onSuccess' : 'primary'} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-xs">
          <h2>
            <Text size="lg" weight="bold" tone="onSurface" numberOfLines={2} className="block">
              {title}
            </Text>
          </h2>
          <Text size="sm" tone="muted">
            {rationale}
          </Text>
        </span>
      </div>
    );

    const rows =
      benefits.length > 0 ? (
        <ul className="flex flex-col gap-sm">
          {benefits.map((benefit) => (
            <li key={benefit.id} className="flex items-center gap-sm text-left">
              <Icon glyph={benefit.icon ?? '✓'} size="sm" color="primary" />
              <span className="flex min-w-0 flex-1 flex-col">
                <Text size="sm" weight="semibold" tone="onSurface" numberOfLines={1}>
                  {benefit.title}
                </Text>
                {benefit.description ? (
                  <Text size="xs" tone="muted" numberOfLines={1}>
                    {benefit.description}
                  </Text>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      ) : null;

    const grantedLine = (
      <p aria-live="polite" className="flex items-center gap-xs">
        <Icon name="check" size="sm" color="success" />
        <Text size="sm" weight="semibold" tone="successText">
          {grantedMessage}
        </Text>
      </p>
    );

    const actions = (
      <>
        <GetStartedButton label={allowLabel} trailingArrow={false} loading={state === 'requesting'} onClick={onAllow} />
        <button
          type="button"
          aria-label={denyLabel}
          onClick={onDeny}
          className={cn('flex items-center justify-center text-center', TAP_TARGET_CLASS)}
        >
          <Text size="sm" weight="medium" tone="muted">
            {denyLabel}
          </Text>
        </button>
        {state === 'denied' ? (
          <p aria-live="polite" className="flex items-center gap-xs">
            <Icon name="info" size="sm" color="muted" />
            <Text size="xs" tone="muted">
              {deniedMessage}
            </Text>
          </p>
        ) : null}
      </>
    );

    const body = (
      <>
        {showHeader ? (
          <div className="flex items-center gap-sm">
            {onBack ? (
              <button type="button" aria-label="Back" onClick={onBack} className="flex h-11 w-11 items-center justify-center">
                <Icon name="chevron-left" size="xl" color="onSurface" />
              </button>
            ) : null}
            <div className="flex-1">{progress}</div>
            {onDismiss ? (
              <button type="button" aria-label="Dismiss" onClick={onDismiss} className="flex h-11 w-11 items-center justify-center">
                <Icon name="close" size="lg" color="muted" />
              </button>
            ) : null}
          </div>
        ) : null}

        {header}
        {rows}

        <div className="mt-auto flex flex-col gap-xs border-t border-border bg-surface pb-lg pt-sm">
          {granted ? grantedLine : actions}
        </div>
      </>
    );

    if (!fullScreen) {
      return (
        <Card ref={ref} padding="md" className={cn('flex flex-col gap-md', className)} {...rest}>
          {body}
        </Card>
      );
    }

    return (
      <div ref={ref} className={cn('flex min-h-full flex-col gap-md bg-surface', className)} {...rest}>
        {body}
      </div>
    );
  }
);
