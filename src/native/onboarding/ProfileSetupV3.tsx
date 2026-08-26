import * as React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import type { ProfileSetupProps } from './ProfileSetup';

/** Drop-in for {@link ProfileSetup} — identical props, different design. */
export type ProfileSetupV3Props = ProfileSetupProps;

/** §10: geometry only — 56 is the field/CTA height, 44 the minimum tap target. */
const FIELD_HEIGHT = 56;
const TAP_TARGET = 44;

/**
 * Profile setup — V3, the compact line. No hero panel: a small badge sits beside
 * a left-aligned headline, and the avatar drops to an inline row — thumbnail,
 * name, "Add photo" — the way an account settings row reads. The fields keep
 * their §6 geometry (56, `radius.lg`, leading icon, error border **and**
 * message) because shrinking a text field is how you get a form nobody can tap;
 * what gets denser is the space between things, not the things themselves.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero.
 *
 * Same props as {@link ProfileSetup}. Token-pure.
 */
export function ProfileSetupV3({
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
  avatarActionLabel = 'Add photo',
  progress,
  onBack,
  onDismiss,
  error,
  style,
}: ProfileSetupV3Props): React.ReactElement {
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

  const [focusedId, setFocusedId] = React.useState<string | null>(null);

  const showHeader = onBack != null || onDismiss != null || progress != null;

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
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

      {/* Small leading badge beside the headline — the compact line's stand-in
          for the hero panel. Left-aligned per §11's V3 brief. */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
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
          <Icon name="user" size="lg" color="primary" />
        </View>
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <Text accessibilityRole="header" size="lg" weight="bold" tone="onSurface" numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? (
            <Text size="sm" tone="muted" numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Avatar as a dense row rather than a hero. */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Change profile photo"
        onPress={onEditAvatar}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          minHeight: TAP_TARGET,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        }}
      >
        <Avatar src={avatarUri} name={name} size="sm" />
        <View style={{ flex: 1 }}>
          <Text size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
            {name ?? avatarActionLabel}
          </Text>
        </View>
        <Icon name="camera" size="base" color="primary" />
      </Pressable>

      {fields.length > 0 ? (
        <View style={{ gap: tokens.spacing.sm }}>
          {fields.map((field) => {
            const focused = focusedId === field.id;
            const invalid = field.error != null && field.error !== '';
            const borderColor = invalid ? colors.danger : focused ? colors.primary : colors.border;
            return (
              <View key={field.id} style={{ gap: tokens.spacing.xs }}>
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
                    placeholder={field.placeholder ?? field.label}
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
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
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
          paddingTop: tokens.spacing.sm,
          paddingBottom: tokens.spacing.lg,
          gap: tokens.spacing.xs,
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
            <Text size="sm" weight="medium" tone="muted">
              {skipLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
