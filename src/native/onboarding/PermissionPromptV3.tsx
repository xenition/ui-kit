import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Icon, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import type { PermissionPromptProps, PermissionKind } from './PermissionPrompt';

/** Drop-in for {@link PermissionPrompt} — identical props, different design. */
export type PermissionPromptV3Props = PermissionPromptProps;

/** §10: geometry only — 44 is the minimum tap target and the row badge size. */
const TAP_TARGET = 44;

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
 * stage: a 44pt badge sits beside a left-aligned headline, the rationale runs
 * underneath at the small step, and the benefit rows tighten to a single line
 * each. Sized for a sheet or a mid-flow nudge where a full hero would be
 * theatre.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero.
 *
 * Like the base component it never fires an OS dialog itself — `onAllow` is the
 * host's cue to make the real request.
 *
 * Same props as {@link PermissionPrompt}. Token-pure.
 */
export function PermissionPromptV3({
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
  benefits = [],
  progress,
  onBack,
  onDismiss,
  grantedMessage = "You're all set.",
  style,
}: PermissionPromptV3Props): React.ReactElement {
  const { colors, tokens, scheme } = useXenitionTheme();
  /*
    §3 asks for a "tinted ground" and names `primary[50]`. Taken literally that
    is wrong on native in dark mode: `toNativeTokens` copies the LIGHT
    orientation of the ramps into both schemes (unlike the emitted CSS vars,
    which invert), so `primary[50]` paints a near-white panel behind a
    near-black page. Read the dark end of the same ramp instead — still a
    compiled token, still scheme-correct.
  */
  const tintedGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];

  const glyph = icon ?? KIND_GLYPH[kind];
  const granted = state === 'granted';
  const showHeader = fullScreen && (onBack != null || onDismiss != null || progress != null);

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      <View
        style={{
          width: TAP_TARGET,
          height: TAP_TARGET,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: granted ? colors.success : tintedGround,
        }}
      >
        <Icon glyph={granted ? '✓' : glyph} size="lg" color={granted ? 'onSuccess' : 'primary'} />
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text accessibilityRole="header" size="lg" weight="bold" tone="onSurface" numberOfLines={2}>
          {title}
        </Text>
        <Text size="sm" tone="muted">
          {rationale}
        </Text>
      </View>
    </View>
  );

  const rows =
    benefits.length > 0 ? (
      <View style={{ gap: tokens.spacing.sm }}>
        {benefits.map((benefit) => (
          <View key={benefit.id} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <Icon glyph={benefit.icon ?? '✓'} size="sm" color="primary" />
            <View style={{ flex: 1 }}>
              <Text size="sm" weight="semibold" tone="onSurface" numberOfLines={1}>
                {benefit.title}
              </Text>
              {benefit.description ? (
                <Text size="xs" tone="muted" numberOfLines={1}>
                  {benefit.description}
                </Text>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    ) : null;

  const grantedLine = (
    <View accessibilityLiveRegion="polite" style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
      <Icon name="check" size="sm" color="success" />
      <Text size="sm" weight="semibold" tone="successText">
        {grantedMessage}
      </Text>
    </View>
  );

  const actions = (
    <>
      <GetStartedButton label={allowLabel} trailingArrow={false} loading={state === 'requesting'} onPress={onAllow} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={denyLabel}
        onPress={onDeny}
        style={{ alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }}
      >
        <Text size="sm" weight="medium" tone="muted">
          {denyLabel}
        </Text>
      </Pressable>
      {state === 'denied' ? (
        <View accessibilityLiveRegion="polite" style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon name="info" size="sm" color="muted" />
          <Text size="xs" tone="muted">
            {deniedMessage}
          </Text>
        </View>
      ) : null}
    </>
  );

  const body = (
    <>
      {showHeader ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {onBack ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              onPress={onBack}
              style={{ width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon name="chevron-left" size="xl" color="onSurface" />
            </Pressable>
          ) : null}
          <View style={{ flex: 1 }}>{progress}</View>
          {onDismiss ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Dismiss"
              onPress={onDismiss}
              style={{ width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon name="close" size="lg" color="muted" />
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {header}
      {rows}

      <View
        style={{
          marginTop: 'auto',
          alignSelf: 'stretch',
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          paddingTop: tokens.spacing.sm,
          paddingBottom: tokens.spacing.lg,
          gap: tokens.spacing.xs,
        }}
      >
        {granted ? grantedLine : actions}
      </View>
    </>
  );

  if (!fullScreen) {
    return (
      <Card padding="md" style={[{ gap: tokens.spacing.md }, style]}>
        {body}
      </Card>
    );
  }

  return <View style={[{ flex: 1, backgroundColor: colors.surface, gap: tokens.spacing.md }, style]}>{body}</View>;
}
