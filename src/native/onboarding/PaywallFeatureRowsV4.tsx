import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { flowGrounds, flowMetrics, type OnboardingAccentV4 } from './internal/flow-v4';
import { isIconName } from '../../primitives/icon-names';
import type { PaywallFeatureRowsProps } from './PaywallScreen';

export interface PaywallFeatureRowsV4Props extends PaywallFeatureRowsProps {
  /** Which brand slot the badges answer in. Default `'primary'`. */
  accent?: OnboardingAccentV4;
  /**
   * Number the rows instead of drawing their glyphs.
   *
   * The same anatomy answers two different questions — "what do I get" (icons)
   * and "how does this work" (1, 2, 3) — and an onboarding needs both. Without
   * it every host that wanted a numbered how-it-works list rebuilt the row.
   */
  numbered?: boolean;
}

/**
 * Below this many rows the connecting rail is off by default: two badges
 * joined by a line read as a diagram of something, and there is nothing to
 * diagram. At three or more the rail is what makes the rows read as one list
 * rather than three fragments (spec §8).
 */
const RAIL_MIN_ROWS = 3;

/**
 * **V4 feature rows** — same props as {@link PaywallFeatureRows} plus `accent`
 * and `numbered`.
 *
 * The §8 anatomy, and the component the reference welcome-offer screen is
 * mostly made of: a circular tinted badge, a semibold title, a muted
 * description, and a hairline rail joining the badges into one list.
 *
 * ## Four changes
 *
 * 1. **The tint is mixed, not ramped.** The base read
 *    `tokens.ramps.primary[50]` behind a `scheme` branch — the ramps carry the
 *    light orientation in both schemes, so the branch existed to undo the
 *    wrong token. `flowGrounds()` mixes from resolved semantic colours and the
 *    branch goes away.
 * 2. **The rail joins badges, not rows.** It runs between the badge centres
 *    and stops at the last badge. The base drew it down the full height of the
 *    group, so it overshot past the final badge into the description below it.
 * 3. **`numbered`** — the same rows as an ordered list.
 * 4. **Descriptions take `mutedText`.** `muted` carries no contrast promise
 *    and this is the copy carrying the value proposition.
 *
 * **Renders nothing for an empty `rows`** (§4.5) — a heading with no list under
 * it is worse than no section.
 */
export function PaywallFeatureRowsV4({
  rows,
  heading,
  rail,
  dense = false,
  accent = 'primary',
  numbered = false,
  style,
}: PaywallFeatureRowsV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const grounds = flowGrounds(theme, 'plain', accent);
  const { badge } = flowMetrics(theme, 0);

  const list = rows?.filter((row) => row.title) ?? [];
  if (list.length === 0) return null;

  const gap = dense ? tokens.spacing.sm : tokens.spacing.md;
  const showRail = rail ?? list.length >= RAIL_MIN_ROWS;

  return (
    <View accessibilityRole="list" style={[{ alignSelf: 'stretch', gap }, style]}>
      {heading ? (
        <TextV4 size="sm" weight="semibold" tone="mutedText">
          {heading}
        </TextV4>
      ) : null}

      {list.map((row, i) => {
        const last = i === list.length - 1;
        const glyph = row.icon;
        return (
          <View
            key={row.id ?? row.title}
            accessibilityRole="text"
            style={{ flexDirection: 'row', gap: tokens.spacing.md }}
          >
            {/*
              The badge column owns the rail, so the line runs from this badge
              to the next one and simply is not drawn on the last row. The base
              painted the rail on the group and it therefore ran past the final
              badge with nothing to reach.
            */}
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: badge,
                  height: badge,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: grounds.badge,
                }}
              >
                {numbered ? (
                  <TextV4 size="base" weight="bold" numeric="tabular" style={{ color: grounds.ink }}>
                    {i + 1}
                  </TextV4>
                ) : glyph && isIconName(glyph) ? (
                  <IconV4 name={glyph} size="lg" style={{ color: grounds.ink }} />
                ) : (
                  <IconV4 glyph={glyph ?? '✦'} size="lg" style={{ color: grounds.ink }} />
                )}
              </View>
              {showRail && !last ? (
                <View
                  style={{
                    flex: 1,
                    width: 1,
                    marginTop: tokens.spacing.xs,
                    // Bridges the container's own row gap so the rail is
                    // continuous, stopping `xs` short of the next badge.
                    marginBottom: tokens.spacing.xs - gap,
                    backgroundColor: colors.border,
                  }}
                />
              ) : null}
            </View>

            <View style={{ flex: 1, gap: tokens.spacing.xs }}>
              <TextV4 size="base" weight="semibold" tone="onSurface">
                {row.title}
              </TextV4>
              {row.description ? (
                <TextV4 size="sm" tone="mutedText">
                  {row.description}
                </TextV4>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
