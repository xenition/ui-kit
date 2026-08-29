import * as React from 'react';
import {
  Pressable,
  TextInput,
  View,
  useWindowDimensions,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInputKeyPressEventData,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Progress, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';

/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: 56 — the height a §6 field stands at, which the code cells now match —
  and 44, the minimum tap target for a header control or a text link (§7). Every
  colour, radius, gap and font size on this screen comes from the theme.
*/
const CELL_HEIGHT = 56;
const TAP_TARGET = 44;

/** §3: the hero panel is roughly 4:3 and never eats more than ~38% of the screen. */
const HERO_ASPECT = 4 / 3;
const HERO_MAX_SCREEN_FRACTION = 0.38;

/** Default cooldown length, in seconds, for the resend progress bar. */
const DEFAULT_RESEND_INTERVAL = 30;

export interface OtpVerifyProps {
  /** The channel the code was sent to (e.g. a phone number or email). */
  destination?: string;
  /** Number of digits. Default `6`. */
  length?: number;
  /** Controlled code value. */
  value: string;
  /** Fires with the joined code on every keystroke. */
  onChange: (value: string) => void;
  /** Fires when the user confirms (or the code auto-fills to full length). */
  onVerify?: (code: string) => void;
  /** Fires when the user taps "Resend code". */
  onResend?: () => void;
  /** Error message shown under the inputs (e.g. `'That code didn't match'`). */
  error?: string;
  /** Verify button spinner + block. */
  loading?: boolean;
  /** Seconds until resend is available; disables the resend link until 0. */
  resendCountdown?: number;
  /** Verify button copy. Default `'Verify'`. */
  verifyLabel?: string;
  /** Auto-fire `onVerify` once the code reaches `length`. Default `true`. */
  autoSubmit?: boolean;
  /**
   * Headline above the code field (§4). Omitted by default so a host that
   * already prints its own screen title does not end up with two.
   */
  title?: string;
  /** Supporting line under the headline (§4). Defaults to the "sent to" line. */
  subtitle?: string;
  /** Hero art for the step (§3). Rendered in a centred, tinted panel. */
  illustration?: React.ReactNode;
  /** Glyph for the fallback hero medallion when `illustration` is absent (§3). */
  logoGlyph?: string;
  /**
   * Header progress slot (§1/§2) — pass the segmented bars, e.g.
   * `<ProgressDots variant="bars" count={4} activeIndex={3} />`.
   */
  progress?: React.ReactNode;
  /** Renders the header's back control. */
  onBack?: () => void;
  /** Renders the header's dismiss (✕) control. */
  onDismiss?: () => void;
  /**
   * Full length of the resend cooldown in seconds — what `resendCountdown`
   * counts down *from*. Drives the draining bar under the resend row so the
   * wait is visible rather than a number that mysteriously changes. Default 30.
   */
  resendInterval?: number;
  /**
   * Confirmation shown after a resend ("Code sent"), announced politely. The
   * whole reason a user taps resend three times is that the first tap looked
   * like nothing happened.
   */
  resendNotice?: string;
  /** Copy beside the resend link. Default `"Didn't get the code?"`. */
  resendPrompt?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One-time-code verification — the code-entry step, rebuilt to the anatomy in
 * `ONBOARDING-DESIGN-SPEC.md`: an optional header (back · progress · dismiss),
 * a hero slot, a headline block, the code field, and the sticky CTA footer.
 *
 * **The code cells are owned here rather than delegated to `PinInput`.** §6
 * requires an error state that raises the field's border to `danger` alongside
 * a `dangerText` message — never colour alone — and `PinInput` has no error or
 * focus contract to express that. The cells keep `PinInput`'s behaviour exactly
 * (single character each, focus advances on entry, backspace retreats) at the
 * §6 geometry: 56 tall, `radius.lg`, a 1px border that rises to `primary` on
 * focus.
 *
 * The **resend affordance shows its cooldown**: the label counts down, a
 * draining bar shows how much of the wait is left, and `resendNotice` confirms
 * the send in a polite live region. A user who cannot tell whether resend
 * worked taps it again, and again — which is how an account ends up
 * rate-limited by its own verification screen.
 *
 * When `autoSubmit` is on it fires `onVerify` as soon as the code fills,
 * matching the SMS-autofill idiom. Every new prop is optional. No literal
 * colors.
 */
export function OtpVerify({
  destination,
  length = 6,
  value,
  onChange,
  onVerify,
  onResend,
  error,
  loading = false,
  resendCountdown,
  verifyLabel = 'Verify',
  autoSubmit = true,
  title,
  subtitle,
  illustration,
  logoGlyph,
  progress,
  onBack,
  onDismiss,
  resendInterval = DEFAULT_RESEND_INTERVAL,
  resendNotice,
  resendPrompt = "Didn't get the code?",
  style,
}: OtpVerifyProps): React.ReactElement {
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
  const refs = React.useRef<Array<TextInput | null>>([]);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

  const chars = Array.from({ length }, (_, i) => value[i] ?? '');
  const invalid = error != null && error !== '';

  const setChar = (i: number, c: string): void => {
    const ch = c.slice(-1);
    const next = chars.slice();
    next[i] = ch;
    const joined = next.join('');
    onChange(joined);
    if (ch && i < length - 1) refs.current[i + 1]?.focus();
    if (autoSubmit && joined.length === length) onVerify?.(joined);
  };

  const onKeyPress = (i: number, e: NativeSyntheticEvent<TextInputKeyPressEventData>): void => {
    if (e.nativeEvent.key === 'Backspace' && !chars[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const remaining = Math.max(0, resendCountdown ?? 0);
  const canResend = resendCountdown == null || resendCountdown <= 0;
  const interval = resendInterval > 0 ? resendInterval : DEFAULT_RESEND_INTERVAL;
  const elapsed = Math.max(0, interval - Math.min(remaining, interval));

  const showHeader = onBack != null || onDismiss != null || progress != null;
  const showHero = illustration != null || logoGlyph != null;

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

      {showHero ? (
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
            <View
              style={{
                width: TAP_TARGET * 2,
                height: TAP_TARGET * 2,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
              }}
            >
              <Icon glyph={logoGlyph} size="3xl" color="onPrimary" />
            </View>
          )}
        </View>
      ) : null}

      {title != null || subtitle != null ? (
        <View style={{ gap: tokens.spacing.sm }}>
          {title ? (
            <Text accessibilityRole="header" size="2xl" weight="bold" tone="onSurface" align="center" numberOfLines={2}>
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text size="base" tone="muted" align="center" numberOfLines={3}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      ) : null}

      {subtitle == null && destination ? (
        <Text size="base" tone="muted" align="center">
          Enter the code we sent to{' '}
          <Text size="base" weight="bold" tone="onSurface">
            {destination}
          </Text>
        </Text>
      ) : null}

      {/* §6 code field — 56 tall, radius.lg, border rises to primary on focus
          and holds at danger while the code is wrong. */}
      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignSelf: 'stretch' }}>
        {chars.map((c, i) => {
          const borderColor = invalid ? colors.danger : focusedIndex === i ? colors.primary : colors.border;
          return (
            <TextInput
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              accessibilityLabel={`Digit ${i + 1}`}
              keyboardType="numeric"
              maxLength={1}
              value={c}
              onChangeText={(t) => setChar(i, t)}
              onKeyPress={(e) => onKeyPress(i, e)}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex((current) => (current === i ? null : current))}
              style={{
                flex: 1,
                maxWidth: CELL_HEIGHT,
                height: CELL_HEIGHT,
                textAlign: 'center',
                fontSize: tokens.typography.scale.lg,
                fontWeight: '600',
                color: colors.onSurface,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor,
                borderRadius: tokens.radius.lg,
              }}
            />
          );
        })}
      </View>

      {invalid ? (
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

      {/* Resend, with the wait made visible. */}
      <View style={{ gap: tokens.spacing.xs, alignSelf: 'stretch' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }}>
          <Text size="sm" tone="muted">
            {resendPrompt}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Resend code"
            accessibilityState={{ disabled: !canResend }}
            disabled={!canResend}
            onPress={onResend}
            style={{ minHeight: TAP_TARGET, justifyContent: 'center' }}
          >
            <Text size="sm" weight="semibold" tone={canResend ? 'primary' : 'muted'}>
              {canResend ? 'Resend code' : `Resend in ${remaining}s`}
            </Text>
          </Pressable>
        </View>
        {!canResend ? <Progress value={elapsed} max={interval} size="sm" /> : null}
        {resendNotice ? (
          <View
            accessibilityLiveRegion="polite"
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }}
          >
            <Icon name="check" size="sm" color="success" />
            <Text size="sm" tone="successText">
              {resendNotice}
            </Text>
          </View>
        ) : null}
      </View>

      <View
        style={{
          marginTop: 'auto',
          alignSelf: 'stretch',
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          paddingTop: tokens.spacing.md,
          paddingBottom: tokens.spacing.lg,
        }}
      >
        <GetStartedButton
          label={verifyLabel} trailingArrow={false}
          loading={loading}
          disabled={value.length < length}
          onPress={() => onVerify?.(value)}
        />
      </View>
    </View>
  );
}
