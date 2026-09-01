import * as React from 'react';
import {
  Pressable,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { fieldBorder, fieldMetrics, haloStyle } from '../primitives/internal/field-v4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressLayer } from '../primitives/internal/state-v4';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  FlowScreenV4,
  flowGrounds,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import type { OtpVerifyProps } from './OtpVerify';

export interface OtpVerifyV4Props extends OtpVerifyProps, OnboardingFlowV4Props {
  /**
   * Render as a whole screen — the shared shell, so the CTA clears the home
   * indicator and taps land while the keypad is up. Default `false`.
   */
  fullScreen?: boolean;
  /**
   * Copy for the resend action while it is available. Default `'Resend code'`.
   */
  resendLabel?: string;
  /**
   * Copy while the user must wait. Default `'Resend in 30s'`.
   *
   * A function, not a template string, because "in 30s" is not how every
   * language says it — and the base hard-coded the English one inside the
   * component where a host could not reach it.
   */
  formatResendCountdown?: (seconds: number) => string;
  /**
   * Accessible name for cell `n` of `length`. Default `'Digit 3 of 6'`.
   *
   * The base announced "Digit 3" with no total, so a screen-reader user had no
   * way to know how long the code was.
   */
  formatDigitLabel?: (position: number, total: number) => string;
  /** Copy for the sent-to line when no `subtitle` is given. */
  formatDestination?: (destination: string) => string;
}

/** Default seconds between resends when the caller supplies no interval. */
const DEFAULT_RESEND_INTERVAL = 30;

/**
 * **V4 code verification** — the base's props plus `fullScreen` and four copy
 * hooks, all optional.
 *
 * ## Five changes
 *
 * 1. **The cells are on the shared field metrics.** `fieldMetrics()`,
 *    `fieldBorder()` and `haloStyle()` — the same height, radius, border and
 *    focus halo `InputV4` and every other V4 control take. The base picked its
 *    own `CELL_HEIGHT`, its own radius and its own focus colour, so the code
 *    field was visibly a different control from the email field one screen
 *    earlier.
 * 2. **Focus does not move the layout.** The halo's space is reserved whether
 *    or not it shows, so tapping a cell no longer nudges the row.
 * 3. **Every English string is a prop.** `resendLabel`,
 *    `formatResendCountdown`, `formatDigitLabel`, `formatDestination` — four
 *    sentences that were unreachable inside a module whose contract is that
 *    copy is caller-supplied.
 * 4. **The digit label carries the total** ("Digit 3 of 6").
 * 5. **`fullScreen`** — the shared shell.
 *
 * `PinInputV4` is deliberately **not** composed here. It takes exactly its
 * base's props (`length`, `value`, `onChange`) and therefore has no way to
 * express an invalid code — and a verification screen that cannot show a wrong
 * code is not a verification screen. Closing that gap belongs in `PinInput`,
 * per the design spec's Addendum, not in a private fork here; until it is
 * closed these cells carry the shared field metrics so the two still match.
 */
export function OtpVerifyV4({
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
  resendLabel = 'Resend code',
  formatResendCountdown,
  formatDigitLabel,
  formatDestination,
  fullScreen = false,
  ground = 'plain',
  accent = 'primary',
  style,
}: OtpVerifyV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const grounds = flowGrounds(theme, ground, accent);
  const metrics = fieldMetrics(theme);

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

  const showHero = illustration != null || logoGlyph != null;
  const digitLabel = formatDigitLabel ?? ((n: number, total: number) => `Digit ${n} of ${total}`);
  const countdownLabel =
    formatResendCountdown ?? ((seconds: number) => `Resend in ${seconds}s`);

  const cells = (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignSelf: 'stretch' }}>
      {chars.map((c, i) => {
        const focused = focusedIndex === i;
        return (
          <View
            key={i}
            style={[
              { flex: 1, maxWidth: metrics.height + metrics.ring * 2 },
              haloStyle(theme, { showing: focused, accent: colors.ring }),
            ]}
          >
            <TextInput
              ref={(el) => {
                refs.current[i] = el;
              }}
              accessibilityLabel={digitLabel(i + 1, length)}
              keyboardType="numeric"
              maxLength={1}
              value={c}
              onChangeText={(t) => setChar(i, t)}
              onKeyPress={(e) => onKeyPress(i, e)}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex((current) => (current === i ? null : current))}
              style={[
                {
                  height: metrics.height,
                  textAlign: 'center',
                  fontSize: tokens.typography.scale.lg,
                  fontWeight: '600',
                  color: colors.onSurface,
                  backgroundColor: colors.surface,
                  borderRadius: metrics.radius,
                },
                fieldBorder(theme, { invalid, focused }),
              ]}
            />
          </View>
        );
      })}
    </View>
  );

  const body = (
    <>
      {showHero ? (
        <FlowHeroV4 illustration={illustration} logoGlyph={logoGlyph} grounds={grounds} />
      ) : null}

      <FlowHeadlineV4 title={title ?? ''} subtitle={subtitle} />

      {subtitle == null && destination ? (
        <TextV4 size="base" tone="mutedText" align="center">
          {formatDestination ? (
            formatDestination(destination)
          ) : (
            <>
              Enter the code we sent to{' '}
              <TextV4 size="base" weight="bold" tone="onSurface">
                {destination}
              </TextV4>
            </>
          )}
        </TextV4>
      ) : null}

      {cells}

      {invalid ? (
        <View
          accessibilityLiveRegion="assertive"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
          }}
        >
          <IconV4 name="error" size="sm" color="dangerText" />
          <TextV4 size="sm" tone="dangerText">
            {error}
          </TextV4>
        </View>
      ) : null}

      {/* Resend, with the wait made visible rather than only counted down. */}
      <View style={{ gap: tokens.spacing.xs, alignSelf: 'stretch' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
          }}
        >
          <TextV4 size="sm" tone="mutedText">
            {resendPrompt}
          </TextV4>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={resendLabel}
            accessibilityState={{ disabled: !canResend }}
            disabled={!canResend}
            onPress={onResend}
            style={({ pressed }) => ({
              minHeight: minTap(tokens.spacing),
              justifyContent: 'center',
              paddingHorizontal: tokens.spacing.xs,
              borderRadius: tokens.radius.md,
              backgroundColor: pressed ? pressLayer(theme) : 'transparent',
            })}
          >
            <TextV4
              size="sm"
              weight="semibold"
              tone={canResend ? 'primaryText' : 'mutedText'}
              numeric="tabular"
            >
              {canResend ? resendLabel : countdownLabel(remaining)}
            </TextV4>
          </Pressable>
        </View>
        {!canResend ? <ProgressV4 value={elapsed} max={interval} size="sm" /> : null}
        {resendNotice ? (
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
            <TextV4 size="sm" tone="successText">
              {resendNotice}
            </TextV4>
          </View>
        ) : null}
      </View>
    </>
  );

  const header = <FlowHeaderV4 onBack={onBack} onDismiss={onDismiss} progress={progress} />;

  const footer = (
    <FlowFooterV4 safeArea={fullScreen}>
      <GetStartedButtonV4
        label={verifyLabel}
        trailingArrow={false}
        loading={loading}
        disabled={value.length < length}
        onPress={() => onVerify?.(value)}
      />
    </FlowFooterV4>
  );

  if (fullScreen) {
    return (
      <FlowScreenV4
        grounds={grounds}
        center={false}
        keyboardAware
        header={header}
        footer={footer}
        style={style}
      >
        {body}
      </FlowScreenV4>
    );
  }

  return (
    <View style={[{ gap: tokens.spacing.lg }, style]}>
      {onBack != null || onDismiss != null || progress != null ? header : null}
      {body}
      <View style={{ marginTop: 'auto', alignSelf: 'stretch' }}>{footer}</View>
    </View>
  );
}
