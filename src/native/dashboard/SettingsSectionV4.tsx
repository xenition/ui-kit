import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { ListSeparatorV4 } from '../layout/ListSeparatorV4';
import type { CardVariant } from '../primitives/Card';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { useXenitionTheme } from '../theme';
import type { SectionCardV4Empty } from './SectionCardV4';
import { rowMetrics } from './internal/row-v4';

export type { SectionCardV4Empty as SettingsSectionV4Empty };

export interface SettingsSectionV4Props extends ViewProps {
  /**
   * Group heading above the rows.
   *
   * Sentence case, `size="sm" weight="semibold" tone="mutedText"`. The base
   * sets `xs` + `textTransform: 'uppercase'` — that is admin styling, and
   * HIG's grouped-list headers are sentence case (§5).
   */
  title?: string;
  /** Footnote under the group — the "why this setting exists" line. */
  footnote?: string;
  /**
   * Inset the separators to clear the rows' 44 leading slot. Default `false` —
   * the flush rule, which is what rows without a leading slot want.
   *
   * §4.4: where the rows carry an avatar or a tinted badge (`SettingsRowV4`
   * gains a `leading` slot in this pass) the rule starts at `44 + spacing.md`,
   * so it aligns with the labels above and below it instead of cutting the
   * badges in half. The number belongs to `ListSeparatorV4` and
   * `internal/row-v4.ts`; this prop is only the question of whether the rows
   * have a slot to clear, which the caller knows and the container cannot.
   */
  insetSeparators?: boolean;
  /**
   * Surface treatment, forwarded to {@link CardV4}. Default `'elevated'`:
   * §4.2's hairline plus `elevation.card`.
   *
   * §4.6 allows a shadow on a card sitting on the page and on nothing else, so
   * a settings group nested inside another card passes `'flat'` or
   * `'outlined'`. On a `depth: 'flat'` seed the token is already inert.
   */
  variant?: CardVariant;
  /**
   * What to show when there are no rows (§4.5). Routed through `EmptyStateV4`.
   *
   * With no rows and no empty state the whole component renders `null` — an
   * empty grouped card is the "blank bordered box" §4.5 forbids, and a group
   * heading over nothing is worse.
   */
  empty?: SectionCardV4Empty;
  style?: StyleProp<ViewStyle>;
  /** {@link SettingsRow}s (or any rows) — separators are drawn between them. */
  children?: React.ReactNode;
}

/**
 * **V4 settings section** — HIG's inset-grouped list, and the container that
 * makes a settings row look right.
 *
 * ## What V4 changes
 *
 * 1. **The ground is `colors.card`, not `colors.surface`.** Same headline fix
 *    as `SectionCardV4`: a grouped list painted the colour of the page is a
 *    border with rows in it, and `card` is the slot the shadcn pass added so a
 *    raised surface reads as raised in both schemes.
 * 2. **The separators are `ListSeparatorV4`.** Both twins hand-roll a
 *    `<View style={{ height: 1 }} />` today, which is how the leading inset
 *    went missing in the first place. They are drawn **between** the rows, so
 *    the last row gets none and the list ends on the card's own edge (§4.4).
 * 3. **The uppercase `xs` heading is gone.** Admin styling; HIG's grouped
 *    headers are sentence case. It becomes `size="sm" weight="semibold"
 *    tone="mutedText"` — `mutedText`, never the `muted` **fill**, which is what
 *    both base twins paint their heading and footnote with.
 * 4. **The heading and footnote pay the row gutter.** `rowMetrics().padX`, read
 *    off `internal/row-v4.ts` rather than retyped, not the base's `spacing.sm`
 *    — so the heading sits over the row labels rather than near them.
 * 5. **It renders nothing for zero rows.** §4.5, and the base's exact bug: an
 *    empty `SettingsSection` today is a bordered rectangle with a heading over
 *    it.
 *
 * The card is `overflow: 'hidden'` and pays no padding of its own: the rows own
 * their gutters (`internal/row-v4.ts`), so they run flush to the card edge and
 * clip to `radius.lg`. §4.3 in one sentence — **a list of rows is one card with
 * rows in it, not a stack of cards.**
 *
 * ### Platform divergence
 *
 * None. Same props, same names, same defaults as the web twin.
 */
export function SettingsSectionV4({
  title,
  footnote,
  insetSeparators = false,
  variant = 'elevated',
  empty,
  style,
  children,
  ...rest
}: SettingsSectionV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  // The row family's own horizontal padding, read from the shared metric so the
  // heading and the row labels below it cannot drift apart (§5).
  const { padX } = rowMetrics(theme);

  const rows = React.Children.toArray(children).filter(Boolean);
  const hasBody = rows.length > 0 || empty !== undefined;

  // §4.5: a group with no rows and nothing to say about it renders nothing —
  // not an empty bordered box, and not a heading floating over one.
  if (!hasBody) return null;

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]} {...rest}>
      {title ? (
        <View testID="xen-v4-settings-heading" style={{ paddingHorizontal: padX }}>
          <TextV4 size="sm" weight="semibold" tone="mutedText">
            {title}
          </TextV4>
        </View>
      ) : null}

      <CardV4
        testID="xen-v4-settings-card"
        variant={variant}
        radius="lg"
        // No padding: the rows own their gutters, and a card that also paid one
        // would push every row's label into a channel down the middle.
        padding="none"
        style={{
          // §4.2's headline fix. `CardV4` paints `colors.surface`, which is the
          // page; a card has its own ground and this is it.
          backgroundColor: colors.card,
          // So the first and last rows clip to `radius.lg` instead of squaring
          // off the card's corners.
          overflow: 'hidden',
        }}
      >
        {rows.length > 0
          ? rows.map((row, i) => (
              <React.Fragment key={i}>
                {/*
                  Between the rows, never after the last one: a rule on the
                  card's own edge is a second border (§4.4).
                */}
                {i > 0 ? (
                  <ListSeparatorV4 inset={insetSeparators ? 'leading' : undefined} />
                ) : null}
                {row}
              </React.Fragment>
            ))
          : empty !== undefined
            ? <EmptyStateV4 {...empty} />
            : null}
      </CardV4>

      {footnote ? (
        <View testID="xen-v4-settings-footnote" style={{ paddingHorizontal: padX }}>
          {/*
            `sm`, the same step as the row's supporting line, rather than the
            base's `xs`. A footnote is a sentence the user is meant to read
            (§46 puts legibility ahead of quietness); `mutedText` is what makes
            it quiet.
          */}
          <TextV4 size="sm" tone="mutedText">
            {footnote}
          </TextV4>
        </View>
      ) : null}
    </View>
  );
}
