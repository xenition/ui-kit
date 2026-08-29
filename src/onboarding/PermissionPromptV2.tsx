import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';
import type { PermissionPromptProps, PermissionKind } from './PermissionPrompt';

/** Drop-in for {@link PermissionPrompt} — identical props, different design. */
export type PermissionPromptV2Props = PermissionPromptProps;

/** §10: geometry only — 44 (`h-11`) is the tap target and row badge, 88 the medallion. */
const TAP_TARGET_CLASS = 'min-h-11';
const HERO_MEDALLION_CLASS = 'h-[88px] w-[88px]';

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
 * Permission pre-prompt — V2, the editorial line. The tinted ground runs
 * full-bleed with no inset and the copy rises over it on a sheet: as a card the
 * band spans the card's full width behind the medallion; as a step screen
 * (`fullScreen`) the hero reaches the top edge and the content sheet overlaps
 * the seam.
 *
 * Like the base component it never fires a permission dialog itself — `onAllow`
 * is the host's cue to make the real request.
 *
 * Same props as {@link PermissionPrompt}. Token-pure.
 */
export const PermissionPromptV2 = React.forwardRef<HTMLDivElement, PermissionPromptV2Props>(
  function PermissionPromptV2(
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
      illustration,
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

    const medallion = (
      <span
        className={cn(
          'flex items-center justify-center rounded-full',
          HERO_MEDALLION_CLASS,
          granted ? 'bg-success' : 'bg-primary'
        )}
      >
        <Icon glyph={granted ? '✓' : glyph} size="2xl" color={granted ? 'onSuccess' : 'onPrimary'} />
      </span>
    );

    const headline = (
      <div className="flex flex-col gap-sm">
        <h2>
          <Text size="2xl" weight="bold" tone="onSurface" align="center" numberOfLines={2} className="block">
            {title}
          </Text>
        </h2>
        <Text size="base" tone="muted" align="center" className="block">
          {rationale}
        </Text>
      </div>
    );

    const rows =
      benefits.length > 0 ? (
        <ul className="flex flex-col gap-md">
          {benefits.map((benefit) => (
            <li key={benefit.id} className="flex items-center gap-md text-left">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50">
                <Icon glyph={benefit.icon ?? '✓'} size="base" color="primary" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-xs">
                <Text size="base" weight="semibold" tone="onSurface">
                  {benefit.title}
                </Text>
                {benefit.description ? (
                  <Text size="sm" tone="muted">
                    {benefit.description}
                  </Text>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      ) : null;

    const grantedLine = (
      <p aria-live="polite" className="flex items-center justify-center gap-xs">
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
          <Text size="base" weight="medium" tone="muted">
            {denyLabel}
          </Text>
        </button>
        {state === 'denied' ? (
          <p aria-live="polite" className="flex items-center justify-center gap-xs">
            <Icon name="info" size="sm" color="muted" />
            <Text size="sm" tone="muted" align="center">
              {deniedMessage}
            </Text>
          </p>
        ) : null}
      </>
    );

    if (!fullScreen) {
      return (
        <Card ref={ref} padding="none" className={cn('overflow-hidden text-center', className)} {...rest}>
          <div className="flex items-center justify-center bg-primary-50 py-xl">
            {illustration ?? medallion}
          </div>
          <div className="flex flex-col gap-md p-lg">
            {headline}
            {rows}
            {granted ? grantedLine : <div className="flex w-full flex-col gap-sm">{actions}</div>}
          </div>
        </Card>
      );
    }

    return (
      <div ref={ref} className={cn('flex min-h-full flex-col bg-surface', className)} {...rest}>
        <div className="relative flex h-[38vh] items-center justify-center overflow-hidden bg-primary-50">
          {illustration ?? medallion}

          {showHeader ? (
            <div className="absolute inset-x-0 top-0 flex items-center gap-sm px-sm">
              {onBack ? (
                <button type="button" aria-label="Back" onClick={onBack} className="flex h-11 w-11 items-center justify-center">
                  <Icon name="chevron-left" size="xl" color="onSurface" />
                </button>
              ) : (
                <span className="h-11 w-11" />
              )}
              <div className="flex flex-1 justify-center">{progress}</div>
              {onDismiss ? (
                <button type="button" aria-label="Dismiss" onClick={onDismiss} className="flex h-11 w-11 items-center justify-center">
                  <Icon name="close" size="lg" color="muted" />
                </button>
              ) : (
                <span className="h-11 w-11" />
              )}
            </div>
          ) : null}
        </div>

        <div className="-mt-xl flex flex-1 flex-col gap-lg rounded-t-[var(--xen-radius-lg)] bg-surface p-xl shadow-lg">
          {headline}
          {rows}
          <div className="mt-auto flex flex-col gap-sm border-t border-border bg-surface pb-lg pt-md">
            {granted ? grantedLine : actions}
          </div>
        </div>
      </div>
    );
  }
);
