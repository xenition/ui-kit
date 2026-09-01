import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowEdgeStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { metaLine, type FarmTone } from './internal/farm-v4';
import type { LivestockHealth, LivestockRowProps } from './LivestockRow';

export interface LivestockRowV4Props extends LivestockRowProps {
  /** Override the health names — three English words lived inside the component. */
  healthLabels?: Partial<Record<LivestockHealth, string>>;
  /** Shown in place of the head count when it is unknown. Default `'—'`. */
  unknownCountLabel?: string;
  /** Format the head count. Default `String(count)`. */
  formatCount?: (count: number) => string;
}

/** Health → tone and default label. Genuinely a status, so the tones stay. */
const HEALTH_META: Record<LivestockHealth, { label: string; tone: FarmTone }> = {
  healthy: { label: 'Healthy', tone: 'success' },
  monitor: { label: 'Monitor', tone: 'warn' },
  sick: { label: 'Sick', tone: 'danger' },
};

/**
 * **V4 livestock row** — same props as {@link LivestockRow} plus
 * `healthLabels`, `unknownCountLabel` and `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line** (`dashboard/internal/row-v4`),
 *    so its height, padding, press fill and separator inset are the same
 *    decisions every other row in the kit makes.
 * 2. **Press is a state layer**, not `opacity: 0.85` on the row's content.
 * 3. **The head count is tabular and formattable.** A column of pen counts
 *    that does not line up is a column nobody can scan, and `1,240` is not
 *    `1.240` everywhere.
 * 4. **Type comes from `TextV4`**, with the caption on `mutedText`.
 *
 * **Renders nothing without a `species`** (§4.5).
 */
export function LivestockRowV4({
  species,
  count,
  icon = '🐄',
  location,
  health = 'healthy',
  detail,
  healthLabels,
  unknownCountLabel = '—',
  formatCount,
  last = false,
  onPress,
  style,
}: LivestockRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!species) return null;

  const meta = HEALTH_META[health];
  const label = healthLabels?.[health] ?? meta.label;
  const shownCount =
    typeof count === 'number' ? (formatCount ?? String)(count) : unknownCountLabel;
  const caption = metaLine([location, detail]);

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: Boolean(caption) }),
        { backgroundColor: rowGround(theme, { pressed }) },
        !last ? rowEdgeStyle(theme) : null,
        style,
      ]}
    >
      <IconV4 glyph={icon} size="lg" />

      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {species}
        </TextV4>
        {caption ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
      </View>

      <TextV4 face="heading" size="base" weight="bold" tone="onCard" numeric="tabular">
        {shownCount}
      </TextV4>

      <BadgeV4 tone={meta.tone} variant="soft" size="sm">
        {label}
      </BadgeV4>
    </View>
  );

  if (!onPress) return content(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[species, shownCount, caption, label].filter(Boolean).join(', ')}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}
