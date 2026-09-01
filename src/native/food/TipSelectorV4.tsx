import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney as defaultFormat } from '../commerce';
import { onPair, spokenLine } from './internal/menu-v4';
import type { TipSelectorProps } from './TipSelector';

export interface TipSelectorV4Props extends TipSelectorProps {
  /** The "no tip" option's label. Default `'No tip'`. */
  noTipLabel?: string;
  /**
   * The option selected on first render when `selectedPercent` is not given.
   * Default `null` — "no tip", which is where the base always sat.
   *
   * This is what makes the control usable uncontrolled: pass
   * `selectedPercent` to drive it from outside, or leave it off and let the
   * component hold the choice.
   */
  defaultSelectedPercent?: number | null;
}

const DEFAULT_PERCENTS = [10, 15, 20, 25];

/**
 * **V4 tip selector** — same props as {@link TipSelector} plus `noTipLabel`
 * and `defaultSelectedPercent`.
 *
 * ## Four changes
 *
 * 1. **It works uncontrolled.** `selectedPercent` was optional, the component
 *    held no state, and `selected` was recomputed from props on every render —
 *    so dropped in the way its own barrel documents it rendered "No tip"
 *    filled and `checked` **forever**, and every tap emitted `onSelect` while
 *    nothing on screen moved. `defaultSelectedPercent` gives the choice
 *    somewhere to live; passing `selectedPercent` still drives it from outside.
 * 2. **An option clears 44.** They were about 34 tall.
 * 3. **The computed amount is tabular**, so four options in a row have their
 *    figures on one grid instead of four.
 * 4. **Press is a state layer.** `opacity: 0.85` on press put a live control
 *    inside the band M3 spends on *disabled*, so tapping a tip option made it
 *    look unavailable for as long as the finger was down.
 */
export function TipSelectorV4({
  percents = DEFAULT_PERCENTS,
  selectedPercent,
  defaultSelectedPercent = null,
  onSelect,
  subtotalCents,
  currency = 'USD',
  title = 'Add a tip',
  allowNone = true,
  noTipLabel = 'No tip',
  formatMoney = defaultFormat,
  style,
}: TipSelectorV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tap = minTap(tokens.spacing);

  // Controlled the moment the caller names a value — `null` is a value here
  // ("no tip"), so `undefined` is the only signal that means "you hold it".
  const controlled = selectedPercent !== undefined;
  const [held, setHeld] = React.useState<number | null>(defaultSelectedPercent);
  const current = controlled ? (selectedPercent ?? null) : held;

  interface Choice {
    key: string;
    percent: number | null;
    label: string;
  }
  const choices: Choice[] = [
    ...(allowNone ? [{ key: 'none', percent: null as number | null, label: noTipLabel }] : []),
    ...percents.map((p) => ({ key: String(p), percent: p as number | null, label: `${p}%` })),
  ];

  const choose = (percent: number | null): void => {
    if (!controlled) setHeld(percent);
    onSelect?.(percent);
  };

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {title ? (
        <TextV4 accessibilityRole="header" size="base" weight="semibold" tone="onSurface">
          {title}
        </TextV4>
      ) : null}
      <View accessibilityRole="radiogroup" style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
        {choices.map((choice) => {
          const selected = choice.percent === null ? current === null : current === choice.percent;
          const amount =
            choice.percent !== null && typeof subtotalCents === 'number'
              ? Math.round((subtotalCents * choice.percent) / 100)
              : null;
          const amountText = amount !== null ? formatMoney(amount, currency) : null;
          const ground = selected ? colors.primary : colors.card;
          const ink = selected ? onPair(theme, 'primary') : colors.onCard;

          return (
            <Pressable
              key={choice.key}
              accessibilityRole="radio"
              accessibilityState={{ selected, checked: selected }}
              accessibilityLabel={spokenLine([choice.label, amountText])}
              onPress={() => choose(choice.percent)}
              style={({ pressed }) => ({
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.xs / 2,
                minHeight: tap,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: pressed ? pressOver(theme, ground, ink) : ground,
              })}
            >
              <TextV4 size="sm" weight="bold" style={{ color: ink }}>
                {choice.label}
              </TextV4>
              {amountText != null ? (
                <TextV4
                  size="xs"
                  numeric="tabular"
                  style={{ color: selected ? ink : colors.mutedText }}
                >
                  {amountText}
                </TextV4>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
