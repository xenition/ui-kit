import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { spokenLine } from './internal/mail-v4';
import type { SnoozeRowProps } from './SnoozeRow';

export interface SnoozeRowV4Props extends SnoozeRowProps {}

/**
 * **V4 snooze preset row** — the same props as {@link SnoozeRow}. Nothing to
 * add: everything wrong with this row was in how it was drawn, not in what it
 * could be told.
 *
 * ## Four changes
 *
 * 1. **Selected and pressed stopped being the same thing.** The base drew
 *    pressed as `colors.border` — a hairline token used as a fill — and
 *    selected as a hand-mixed 12% wash of `primary`. Both now come from the
 *    shared row line: `selected` is `colors.selected`, and a press composites
 *    M3's layer into whichever ground the row is already on, so holding a
 *    finger on an unselected preset never makes it look chosen.
 * 2. **The text on a selected row is that ground's guaranteed pair.** The base
 *    kept `onSurface` over a tint nobody measured it against.
 * 3. **It is a row from the row family**, so a snooze sheet, a settings screen
 *    and a notification list are one object at one height with one rhythm.
 * 4. **The check mark is decorative on both twins.** It was already hidden
 *    here and was a reader stop on the web; the pair of native flags is now
 *    the full `no-hide-descendants` spelling the rest of the V4 line uses.
 */
export function SnoozeRowV4({
  label,
  when,
  glyph = '⏰',
  selected = false,
  onPress,
  style,
}: SnoozeRowV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  // On the selected ground the only ink with a promise is its own pair.
  const ink = selected ? 'onSelected' : 'onSurface';
  const meta = selected ? 'onSelected' : 'mutedText';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spokenLine([`Snooze ${label}`, when])}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        rowContainerStyle(theme),
        {
          borderRadius: tokens.radius.md,
          backgroundColor: rowGround(theme, { pressed, selected }),
        },
        style,
      ]}
    >
      <View style={rowLeadingStyle(theme)}>
        <IconV4 glyph={glyph} size="lg" color={meta} />
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight={selected ? 'bold' : 'medium'} tone={ink} numberOfLines={1}>
          {label}
        </TextV4>
      </View>
      {when ? (
        <TextV4 size="sm" tone={meta} numeric="tabular">
          {when}
        </TextV4>
      ) : null}
      {selected ? (
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <IconV4 glyph="✓" size="base" color={ink} />
        </View>
      ) : null}
    </Pressable>
  );
}
