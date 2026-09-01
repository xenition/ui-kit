import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney } from '../commerce/money';
import { TEMPERATURE_META } from './internal';
import { BADGE_V4, clampPercent, spokenLine, TABULAR, toneInkOf } from './internal/crm-v4';
import type { LeadRowProps } from './LeadRow';

export interface LeadRowV4Props extends LeadRowProps {
  /** Unit for the score, used in the accessible name. Default `'Score'`. */
  scoreLabel?: string;
  /** How the score is spelled. Default the bare clamped number. */
  formatScore?: (score: number) => string;
}

/**
 * **V4 lead row** — same props as {@link LeadRow} plus `scoreLabel` and
 * `formatScore`.
 *
 * ## Seven changes
 *
 * 1. **The score badge stops being coloured by temperature.** It took its tone
 *    from `TEMPERATURE_META`, so a lead scored **5** rendered a `danger` badge
 *    purely because the lead was `hot` — the colour said nothing about the
 *    number inside it, and a status colour was spent on identity. The badge is
 *    `neutral`; temperature keeps its own glyph and word.
 * 2. **The score carries a unit.** A bare `72` announced as the number
 *    seventy-two and nothing else; `scoreLabel` names it.
 * 3. **`selected` is announced and marked by more than a border colour** — it
 *    gains the leading accent bar the native docblock has always claimed, plus
 *    `accessibilityState`.
 * 4. **The row is only a button when it is interactive.** The base set
 *    `accessibilityRole="button"` unconditionally with `disabled={!onPress}`,
 *    so a plain row announced as a **disabled button**.
 * 5. **The temperature column fits its own label.** "Warm" at 12px does not
 *    fit 28px and nothing truncated it; the column is a full tap width and the
 *    label may wrap.
 * 6. **The glyph scales with Dynamic Type.** It carried
 *    `allowFontScaling={false}` while the word beside it scaled, so the pair
 *    came apart at larger text sizes.
 * 7. **Money is tabular**, plus rules A, B and C.
 *
 * **Renders nothing without a `name`.**
 */
export function LeadRowV4({
  name,
  company,
  temperature,
  valueCents,
  currency = 'USD',
  score,
  avatarUrl,
  selected = false,
  scoreLabel = 'Score',
  formatScore,
  onPress,
  testID,
  style,
}: LeadRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const meta = TEMPERATURE_META[temperature];
  const tempInk = toneInkOf(theme, meta.tone);
  const tap = minTap(tokens.spacing);
  const money = valueCents != null ? formatMoney(valueCents, currency) : null;
  const scoreValue = score != null ? Math.round(clampPercent(score) ?? 0) : null;
  const scoreText = scoreValue != null ? (formatScore ?? ((n: number) => `${n}`))(scoreValue) : null;

  const label = spokenLine([
    `${meta.label} lead`,
    name,
    company,
    money,
    scoreText != null ? `${scoreLabel} ${scoreText}` : null,
  ]);

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          minHeight: tap,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: pressed
            ? pressOver(theme, selected ? colors.selected : colors.surface, colors.onSurface)
            : selected
              ? colors.selected
              : colors.surface,
        },
        style,
      ]}
    >
      {/* The leading accent bar the docblock always described. Selection is a
          shape and a ground, not one border colour. */}
      {selected ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            width: tokens.spacing.xs / 2,
            alignSelf: 'stretch',
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
          }}
        />
      ) : null}

      <View style={{ alignItems: 'center', width: tap }}>
        <TextV4 size="lg" style={{ color: tempInk }}>
          {meta.glyph}
        </TextV4>
        <TextV4 size="xs" weight="bold" align="center" style={{ color: tempInk }}>
          {meta.label}
        </TextV4>
      </View>

      <AvatarV4 size="sm" name={name} src={avatarUrl} />

      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <TextV4 size="sm" weight="semibold" tone="onSurface" numberOfLines={1}>
          {name}
        </TextV4>
        {company ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {company}
          </TextV4>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }}>
        {money ? (
          <TextV4 size="sm" weight="bold" tone="onSurface" style={TABULAR}>
            {money}
          </TextV4>
        ) : null}
        {scoreText != null ? (
          <BadgeV4 {...BADGE_V4} tone="neutral">
            {scoreText}
          </BadgeV4>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={label} accessibilityState={{ selected }} testID={testID}>
        {content(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      testID={testID}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}
