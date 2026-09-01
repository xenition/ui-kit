import * as React from 'react';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import { PaywallFeatureRowsV4 } from './PaywallFeatureRowsV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  FlowLinkV4,
  FlowScreenV4,
  flowGroundVars,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import type { PermissionKind, PermissionPromptProps } from './PermissionPrompt';

export interface PermissionPromptV4Props extends PermissionPromptProps, OnboardingFlowV4Props {
  /**
   * "Open Settings" — shown **only** in the `denied` state, under the message.
   *
   * `deniedMessage` defaults to "You can enable this later in Settings" and the
   * base gave the user no way to get there. A dead end that names its own exit
   * and does not offer it is worse than one that says nothing.
   */
  settingsLabel?: string;
  /** Fires on the settings link. The host owns what "settings" means. */
  onOpenSettings?: () => void;
}

/**
 * Fallback glyphs per permission kind. Emoji, and therefore **untinted** on
 * most platforms — which is why the medallion behind them carries the colour
 * rather than the glyph doing it.
 */
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
 * **V4 permission prompt** — the web twin of the native `PermissionPromptV4`:
 * the base's props plus `settingsLabel`, `onOpenSettings` and the line's
 * `ground`/`accent`.
 *
 * The "explain, then ask" pattern (§17): say what the permission buys before
 * the browser's own dialog appears, so a user who declines it has already been
 * told what they are declining.
 *
 * ## Five changes
 *
 * 1. **A denied state has an exit** — see `settingsLabel`.
 * 2. **The benefit rows are the module's rows.** They were a private,
 *    near-identical copy of `PaywallFeatureRows`, which is how the two drifted
 *    apart. One component now.
 * 3. **The tint inverts with the scheme.**
 * 4. **The deny action reads as a choice**, underlined with its own tap target.
 * 5. **Full-screen gets the shared shell** — scroll, pinned footer, inset.
 *
 * `granted` replaces the actions with a live-region confirmation rather than
 * leaving a live "Allow" button on a screen where there is nothing left to
 * allow.
 */
export const PermissionPromptV4 = React.forwardRef<HTMLDivElement, PermissionPromptV4Props>(
  function PermissionPromptV4(
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
      grantedMessage = "You're all set.",
      fullScreen = false,
      illustration,
      benefits = [],
      progress,
      onBack,
      onDismiss,
      settingsLabel,
      onOpenSettings,
      ground = 'plain',
      accent = 'primary',
      className,
      style,
      ...rest
    },
    ref
  ) {
    const glyph = icon ?? KIND_GLYPH[kind];
    const granted = state === 'granted';
    const denied = state === 'denied';

    /** The card form's medallion, at the badge size the whole module shares. */
    const medallion = (
      <span
        className={cn(
          'flex h-16 w-16 items-center justify-center rounded-full',
          granted
            ? 'bg-success text-on-success'
            : 'bg-[var(--flow-fill)] text-[var(--flow-on-fill)]'
        )}
      >
        <IconV4 glyph={granted ? '✓' : glyph} size="2xl" />
      </span>
    );

    const rows =
      benefits.length > 0 ? (
        <PaywallFeatureRowsV4
          accent={accent}
          rows={benefits.map((benefit) => ({
            id: benefit.id,
            icon: benefit.icon,
            title: benefit.title,
            description: benefit.description,
          }))}
        />
      ) : null;

    const grantedLine = (
      <p
        aria-live="polite"
        className="flex items-center justify-center gap-xs text-sm font-semibold text-success-text"
      >
        <IconV4 name="check" size="sm" />
        {grantedMessage}
      </p>
    );

    const deniedNote = denied ? (
      <div aria-live="polite" className="flex w-full flex-col gap-xs">
        <p className="flex items-center justify-center gap-xs text-center text-sm text-muted-text">
          <IconV4 name="info" size="sm" />
          {deniedMessage}
        </p>
        {settingsLabel && onOpenSettings ? (
          <FlowLinkV4 label={settingsLabel} onClick={onOpenSettings} emphasis="tertiary" />
        ) : null}
      </div>
    ) : null;

    const cta = (
      <GetStartedButtonV4
        label={allowLabel}
        trailingArrow={false}
        loading={state === 'requesting'}
        onClick={onAllow}
      />
    );

    if (!fullScreen) {
      return (
        <CardV4
          ref={ref}
          style={{ ...flowGroundVars(ground, accent), ...style }}
          className={cn('flex flex-col items-stretch gap-md', className)}
          {...rest}
        >
          <div className="flex justify-center">{medallion}</div>
          <FlowHeadlineV4 title={title} subtitle={rationale} />
          {rows}
          {granted ? (
            grantedLine
          ) : (
            <>
              {cta}
              <FlowLinkV4 label={denyLabel} onClick={onDeny} emphasis="secondary" />
              {deniedNote}
            </>
          )}
        </CardV4>
      );
    }

    return (
      <FlowScreenV4
        ref={ref}
        {...rest}
        ground={ground}
        accent={accent}
        center={false}
        className={className}
        style={style}
        header={<FlowHeaderV4 onBack={onBack} onDismiss={onDismiss} progress={progress} />}
        footer={
          granted ? (
            <FlowFooterV4>{grantedLine}</FlowFooterV4>
          ) : (
            <FlowFooterV4 secondaryLabel={denyLabel} onSecondary={onDeny}>
              {cta}
            </FlowFooterV4>
          )
        }
      >
        <FlowHeroV4 illustration={illustration ?? medallion} logoGlyph={glyph} />
        <FlowHeadlineV4 title={title} subtitle={rationale} />
        {rows}
        {deniedNote}
      </FlowScreenV4>
    );
  }
);
