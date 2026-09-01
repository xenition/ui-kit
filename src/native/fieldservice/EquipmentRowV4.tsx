import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { BADGE_V4, discGround, spokenLine, type ToneV4 } from './internal/job-v4';
import type { EquipmentRowProps, EquipmentStatus } from './EquipmentRow';

export interface EquipmentRowV4Props extends EquipmentRowProps {
  /** Override the four condition names — they lived inside the component. */
  statusLabels?: Partial<Record<EquipmentStatus, string>>;
}

const STATUS_META: Record<EquipmentStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  operational: { label: 'Operational', glyph: '✓', tone: 'success' },
  maintenance: { label: 'Maintenance', glyph: '⚙', tone: 'warn' },
  down: { label: 'Down', glyph: '✕', tone: 'danger' },
  retired: { label: 'Retired', glyph: '⏻', tone: 'neutral' },
};

/**
 * **V4 equipment row** — same props as {@link EquipmentRow} plus
 * `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The row announces where the asset is and when it is next due.** Its
 *    name was `"${name}, ${tag}, ${status}"`, which replaces the subtree — so
 *    the location and the service date the row draws were spoken to nobody.
 * 2. **The row is a row from the shared row line**, with a leading slot that
 *    clears 44 and a press that is a state layer rather than `opacity: 0.7` —
 *    0.38 is M3's *disabled* band, so a pressed row read as a dead one.
 * 3. **The badge is the module's one shape** — this twin passed `soft`/`sm`
 *    while the web twin took `Badge`'s `solid`/`md` at all sixteen call sites
 *    in the module.
 * 4. **The caller's `style` lands on the root**, the element the web twin puts
 *    it on.
 *
 * **Renders nothing without a `name`.**
 */
export function EquipmentRowV4({
  name,
  assetTag,
  status,
  glyph = '🚜',
  nextService,
  location,
  statusLabels,
  onPress,
  style,
}: EquipmentRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!name) return null;

  const meta = STATUS_META[status] ?? STATUS_META.operational;
  const statusWord = statusLabels?.[status] ?? meta.label;
  const service = nextService != null ? `Service ${nextService}` : null;
  const caption = metaLine([assetTag, location, service]);
  const spoken = spokenLine([name, assetTag, statusWord, location, service]);

  const content = (
    <>
      {/* The asset glyph is a category mark, not a state — decorative. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          rowLeadingStyle(theme),
          { borderRadius: tokens.radius.md, backgroundColor: discGround(theme, meta.tone) },
        ]}
      >
        <IconV4 glyph={glyph} />
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {name}
        </TextV4>
        {caption !== '' ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
      </View>
      <BadgeV4 tone={meta.tone} {...BADGE_V4}>
        {`${meta.glyph} ${statusWord}`}
      </BadgeV4>
    </>
  );

  if (!onPress) {
    return (
      <View
        accessible
        accessibilityLabel={spoken}
        style={[rowContainerStyle(theme, { twoLine: caption !== '' }), style]}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={[{ borderRadius: tokens.radius.md }, style]}
    >
      {({ pressed }) => (
        <View
          style={[
            rowContainerStyle(theme, { twoLine: caption !== '' }),
            { borderRadius: tokens.radius.md, backgroundColor: rowGround(theme, { pressed }) },
          ]}
        >
          {content}
        </View>
      )}
    </Pressable>
  );
}
