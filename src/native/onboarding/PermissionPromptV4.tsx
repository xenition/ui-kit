import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import { PaywallFeatureRowsV4 } from './PaywallFeatureRowsV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  FlowLinkV4,
  FlowScreenV4,
  flowGrounds,
  flowMetrics,
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
  /** Fires on the settings link. The host owns `Linking.openSettings()`. */
  onOpenSettings?: () => void;
}

/**
 * Fallback glyphs per permission kind. Emoji, and therefore **untinted** on
 * most platforms — which is exactly why the medallion behind them carries the
 * colour instead of the glyph doing it.
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
 * **V4 permission prompt** — the base's props plus `settingsLabel`,
 * `onOpenSettings` and the line's `ground`/`accent`.
 *
 * The "explain, then ask" pattern (§17): say what the permission buys before
 * the OS dialog appears, so a user who declines the system prompt has already
 * been told what they are declining.
 *
 * ## Five changes
 *
 * 1. **A denied state has an exit.** See `settingsLabel`.
 * 2. **The benefit rows are the module's rows.** They were a private,
 *    near-identical copy of `PaywallFeatureRows` — same 44 circle, same tinted
 *    ground, no rail — which is how the two drifted apart. One component now.
 * 3. **The tint has no `scheme` branch.** `flowGrounds()` mixes it from
 *    resolved semantic colours.
 * 4. **The deny action reads as a choice**, underlined with its own tap
 *    target, rather than muted text under the button.
 * 5. **Full-screen gets the shared shell** — scroll, pinned footer, safe-area
 *    inset. The base's band had none of the three.
 *
 * `granted` replaces the actions with a live-region confirmation rather than
 * leaving a live "Allow" button on a screen where there is nothing left to
 * allow. The card form (`fullScreen={false}`) is unchanged in shape.
 */
export function PermissionPromptV4({
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
  style,
}: PermissionPromptV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const grounds = flowGrounds(theme, ground, accent);
  const { badge } = flowMetrics(theme, 0);

  const glyph = icon ?? KIND_GLYPH[kind];
  const granted = state === 'granted';
  const denied = state === 'denied';

  /** The card form's medallion, at the badge size the whole module shares. */
  const medallion = (
    <View
      style={{
        width: badge * 1.5,
        height: badge * 1.5,
        borderRadius: tokens.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: granted ? colors.success : grounds.fill,
      }}
    >
      <IconV4
        glyph={granted ? '✓' : glyph}
        size="2xl"
        style={{ color: granted ? colors.onSuccess : grounds.onFill }}
      />
    </View>
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
    <View
      accessibilityLiveRegion="polite"
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.xs,
      }}
    >
      <IconV4 name="check" size="sm" color="successText" />
      <TextV4 size="sm" weight="semibold" tone="successText">
        {grantedMessage}
      </TextV4>
    </View>
  );

  const deniedNote = denied ? (
    <View accessibilityLiveRegion="polite" style={{ gap: tokens.spacing.xs }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
        }}
      >
        <IconV4 name="info" size="sm" color="mutedText" />
        <TextV4 size="sm" tone="mutedText" align="center" style={{ flexShrink: 1 }}>
          {deniedMessage}
        </TextV4>
      </View>
      {settingsLabel && onOpenSettings ? (
        <FlowLinkV4 label={settingsLabel} onPress={onOpenSettings} emphasis="tertiary" />
      ) : null}
    </View>
  ) : null;

  const cta = (
    <GetStartedButtonV4
      label={allowLabel}
      trailingArrow={false}
      loading={state === 'requesting'}
      onPress={onAllow}
    />
  );

  if (!fullScreen) {
    return (
      <CardV4 style={[{ gap: tokens.spacing.md, alignItems: 'stretch' }, style]}>
        <View style={{ alignItems: 'center' }}>{medallion}</View>
        <FlowHeadlineV4 title={title} subtitle={rationale} />
        {rows}
        {granted ? (
          grantedLine
        ) : (
          <>
            {cta}
            <FlowLinkV4 label={denyLabel} onPress={onDeny} emphasis="secondary" />
            {deniedNote}
          </>
        )}
      </CardV4>
    );
  }

  return (
    <FlowScreenV4
      grounds={grounds}
      center={false}
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
      <FlowHeroV4
        illustration={illustration ?? medallion}
        logoGlyph={glyph}
        grounds={grounds}
      />
      <FlowHeadlineV4 title={title} subtitle={rationale} />
      {rows}
      {deniedNote}
    </FlowScreenV4>
  );
}
