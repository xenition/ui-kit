import * as React from 'react';
import { Pressable, TextInput, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { fieldAccent, haloStyle } from '../primitives/internal/field-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { amountValue, useAmountField } from '../../crypto/amount-v4';
import { TABULAR, spokenLine } from './internal/market-v4';
import { formatToken } from './internal/format';
import type { SwapFormProps } from './SwapForm';

export interface SwapFormV4Props extends SwapFormProps {
  /** Fraction digits the pay field will accept. Default `18` — one wei. */
  maxDecimals?: number;
  /** Name of the swap-direction control. Default `'Flip direction'`. */
  flipLabel?: string;
  /** Shown and announced while a quote is in flight. Default `'Fetching quote'`. */
  loadingLabel?: string;
}

/**
 * **V4 swap panel** — same props as {@link SwapForm} plus `maxDecimals`,
 * `flipLabel` and `loadingLabel`.
 *
 * ## Seven changes
 *
 * 1. **A decimal amount can be typed.** This is the whole reason the component
 *    has a V4. The base field was fully controlled off a **number** —
 *    `value={fromAmount === 0 ? '' : String(fromAmount)}` with
 *    `onChangeText={(t) => emit(parseAmount(t))}` — and `parseFloat('1.')` is
 *    `1`, so the instant the user typed the decimal point the parent was
 *    handed `1`, the field re-rendered as `"1"`, and the point vanished from
 *    under the caret. A leading `0` collapsed to `''` and disappeared
 *    outright. Only whole token units could ever be entered, in the one
 *    component in the kit whose submit hands a value to a chain transaction: a
 *    user swapping 0.25 typed `0`, saw nothing, typed `.`, saw nothing, typed
 *    `2`, and submitted **2**. `useAmountField` holds the draft as text, emits
 *    the parsed number, and only overwrites the draft when the parent's value
 *    genuinely disagrees with what is on screen.
 * 2. **The pay field shows focus.** It is the form's only editable control and
 *    the base gave it no focus treatment at all; the panel now takes the
 *    shared field ring and halo while the caret is in it.
 * 3. **Both amounts are tabular.** The receive side was and the pay side was
 *    not, so the two large stacked figures did not line up digit for digit.
 * 4. **The quote is not replaced by its own label.** `accessibilityLabel`
 *    sat on the very `Text` whose content *was* the quote, so a reader heard
 *    "Receive amount" and never the number. The panel is one named element
 *    that contains it.
 * 5. **The flip control is a target.** 32pt became {@link minTap}, and it now
 *    has a disabled state instead of looking identical when there is no
 *    `onFlip` to fire.
 * 6. **`loading` blocks submit** and says so, rather than only spinning.
 * 7. **The same-token hint is announced.** It is a condition present from the
 *    first render, so it is plain text rather than an urgent interruption —
 *    but it is text a reader reaches, which on this twin it was not.
 */
export function SwapFormV4({
  from,
  to,
  fromAmount = 0,
  rate,
  maxDecimals = 18,
  flipLabel = 'Flip direction',
  loadingLabel = 'Fetching quote',
  onChange,
  onFlip,
  onSubmit,
  submitLabel = 'Swap',
  loading = false,
  style,
}: SwapFormV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const emit = React.useCallback(
    (amount: number): void => {
      onChange?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: amount });
    },
    [from.symbol, to.symbol, onChange]
  );

  const pay = useAmountField(fromAmount, emit, maxDecimals);
  const [focused, setFocused] = React.useState(false);

  // The draft is the truth on screen, so it is the value that submits. When a
  // parent controls `fromAmount` the two agree by construction; when nothing
  // is listening — the barrel's own one-liner — the panel still works.
  const typed = amountValue(pay.text);
  const toAmount = rate != null ? typed * rate : undefined;
  const sameToken = from.symbol === to.symbol;
  const canSubmit = typed > 0 && !sameToken && !loading;

  const toText =
    toAmount != null ? formatToken(toAmount, { decimals: to.decimals ?? 4 }) : '—';
  const tap = minTap(tokens.spacing);

  const panelStyle: ViewStyle = {
    gap: tokens.spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: tokens.radius.md,
    backgroundColor: colors.card,
    padding: tokens.spacing.md,
  };

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {/* The halo reserves its own space whether or not it is showing, so
          focusing the field never nudges the panel below it. */}
      <View style={haloStyle(theme, {
        showing: focused,
        accent: fieldAccent(theme, false),
        radius: tokens.radius.md,
      })}
      >
        <View style={[panelStyle, { borderColor: focused ? colors.ring : colors.border }]}>
          <TextV4 size="xs" weight="semibold" tone="mutedText">
            You pay
          </TextV4>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
          >
            <TextInput
              accessibilityLabel="Pay amount"
              keyboardType="decimal-pad"
              value={pay.text}
              placeholder="0.0"
              placeholderTextColor={colors.mutedText}
              onChangeText={pay.setText}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                flex: 1,
                minHeight: tap,
                color: colors.onCard,
                fontFamily: tokens.typography.fontBody,
                fontSize: tokens.typography.scale.xl,
                fontWeight: '700',
                padding: 0,
                ...TABULAR,
              }}
            />
            <TextV4 size="base" weight="bold" tone="onCard">
              {from.symbol}
            </TextV4>
          </View>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={flipLabel}
        accessibilityState={{ disabled: !onFlip }}
        onPress={onFlip}
        disabled={!onFlip}
        style={({ pressed }) => ({
          alignSelf: 'center',
          width: tap,
          height: tap,
          borderRadius: tokens.radius.full,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: pressed
            ? pressOver(theme, colors.surface, colors.onSurface)
            : colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabledOpacity(theme.state, !onFlip),
        })}
      >
        <TextV4
          size="base"
          tone="onSurface"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          ⇅
        </TextV4>
      </Pressable>

      {/* One named element that CONTAINS the quote, rather than a label
          sitting on the quote and replacing it. */}
      <View accessible accessibilityLabel={spokenLine(['You receive', toText, to.symbol])}>
        <View style={panelStyle}>
          <TextV4 size="xs" weight="semibold" tone="mutedText">
            You receive
          </TextV4>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
          >
            <TextV4
              size="xl"
              weight="bold"
              numeric="tabular"
              tone={toAmount != null ? 'onCard' : 'mutedText'}
              style={{ flex: 1 }}
            >
              {toText}
            </TextV4>
            <TextV4 size="base" weight="bold" tone="onCard">
              {to.symbol}
            </TextV4>
          </View>
        </View>
      </View>

      {rate != null ? (
        <TextV4 size="xs" tone="mutedText" numeric="tabular">
          {`1 ${from.symbol} ≈ ${formatToken(rate, { decimals: to.decimals ?? 4 })} ${to.symbol}`}
        </TextV4>
      ) : null}

      {sameToken ? (
        <TextV4 size="xs" tone="dangerText">
          Choose two different tokens.
        </TextV4>
      ) : null}

      {loading ? (
        <TextV4 size="xs" tone="mutedText" accessibilityLiveRegion="polite">
          {loadingLabel}
        </TextV4>
      ) : null}

      <ButtonV4
        onPress={() =>
          onSubmit?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: typed })
        }
        disabled={!canSubmit}
        loading={loading}
      >
        {submitLabel}
      </ButtonV4>
    </View>
  );
}
