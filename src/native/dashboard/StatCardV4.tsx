import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/nav-v4';
import type { IconName } from '../../primitives/icon-names';
import type { StatCardProps } from './StatCard';

/**
 * Direction of a `delta`. `'flat'` is new in V4: the base had no word for "the
 * number did not move", so a delta with no `trend` rendered in `muted` with no
 * mark at all — which reads as an unstyled string rather than as a deliberate
 * "no change".
 */
export type StatCardV4Trend = 'up' | 'down' | 'flat';

/**
 * The semantic family a stat belongs to, which is the only thing that decides
 * its badge hue (brief §4.7: `primary` by default, `success` for positive
 * money, `warn` / `danger` only when the metric genuinely is a warning).
 */
export type StatCardV4Tone = 'primary' | 'success' | 'warn' | 'danger';

export interface StatCardV4Props extends Omit<StatCardProps, 'trend'> {
  /** Direction of `delta`. Drives the trend glyph and the `*Text` ink. */
  trend?: StatCardV4Trend;
  /**
   * A name from the kit's icon set, drawn in the **tinted circular badge**
   * above the label — brief §3's "soft tinted circular badge naming what the
   * number is about", §4.7's categorical leading slot.
   *
   * This is the house path and the one to reach for: it renders through
   * `IconV4 badge="soft"`, so the wash, the 44 circle and the glyph's measured
   * contrast against that wash all come from the primitive that already owns
   * them. {@link StatCardV4Props.icon} stays for parity and for callers with
   * their own artwork; it takes the same 44 slot but is drawn untinted,
   * because a caller's illustration is theirs to colour.
   */
  iconName?: IconName;
  /**
   * The semantic family the badge is tinted from. Default `'primary'`.
   * Ignored when there is no `iconName`.
   */
  tone?: StatCardV4Tone;
  /**
   * The quiet line under the delta — "vs last month", "last 30 days". The
   * reference screens carry one on every stat and the base had nowhere to put
   * it, so apps were appending it to `label` and getting it at the wrong size
   * above the number instead of below it.
   */
  caption?: string;
  /**
   * Whether the card carries `elevation.card`. Default `true` — a `StatCard`
   * is the on-page card (brief §5: "`StatCard` is the on-page card;
   * `MetricTile` is the tile inside a card").
   *
   * Pass `false` when the card sits **inside** another card: brief §4.6 is
   * explicit that a `StatCard` inside a `SectionCard` is flat, and never
   * nesting a shadow in a shadow is the whole point of that section.
   */
  raised?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The kit has no `arrow-up` / `arrow-down` name — brief §6's open question 6
 * asked that the names be confirmed before agents started guessing, and the
 * confirmed set (`primitives/icon-names.ts`) has `chevron-up`, `chevron-down`
 * and `forward` and no arrows. So the direction mark is a chevron, from the
 * named set, rather than a `▲` typed into this file: brief §1 rule 2 retires
 * the literal `▲` / `▼` characters the base shipped, and inventing an icon
 * name that does not resolve is how those characters got there the first time.
 */
const TREND_ICON: Record<StatCardV4Trend, IconName> = {
  up: 'chevron-up',
  down: 'chevron-down',
  flat: 'forward',
};

/**
 * Trend → ink.
 *
 * The contrast-corrected `*Text` slots, never the fills. `success` is what a
 * filled chip is painted with and the compiler makes no promise about it as
 * ink on a card; `successText` is exactly that promise. Identical to the
 * mapping `StatisticV4` already uses, because there must not be two numeric
 * treatments in one kit.
 */
const TREND_TONE: Record<StatCardV4Trend, keyof SemanticColors> = {
  up: 'successText',
  down: 'dangerText',
  flat: 'mutedText',
};

/**
 * **V4 stat card** — the on-page KPI card, and where brief §3's decision lands.
 *
 * The base is a bordered box the same colour as the page with a `2xl` number in
 * it. §3 names that for what it is — a spreadsheet cell — and describes what
 * this product's stat actually is: a white card floating on the warm ground,
 * generous, one loud thing in it. Five changes, in the order they matter.
 *
 * 1. **The ground is `colors.card`, not `colors.surface`.** This is the single
 *    most visible change in the whole dashboard pass. `card` was split out in
 *    the shadcn pass precisely so a raised surface reads as raised in *both*
 *    schemes, and this module never adopted it — every card in it paints the
 *    same colour as the page it sits on, which is why the border was doing all
 *    the work. `CardV4` supplies the recipe (radius, hairline,
 *    `elevation.card`, and the shadow that gets *more* opacity in dark); the
 *    one thing overridden on top of it is the fill.
 * 2. **The value is the loudest thing on the block.** `3xl`, bold, on the
 *    display face, in tabular figures — the treatment `StatisticV4` already
 *    typesets a hero number with, reused rather than re-invented. `2xl` ties
 *    the page title, and a KPI that ties the page title has no hierarchy.
 * 3. **The label is above the value, small and calm.** `sm` / `mutedText` —
 *    `mutedText`, never the `muted` *fill*, which the base used as a text
 *    colour and which carries no contrast promise as ink. HIG's charting
 *    guidance is the argument for the order: a short descriptive headline
 *    first, so the number underneath is graspable at a glance.
 * 4. **The delta is not colour alone.** Green and red are the whole signal in
 *    the base, which fails for the ~8% of men who cannot separate them. V4
 *    pairs the `successText` / `dangerText` ink with a real direction glyph
 *    from the named icon set. The sign is already in the delta *string*
 *    ("+12%"), so the spoken label carries the direction without this file
 *    inventing an English word for a screen reader to read.
 * 5. **The icon became a badge.** It floated at the trailing edge of the
 *    label row in the base, competing with it; §3 and §4.7 put a categorical
 *    glyph in a soft tinted 44 circle at the top of the block.
 *
 * Composes `CardV4`, `TextV4` and `IconV4` (§10.5 — a V4 composite composes V4
 * children). Renders **nothing** when it has neither a label nor a value:
 * brief §4.5, a component with nothing to show is never a blank bordered box.
 */
export function StatCardV4({
  label,
  value,
  delta,
  trend,
  icon,
  iconName,
  tone = 'primary',
  caption,
  raised = true,
  style,
}: StatCardV4Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();

  // Only a string or a number has a reading; a caller's node stringifies to
  // "[object Object]", which is what the base put in its accessibility label.
  const valueText = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
  const hasValue = value !== undefined && value !== null && value !== '';
  const hasLabel = label !== undefined && label !== null && label !== '';

  // Nothing to say, so nothing is drawn (§4.5). A stat card with no label and
  // no value is a blank bordered box, which is the one outcome that section
  // rules out.
  if (!hasLabel && !hasValue) return null;

  const resolvedTrend: StatCardV4Trend = trend ?? 'flat';
  const slot = minTap(tokens.spacing);
  const badge =
    iconName !== undefined ? (
      <IconV4 name={iconName} badge="soft" color={tone} />
    ) : icon != null ? (
      <View style={{ width: slot, height: slot, alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </View>
    ) : null;

  return (
    <CardV4
      accessibilityLabel={`${String(label ?? '')}${valueText ? `: ${valueText}` : ''}${
        delta ? `, ${delta}` : ''
      }`}
      variant={raised ? 'elevated' : 'outlined'}
      radius="lg"
      padding="lg"
      style={[
        {
          // §4.2's headline fix. Everything else in the recipe — the radius,
          // the hairline, the elevation — is `CardV4`'s; only the fill is
          // stated here, because `CardV4` still paints the page colour.
          backgroundColor: colors.card,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      {badge}
      {/*
        One text block on the `xs` rhythm (§4.1, "between a title and its
        supporting line"): label, value, delta and caption are one thought
        about one number, and anything larger between them reads as separate
        rows stacked in a box.
      */}
      <View style={{ gap: tokens.spacing.xs }}>
        {hasLabel ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {label}
          </TextV4>
        ) : null}
        {hasValue ? (
          <TextV4 size="3xl" weight="bold" tone="onCard" numeric="tabular">
            {value}
          </TextV4>
        ) : null}
        {delta ? (
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
          >
            <IconV4 name={TREND_ICON[resolvedTrend]} size="xs" color={TREND_TONE[resolvedTrend]} />
            <TextV4
              size="sm"
              weight="semibold"
              tone={TREND_TONE[resolvedTrend]}
              numeric="tabular"
            >
              {delta}
            </TextV4>
          </View>
        ) : null}
        {caption ? (
          <TextV4 size="xs" tone="mutedText">
            {caption}
          </TextV4>
        ) : null}
      </View>
    </CardV4>
  );
}
