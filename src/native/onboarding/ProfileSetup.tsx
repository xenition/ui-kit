import * as React from 'react';
import { Pressable, TextInput, View, useWindowDimensions, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import type { IconName } from '../../primitives/icon-names';

/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: 56 — the height every field stands at (§6) and the height the sticky
  CTA matches (§5) — and 44, the minimum tap target for a header control or a
  text link (§7). Every colour, radius, gap and font size on this screen comes
  from the theme.
*/
const FIELD_HEIGHT = 56;
const TAP_TARGET = 44;

/** §3: the hero panel is roughly 4:3 and never eats more than ~38% of the screen. */
const HERO_ASPECT = 4 / 3;
const HERO_MAX_SCREEN_FRACTION = 0.38;

export interface ProfileField {
  /** Key returned in the values map. */
  id: string;
  /** Field label. */
  label: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Keyboard hint. Default `'default'`. */
  keyboard?: 'default' | 'email-address' | 'phone-pad';
  /**
   * Leading icon from the kit's named set (§6 — `'user'`, `'mail'`, `'phone'`).
   * Optional: a field without one renders with the glyph column collapsed, not
   * with a hole where an icon should be.
   */
  icon?: IconName;
  /**
   * Per-field validation message. Raises the field's border to `danger` **and**
   * prints the message in `dangerText` — never colour alone, which a
   * colour-blind user cannot see (§6).
   */
  error?: string;
}

export interface ProfileSetupProps {
  /** Display name to seed initials/greeting. */
  name?: string;
  /** Avatar image URI when the user already has one. */
  avatarUri?: string;
  /** Fires when the avatar affordance is tapped (host opens a picker). */
  onEditAvatar?: () => void;
  /** Editable fields (name/bio/etc). Controlled via `values`. */
  fields?: ProfileField[];
  /** Current field values keyed by `ProfileField.id`. */
  values?: Record<string, string>;
  /** Fires with `(id, text)` on each edit. */
  onChangeField?: (id: string, value: string) => void;
  /** Heading. Default `'Set up your profile'`. */
  title?: string;
  /** Save CTA copy. Default `'Save profile'`. */
  saveLabel?: string;
  /** Fires on save. */
  onSave?: () => void;
  /** Save spinner + block. */
  loading?: boolean;
  /** "Skip for now" link copy. Hidden without `onSkip`. */
  skipLabel?: string;
  /** Fires on skip. */
  onSkip?: () => void;
  /** Supporting line under the headline (§4). */
  subtitle?: string;
  /**
   * Hero art for the step (§3). When absent the avatar editor is the hero —
   * this screen always has something to show, so the panel is never empty.
   */
  illustration?: React.ReactNode;
  /** Copy under the avatar. Default `'Add photo'`. */
  avatarActionLabel?: string;
  /**
   * Header progress slot (§1/§2) — pass the segmented bars, e.g.
   * `<ProgressDots variant="bars" count={4} activeIndex={1} />`.
   */
  progress?: React.ReactNode;
  /** Renders the header's back control. */
  onBack?: () => void;
  /** Renders the header's dismiss (✕) control. */
  onDismiss?: () => void;
  /** Form-level error, shown above the CTA in `dangerText` beside a glyph. */
  error?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Profile setup step — the "What should we call you?" screen, rebuilt to the
 * anatomy in `ONBOARDING-DESIGN-SPEC.md`: an optional header (back · progress ·
 * dismiss), the avatar editor sitting in the hero panel, a centred headline
 * block, the §6 field stack, and the sticky CTA footer.
 *
 * The old screen was a bare 40px box under a small left-aligned label with a
 * short flat button floating mid-page. Per §6 each field is now **56 tall** with
 * `radius.lg`, a 1px `border` that rises to `primary` on focus and to `danger`
 * on error, and a leading icon; per §5 the save action is a full-width button in
 * a footer band with a hairline divider above it and a muted "skip" link
 * beneath — never beside — it.
 *
 * Fully controlled: the host owns `values` and gets `(id, text)` callbacks.
 * Field access is guarded through the `values` map so a missing key renders
 * empty, never crashes, and an empty `fields` array renders the screen without
 * a form rather than a broken one. Every new prop is optional. No literal
 * colors.
 */
export function ProfileSetup({
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
}: ProfileSetupProps): React.ReactElement {
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
    <View style={[{ gap: tokens.spacing.lg }, style]}>
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

      {/* Hero slot — the avatar editor is this screen's own artwork (§3). */}
      <View
        style={{
          alignSelf: 'stretch',
          aspectRatio: HERO_ASPECT,
          maxHeight: screenHeight * HERO_MAX_SCREEN_FRACTION,
          borderRadius: tokens.radius.lg,
          backgroundColor: tintedGround,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: tokens.spacing.lg,
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
      </View>

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
            // Focus wins over nothing, error wins over focus: a field the user
            // is fixing should still read as wrong until it is.
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
                    accessibilityState={{ disabled: false }}
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
  );
}
