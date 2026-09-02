import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';
import { allocationParts } from '../../insurance/coverage-v4';
import {
  BENEFICIARY_KIND_V4,
  DECORATIVE,
  chipStyle,
  spokenLine,
  toneInk,
} from './internal/tone-v4';
import type { BeneficiaryRowProps } from './BeneficiaryRow';

export interface BeneficiaryRowV4Props extends BeneficiaryRowProps {
  /**
   * What the **whole set** of beneficiaries allocates, as a whole percentage.
   *
   * A row only ever holds its own share, so it cannot tell on its own whether
   * the set adds up. Hand it the set's total and it will say when the set does
   * not balance. Omit it and the row behaves exactly as the base did.
   */
  allocationTotal?: number;
  /**
   * Warn the reader that the set does not add to 100%. Receives the signed
   * difference — `+50` over-allocated, `-20` under.
   *
   * Default `'Allocations total 150% — 50% over'`.
   */
  formatUnbalanced?: (remainder: number, total: number) => string;
}

/** Default copy for an out-of-balance set. */
function unbalancedLine(remainder: number, total: number): string {
  const over = remainder > 0;
  return `Allocations total ${total}% — ${Math.abs(remainder)}% ${over ? 'over' : 'short'}`;
}

/**
 * **V4 beneficiary row** — same props as {@link BeneficiaryRow} plus
 * `allocationTotal` and `formatUnbalanced`.
 *
 * ## Five changes
 *
 * 1. **Three rows at 50% no longer render three confident figures.** Each row
 *    clamped its own percentage to 0–100 and knew nothing about the others, so
 *    a life policy split 50/50/50 drew three calm blue percentages adding to
 *    150% and nothing anywhere said so. Hand the row the set's
 *    `allocationTotal` and the imbalance is drawn *and* announced — the caller
 *    already summed the list to render it, so this costs them nothing.
 * 2. **The relationship reaches the reader.** The base's name was
 *    `"Ana Reyes, Primary beneficiary, 50%"` — the one fact that distinguishes
 *    a spouse from a child was drawn on screen and left out of the spoken
 *    string, and because the whole row is a flattened `Pressable` subtree there
 *    was no second stop to hear it from.
 * 3. **Press is a state layer.** `opacity: pressed ? 0.7 : 1` is a dim, and
 *    0.38 is M3's *disabled* band — the base's pressed row read as an
 *    unavailable one.
 * 4. **Primary vs contingent is identity, not a tone.** It gets an ordered
 *    glyph and a word on a neutral chip. Nobody is in trouble for being a
 *    contingent beneficiary.
 * 5. **It is a row from the shared row family**, at the same height, with the
 *    same 44 leading slot, as `ClaimRowV4` and `PolicyDocumentRowV4`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function BeneficiaryRowV4({
  name,
  relationship,
  allocationPct,
  kind = 'primary',
  avatarUrl,
  allocationTotal,
  formatUnbalanced = unbalancedLine,
  onPress,
  style,
}: BeneficiaryRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!name) return null;

  const meta = BENEFICIARY_KIND_V4[kind] ?? BENEFICIARY_KIND_V4.primary;

  // The row's own share, clamped by the shared reader rather than inline —
  // `allocationParts` is written for a set, and one row is a set of one.
  const share = allocationParts([allocationPct]).shares[0] ?? 0;
  const pct = `${share}%`;

  /*
    The set's verdict cannot come from `allocationParts` here: the row holds one
    share and the function reads a whole list. The caller has the list, sums it,
    and hands the answer down — which is also why `allocationTotal` is a number
    and not a boolean. Clamping it would destroy the signal (150 → 100 is
    exactly the bug), so it is compared as given.
  */
  const total =
    typeof allocationTotal === 'number' && Number.isFinite(allocationTotal)
      ? Math.round(allocationTotal)
      : null;
  const warning = total != null && total !== 100 ? formatUnbalanced(total - 100, total) : null;

  const spoken = spokenLine([name, relationship, meta.label, pct, warning]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: true }),
        { backgroundColor: rowGround(theme, { pressed }) },
        style,
      ]}
    >
      <View {...DECORATIVE} style={rowLeadingStyle(theme)}>
        <AvatarV4 src={avatarUrl} name={name} size="md" />
      </View>

      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {name}
        </TextV4>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <View style={chipStyle(theme)}>
            <TextV4 size="xs" tone="onCard">
              {meta.glyph}
            </TextV4>
            <TextV4 size="xs" weight="semibold" tone="onCard">
              {meta.label}
            </TextV4>
          </View>
          {relationship ? (
            <TextV4 size="xs" tone="mutedText" numberOfLines={1} style={{ flexShrink: 1 }}>
              {relationship}
            </TextV4>
          ) : null}
        </View>
        {/* Drawn on every row of an unbalanced set, so it cannot be scrolled
            past — one row carrying the warning is one row nobody looks at. */}
        {warning ? (
          <TextV4
            size="xs"
            weight="semibold"
            numberOfLines={2}
            style={{ color: toneInk(theme, 'warn') }}
          >
            {warning}
          </TextV4>
        ) : null}
      </View>

      <View style={rowTrailingStyle(theme)}>
        <TextV4 size="lg" weight="bold" tone="onCard" numeric="tabular">
          {pct}
        </TextV4>
      </View>
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
