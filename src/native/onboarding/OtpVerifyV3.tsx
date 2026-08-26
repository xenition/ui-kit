import * as React from 'react';
import {
  Pressable,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Progress, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import type { OtpVerifyProps } from './OtpVerify';

/** Drop-in for {@link OtpVerify} — identical props, different design. */
export type OtpVerifyV3Props = OtpVerifyProps;

/** §10: geometry only — 56 is the code-cell height, 44 the minimum tap target. */
const CELL_HEIGHT = 56;
const TAP_TARGET = 44;
const DEFAULT_RESEND_INTERVAL = 30;

/**
 * Code verification — V3, the compact line. No hero panel: a small badge sits
 * beside a left-aligned headline and the rows tighten, so the step fits a sheet
 * over the screen the user was already on.
 *
 * The code cells keep their 56 height — a shrunk digit box is a box nobody can
 * hit, and density is not worth a mistyped code. `illustration` is deliberately
 * ignored; `logoGlyph` drives the small leading badge.
 *
 * Same props as {@link OtpVerify}. Token-pure.
 */
export function OtpVerifyV3({
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
  logoGlyph,
  progress,
  onBack,
  onDismiss,
  resendInterval = DEFAULT_RESEND_INTERVAL,
  resendNotice,
  resendPrompt = "Didn't get the code?",
  style,
}: OtpVerifyV3Props): React.ReactElement {
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
  const headline = title ?? (destination ? `Enter the code sent to ${destination}` : undefined);

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
      {headline != null || subtitle != null ? (
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
            <Icon glyph={logoGlyph ?? '✉'} size="lg" color="primary" />
          </View>
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            {headline != null ? (
              <Text accessibilityRole="header" size="lg" weight="bold" tone="onSurface" numberOfLines={2}>
                {headline}
              </Text>
            ) : null}
            {subtitle ? (
              <Text size="sm" tone="muted" numberOfLines={2}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', gap: tokens.spacing.xs, alignSelf: 'stretch' }}>
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
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
        >
          <Icon name="error" size="sm" color="danger" />
          <Text size="sm" tone="dangerText">
            {error}
          </Text>
        </View>
      ) : null}

      <View style={{ gap: tokens.spacing.xs, alignSelf: 'stretch' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
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
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
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
          paddingTop: tokens.spacing.sm,
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
