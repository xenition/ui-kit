import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/nav-v4';
import { pressOver } from '../primitives/internal/state-v4';
import type { IconName } from '../../primitives/icon-names';
import type { MetricTileProps, MetricTileTone } from './MetricTile';

export type { MetricTileTone };

export interface MetricTileV4Props extends MetricTileProps {
  /**
   * A name from the kit's icon set, drawn in the **tinted circular badge**
   * above the label (brief §4.7 — the leading slot names a kind of thing).
   * Rendered through `IconV4 badge="soft"`, so the wash, the 44 circle and the
   * glyph's measured contrast against that wash all come from the primitive
   * that owns them, tinted from this tile's own {@link MetricTileProps.tone}.
   *
   * {@link MetricTileProps.icon} stays for parity and for callers with their
   * own artwork; it takes the same 44 slot, drawn untinted.
   */
  iconName?: IconName;
  /**
   * Whether the tile carries `elevation.card`. Default `false`, because this
   * is the **in-card** tile: brief §5 gives it `elevation.card` "only when the
   * tile is not inside another card", and §4.6 forbids nesting a shadow in a
   * shadow. Pass `true` for a tile sitting directly on the page — though a
   * stat on the page is what `StatCardV4` is for.
   */
  raised?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The tone colours the tile's **value**, which is text on the tile's ground —
 * so every entry is a `*Text` slot, not the fill of the same name. The native
 * twin already made this correction and the audit's 2.32:1 measurement was of
 * the *web* tile; what changes here is only the neutral entry.
 *
 * `neutral` is `onCard` rather than `onSurface` because the tile's ground is
 * now `card`, and the contrast promise a text slot makes is a promise about a
 * *named* ground.
 */
const TONE_TEXT: Record<MetricTileTone, keyof SemanticColors> = {
  neutral: 'onCard',
  primary: 'primaryText',
  success: 'successText',
  warn: 'warnText',
  danger: 'dangerText',
};

/**
 * The badge hue for a tone. `neutral` has no hue of its own, so its badge
 * falls to `primary` — brief §4.7's default family — rather than being drawn
 * in a grey that would read as disabled.
 */
const TONE_BADGE: Record<MetricTileTone, 'primary' | 'success' | 'warn' | 'danger'> = {
  neutral: 'primary',
  primary: 'primary',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

/**
 * **V4 metric tile** — the tile that lives *inside* a card, beside the
 * `StatCardV4` that lives on the page.
 *
 * Brief §5 keeps the pair and gives each a job: "`StatCard` is the on-page
 * card; `MetricTile` is the tile inside a card". Everything below follows from
 * that one sentence.
 *
 * 1. **The ground is `colors.card`, not `colors.surface`** (§4.2) — the most
 *    visible bug in the module was that every card in it painted the colour of
 *    the page.
 * 2. **`radius.lg` (was `md`), `spacing.md` padding, no border** (§5). A
 *    hairline box inside a hairline box is the dense admin look §3 rules out;
 *    the container owns the edge.
 * 3. **The label is above the value, `sm` and `mutedText`** — `mutedText`, not
 *    the `muted` *fill*, which the base used as a text colour and which is the
 *    exact bug the shadcn pass closed elsewhere. The base put the label at
 *    `xs` beside the icon, which made the tile read as a legend rather than as
 *    a number with a name.
 * 4. **Press feedback is the state layer** (§4.3, §1 rule 7).
 *    `opacity: pressed ? 0.8 : 1` is deleted, not translated: dimming fades the
 *    tile's own *content*, which is the signal M3 spends `0.38` on to mean
 *    disabled, so a pressed tile and a dead one looked alike. `pressOver`
 *    tints the container instead and leaves the content at full strength, and
 *    it is given the **opaque** `card` / `onCard` pair because the value's
 *    contrast is a promise about that fill — a translucent layer would make
 *    the promise depend on whatever happened to be behind the tile.
 * 5. **The glyph became a badge** (§4.7), and no shadow by default (§4.6).
 *
 * Composes `CardV4`, `TextV4` and `IconV4` (§10.5). Renders **nothing** when it
 * has neither a label nor a value (§4.5) — never a blank bordered box.
 */
export function MetricTileV4({
  label,
  value,
  icon,
  iconName,
  tone = 'neutral',
  onPress,
  raised = false,
  style,
}: MetricTileV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  // Held in state rather than read from `Pressable`'s render-prop, for the
  // reason `ButtonV4` already holds it: the pressed flag has to reach the
  // card's `backgroundColor`, and a component whose feedback is observable is
  // a component whose feedback can be tested.
  const [pressed, setPressed] = React.useState(false);

  const valueText = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
  const hasValue = value !== undefined && value !== null && value !== '';
  const hasLabel = label !== undefined && label !== null && label !== '';

  // Nothing to say, so nothing is drawn (§4.5).
  if (!hasLabel && !hasValue) return null;

  const slot = minTap(tokens.spacing);
  const badge =
    iconName !== undefined ? (
      <IconV4 name={iconName} badge="soft" color={TONE_BADGE[tone]} />
    ) : icon != null ? (
      <View style={{ width: slot, height: slot, alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </View>
    ) : null;

  const a11yLabel = `${String(label ?? '')}${valueText ? `: ${valueText}` : ''}`;

  const tile = (ground: string): React.ReactElement => (
    <CardV4
      variant={raised ? 'elevated' : 'outlined'}
      radius="lg"
      padding="md"
      style={[
        {
          backgroundColor: ground,
          // §5 drops this tile's border: it sits inside a card, and a hairline
          // box inside a hairline box is the ruled look §3 rules out. The
          // width stays 1 so a raised tile and a flat one are the same size to
          // the pixel; the edge simply paints nothing.
          borderColor: 'transparent',
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      {badge}
      <View style={{ gap: tokens.spacing.xs }}>
        {hasLabel ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {label}
          </TextV4>
        ) : null}
        {hasValue ? (
          <TextV4 size="2xl" weight="bold" tone={TONE_TEXT[tone]} numeric="tabular">
            {value}
          </TextV4>
        ) : null}
      </View>
    </CardV4>
  );

  if (!onPress) {
    return <View accessibilityLabel={a11yLabel}>{tile(colors.card)}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      {tile(pressed ? pressOver(theme, colors.card, colors.onCard) : colors.card)}
    </Pressable>
  );
}
