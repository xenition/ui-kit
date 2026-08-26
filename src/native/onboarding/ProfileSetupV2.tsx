import * as React from 'react';
import { Pressable, TextInput, View, useWindowDimensions } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon, Text } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { GetStartedButton } from './GetStartedButton';
import type { ProfileSetupProps } from './ProfileSetup';

/** Drop-in for {@link ProfileSetup} — identical props, different design. */
export type ProfileSetupV2Props = ProfileSetupProps;

/** §10: geometry only — 56 is the field/CTA height, 44 the minimum tap target. */
const FIELD_HEIGHT = 56;
const TAP_TARGET = 44;
/** §3: the hero never eats more than ~38% of the screen, even full-bleed. */
const HERO_MAX_SCREEN_FRACTION = 0.38;

/**
 * Profile setup — V2, the editorial line. The hero runs full-bleed to the top
 * edge with the avatar editor centred in it, and the content sheet rises over
 * the seam carrying the headline, the §6 fields and the sticky CTA. The avatar
 * overlaps the seam rather than sitting inside a panel, which is what makes this
 * line read as editorial rather than as the base screen with a bigger picture.
 *
 * Same props as {@link ProfileSetup}. Token-pure.
 */
export function ProfileSetupV2({
  name,
  avatarUri,
  onEditAvatar,
  fields = [],
  values = {},
  onChangeField,
  title = 'Set up your profile',
  saveLabel = 'Save profile',
  onSave,
  loading = false,
  skipLabel,
  onSkip,
  subtitle,
  illustration,
  avatarActionLabel = 'Add photo',
  progress,
  onBack,
  onDismiss,
  error,
  style,
}: ProfileSetupV2Props): React.ReactElement {
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
  const [focusedId, setFocusedId] = React.useState<string | null>(null);

  const showHeader = onBack != null || onDismiss != null || progress != null;

  return (
    <View style={[{ backgroundColor: colors.surface }, style]}>
      <View
        style={{
          height: screenHeight * HERO_MAX_SCREEN_FRACTION,
          backgroundColor: tintedGround,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {illustration ?? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Change profile photo"
            onPress={onEditAvatar}
            style={{ alignItems: 'center', gap: tokens.spacing.sm }}
          >
            <Avatar src={avatarUri} name={name} size="lg" />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Icon name="camera" size="sm" color="primary" />
              <Text size="sm" weight="semibold" tone="primary">
                {avatarActionLabel}
              </Text>
            </View>
          </Pressable>
        )}

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
          marginTop: -tokens.spacing.xl,
          padding: tokens.spacing.xl,
          gap: tokens.spacing.lg,
          backgroundColor: colors.surface,
          borderTopLeftRadius: tokens.radius.lg,
          borderTopRightRadius: tokens.radius.lg,
          ...shadow('lg', tokens),
        }}
      >
        <View style={{ gap: tokens.spacing.sm }}>
          <Text accessibilityRole="header" size="2xl" weight="bold" tone="onSurface" align="center" numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? (
            <Text size="base" tone="muted" align="center" numberOfLines={3}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {fields.length > 0 ? (
          <View style={{ gap: tokens.spacing.md }}>
            {fields.map((field) => {
              const focused = focusedId === field.id;
              const invalid = field.error != null && field.error !== '';
              const borderColor = invalid ? colors.danger : focused ? colors.primary : colors.border;
              return (
                <View key={field.id} style={{ gap: tokens.spacing.xs }}>
                  <Text size="sm" weight="semibold" tone="onSurface">
                    {field.label}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: tokens.spacing.sm,
                      height: FIELD_HEIGHT,
                      paddingHorizontal: tokens.spacing.md,
                      borderRadius: tokens.radius.lg,
                      borderWidth: 1,
                      borderColor,
                      backgroundColor: colors.surface,
                    }}
                  >
                    {field.icon ? <Icon name={field.icon} size="base" color="muted" /> : null}
                    <TextInput
                      accessibilityLabel={field.label}
                      placeholder={field.placeholder}
                      placeholderTextColor={colors.muted}
                      keyboardType={field.keyboard ?? 'default'}
                      value={values[field.id] ?? ''}
                      onChangeText={(t) => onChangeField?.(field.id, t)}
                      onFocus={() => setFocusedId(field.id)}
                      onBlur={() => setFocusedId((current) => (current === field.id ? null : current))}
                      style={{
                        flex: 1,
                        height: FIELD_HEIGHT,
                        color: colors.onSurface,
                        fontSize: tokens.typography.scale.base,
                      }}
                    />
                  </View>
                  {invalid ? (
                    <View
                      accessibilityLiveRegion="polite"
                      style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
                    >
                      <Icon name="error" size="sm" color="danger" />
                      <Text size="sm" tone="dangerText">
                        {field.error}
                      </Text>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}

        {error ? (
          <View
            accessibilityLiveRegion="assertive"
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }}
          >
            <Icon name="error" size="sm" color="danger" />
            <Text size="sm" tone="dangerText">
              {error}
            </Text>
          </View>
        ) : null}

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
          <GetStartedButton label={saveLabel} trailingArrow={false} loading={loading} onPress={onSave} />
          {skipLabel && onSkip ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={skipLabel}
              onPress={onSkip}
              style={{ alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }}
            >
              <Text size="base" weight="medium" tone="muted">
                {skipLabel}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}
