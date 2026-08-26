import * as React from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Icon, Text } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { GetStartedButton } from './GetStartedButton';
import type { PermissionPromptProps, PermissionKind } from './PermissionPrompt';

/** Drop-in for {@link PermissionPrompt} — identical props, different design. */
export type PermissionPromptV2Props = PermissionPromptProps;

/** §10: geometry only — 44 is the tap target and the row badge, 88 the medallion. */
const TAP_TARGET = 44;
const HERO_MEDALLION_SIZE = 88;
/** §3: the hero never eats more than ~38% of the screen, even full-bleed. */
const HERO_MAX_SCREEN_FRACTION = 0.38;

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
 * Like the base component it never fires an OS dialog itself — `onAllow` is the
 * host's cue to make the real request.
 *
 * Same props as {@link PermissionPrompt}. Token-pure.
 */
export function PermissionPromptV2({
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
  style,
}: PermissionPromptV2Props): React.ReactElement {
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

  const { height: screenHeight } = useWindowDimensions();
  const glyph = icon ?? KIND_GLYPH[kind];
  const granted = state === 'granted';
  const showHeader = fullScreen && (onBack != null || onDismiss != null || progress != null);

  const medallion = (
    <View
      style={{
        width: HERO_MEDALLION_SIZE,
        height: HERO_MEDALLION_SIZE,
        borderRadius: tokens.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: granted ? colors.success : colors.primary,
      }}
    >
      <Icon glyph={granted ? '✓' : glyph} size="2xl" color={granted ? 'onSuccess' : 'onPrimary'} />
    </View>
  );

  const headline = (
    <View style={{ gap: tokens.spacing.sm }}>
      <Text accessibilityRole="header" size="2xl" weight="bold" tone="onSurface" align="center" numberOfLines={2}>
        {title}
      </Text>
      <Text size="base" tone="muted" align="center">
        {rationale}
      </Text>
    </View>
  );

  const rows =
    benefits.length > 0 ? (
      <View style={{ gap: tokens.spacing.md }}>
        {benefits.map((benefit) => (
          <View key={benefit.id} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
            <View
              style={{
                width: TAP_TARGET,
                height: TAP_TARGET,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: tintedGround,
              }}
            >
              <Icon glyph={benefit.icon ?? '✓'} size="base" color="primary" />
            </View>
            <View style={{ flex: 1, gap: tokens.spacing.xs }}>
              <Text size="base" weight="semibold" tone="onSurface">
                {benefit.title}
              </Text>
              {benefit.description ? (
                <Text size="sm" tone="muted">
                  {benefit.description}
                </Text>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    ) : null;

  const grantedLine = (
    <View
      accessibilityLiveRegion="polite"
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }}
    >
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
        <Text size="base" weight="medium" tone="muted">
          {denyLabel}
        </Text>
      </Pressable>
      {state === 'denied' ? (
        <View
          accessibilityLiveRegion="polite"
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }}
        >
          <Icon name="info" size="sm" color="muted" />
          <Text size="sm" tone="muted" align="center">
            {deniedMessage}
          </Text>
        </View>
      ) : null}
    </>
  );

  if (!fullScreen) {
    return (
      <Card padding="none" style={[{ overflow: 'hidden' }, style]}>
        <View
          style={{
            backgroundColor: tintedGround,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: tokens.spacing.xl,
          }}
        >
          {illustration ?? medallion}
        </View>
        <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.md }}>
          {headline}
          {rows}
          {granted ? grantedLine : <View style={{ gap: tokens.spacing.sm }}>{actions}</View>}
        </View>
      </Card>
    );
  }

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      <View
        style={{
          height: screenHeight * HERO_MAX_SCREEN_FRACTION,
          backgroundColor: tintedGround,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {illustration ?? medallion}

        {showHeader ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.sm,
            }}
          >
            {onBack ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Back"
                onPress={onBack}
                style={{ width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon name="chevron-left" size="xl" color="onSurface" />
              </Pressable>
            ) : (
              <View style={{ width: TAP_TARGET, height: TAP_TARGET }} />
            )}
            <View style={{ flex: 1, alignItems: 'center' }}>{progress}</View>
            {onDismiss ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Dismiss"
                onPress={onDismiss}
                style={{ width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon name="close" size="lg" color="muted" />
              </Pressable>
            ) : (
              <View style={{ width: TAP_TARGET, height: TAP_TARGET }} />
            )}
          </View>
        ) : null}
      </View>

      <View
        style={{
          flex: 1,
          marginTop: -tokens.spacing.xl,
          padding: tokens.spacing.xl,
          gap: tokens.spacing.lg,
          backgroundColor: colors.surface,
          borderTopLeftRadius: tokens.radius.lg,
          borderTopRightRadius: tokens.radius.lg,
          ...shadow('lg', tokens),
        }}
      >
        {headline}
        {rows}
        <View
          style={{
            marginTop: 'auto',
            alignSelf: 'stretch',
            borderTopWidth: 1,
            borderTopColor: colors.border,
            backgroundColor: colors.surface,
            paddingTop: tokens.spacing.md,
            paddingBottom: tokens.spacing.lg,
            gap: tokens.spacing.sm,
          }}
        >
          {granted ? grantedLine : actions}
        </View>
      </View>
    </View>
  );
}
