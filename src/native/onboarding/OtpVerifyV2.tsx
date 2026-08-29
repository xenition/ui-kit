import * as React from 'react';
import {
  Pressable,
  TextInput,
  View,
  useWindowDimensions,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Progress, Text } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { GetStartedButton } from './GetStartedButton';
import type { OtpVerifyProps } from './OtpVerify';

/** Drop-in for {@link OtpVerify} — identical props, different design. */
export type OtpVerifyV2Props = OtpVerifyProps;

/** §10: geometry only — 56 is the code-cell height, 44 the minimum tap target. */
const CELL_HEIGHT = 56;
const TAP_TARGET = 44;
/** §3: the hero never eats more than ~38% of the screen, even full-bleed. */
const HERO_MAX_SCREEN_FRACTION = 0.38;
const DEFAULT_RESEND_INTERVAL = 30;

/**
 * Code verification — V2, the editorial line. The hero runs full-bleed to the
 * top edge and the content sheet rises over the seam carrying the headline, the
 * §6 code cells and the sticky CTA. The cells keep the base line's contract
 * exactly: 56 tall, focus raises the border to `primary`, an error holds it at
 * `danger` and prints the message — never colour alone.
 *
 * Same props as {@link OtpVerify}. Token-pure.
 */
export function OtpVerifyV2({
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
}: OtpVerifyV2Props): React.ReactElement {
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
            <Icon glyph={logoGlyph ?? '✉'} size="3xl" color="onPrimary" />
          </View>
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
    </View>
  );
}
