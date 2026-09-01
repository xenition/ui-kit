import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import type { IconName } from '../../primitives/icon-names';
import type { ListRowProps } from './ListRow';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from './internal/row-v4';

/**
 * The tones §4.7 lets a row's leading badge wear.
 *
 * Deliberately four and not every `SemanticColors` key native's `IconV4` would
 * accept: §4.7 says the colour "comes from the semantic family the row belongs
 * to — `primary` by default, `success` for positive money, `warn` / `danger`
 * only when the row genuinely is a warning". Narrowing to those four is also
 * what keeps this union spellable on the web twin, whose `IconColor` is a
 * closed ten-slot list — prop parity has to survive the narrower platform.
 */
export type RowBadgeTone = 'primary' | 'success' | 'warn' | 'danger';

export interface ListRowV4Props extends ListRowProps {
  /**
   * A named glyph for the leading slot, drawn as §4.3's **tinted circular
   * badge** (`IconV4 badge="soft"`, which is already the §4.7 44 circle).
   *
   * This is the "a kind of thing" half of the leading slot — the half the base
   * row had no way to express, so callers who were not showing a person either
   * turned the avatar off and left a ragged left edge, or hand-rolled a dot.
   * `leading` still wins over it, and it still wins over the avatar, so the
   * precedence reads exactly as the anatomy does: an explicit slot, then a
   * kind, then a person.
   */
  icon?: IconName;
  /** Semantic family of the {@link ListRowV4Props.icon} badge. Default `'primary'`. */
  iconTone?: RowBadgeTone;
  /**
   * Draw the trailing chevron. Defaults to **`true` when `onPress` is set** and
   * `false` otherwise.
   *
   * HIG is unambiguous that a chevron means *navigation*, so the default is
   * derived from whether the row navigates rather than being a decoration a
   * caller opts into. Pass `false` on a row whose `onPress` selects or toggles
   * rather than pushing a screen.
   */
  chevron?: boolean;
  /**
   * Paint the §4.3 `selected` ground — the one exception to the row's
   * transparent ground, for a persistently highlighted navigation row.
   * Default `false`.
   */
  selected?: boolean;
}

/**
 * **V4 list row** — the canonical member of the V4 row family, and the row the
 * other three follow.
 *
 * Everything structural comes from `internal/row-v4.ts`; this file decides
 * *content* and nothing else. That is the whole point of the pass: the base
 * row, `SettingsRow`, `NotificationItem` and `ActivityFeed` were four
 * components with three paddings, two min-heights, two press feedbacks and
 * three leading treatments between them, and a user scrolling from a people
 * list into a settings screen could see the seam. Not one metric is typed here.
 *
 * What changes against the base row:
 *
 * 1. **The metric is the family's.** `minHeight: 56` — a literal brief §1 names
 *    outright — becomes {@link rowContainerStyle}, which composes 56 as
 *    `2xl + sm` for a row with a title alone and 72 as `2xl + lg` for one that
 *    also carries `meta`. A re-scaled seed now re-scales the row.
 *
 *    The height turns on *the supporting line* and nothing else, which is what
 *    the module documents and what §4.3's table says. §5's SettingsRow note
 *    also sends a row with a leading slot to 72; that is not adopted, because
 *    it would leave a settings row wearing a badge at 72 while a people row
 *    wearing an avatar sat at 56 — the exact family seam §4.3 is closing. A 44
 *    leading slot grows the row past 56 on its own anyway: the metric is a
 *    `minHeight`, a floor rather than a size.
 *
 * 2. **The leading slot is a real slot.** A fixed 44 square
 *    ({@link rowLeadingStyle}) holding an `AvatarV4` for a person or an
 *    `IconV4 badge="soft"` for a kind of thing — never a bare dot (§4.3),
 *    which is what the sibling rows drew. Fixed on both axes so twenty rows put
 *    their titles on one vertical line whichever a given row happens to hold.
 *
 * 3. **Text is typeset, not styled.** No more `<Text style={{ fontSize }}>`:
 *    title `TextV4 size="base" weight="semibold" tone="onSurface"`, supporting
 *    line `size="sm" tone="mutedText"`. `mutedText`, not `colors.muted` —
 *    §4.3 names using the *fill* as an ink as the exact bug the shadcn pass
 *    closed, and the base row does it.
 *
 * 4. **The chevron exists.** The base row had no navigation affordance at all,
 *    so a row that pushed a screen and a row that did nothing looked identical.
 *
 * 5. **Press is the state layer.** `opacity: pressed ? 0.7 : 1` is deleted, not
 *    translated: {@link rowGround} returns `stateMix(card, onCard, 'pressed')`,
 *    M3's 0.12 of the row's own ink flattened against the fill it wears.
 *    Dimming faded the row's *content*, which is the signal M3 spends 0.38 on
 *    to mean **disabled** — so a pressed row and a dead row looked alike.
 *
 * 6. **The ground is transparent.** The container owns the card, so a list of
 *    these is one card with rows in it rather than a stack of little cards.
 *
 * Renders `null` when there is nothing to show (§4.5): no title, no supporting
 * line, no leading slot, no action. A row with an empty title is a blank 56pt
 * band in the middle of a list, and a blank box is the one thing §4.5 forbids.
 * A default avatar does not count as content — it would be a monogram of
 * nothing.
 */
export function ListRowV4({
  title,
  meta,
  avatarUrl,
  showAvatar = true,
  leading,
  action,
  onPress,
  style,
  icon,
  iconTone = 'primary',
  chevron,
  selected = false,
}: ListRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();

  const navigates = onPress !== undefined;
  const showChevron = chevron ?? navigates;
  const supporting = meta !== undefined && meta !== '';
  const titled = title.trim() !== '';

  const leadingNode =
    leading ??
    (icon !== undefined ? (
      <IconV4 name={icon} color={iconTone} badge="soft" size="base" />
    ) : showAvatar && titled ? (
      <AvatarV4 src={avatarUrl} name={title} size="md" />
    ) : null);

  // §4.5: nothing to show, so show nothing. The default avatar is excluded on
  // purpose — see the component doc.
  if (!titled && !supporting && leading == null && icon === undefined && action == null) {
    return null;
  }

  const container = rowContainerStyle(theme, { twoLine: supporting });

  const inner = (
    <>
      {leadingNode != null ? <View style={rowLeadingStyle(theme)}>{leadingNode}</View> : null}
      <View style={rowTextStyle(theme)}>
        {titled ? (
          <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
            {title}
          </TextV4>
        ) : null}
        {supporting ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {meta}
          </TextV4>
        ) : null}
      </View>
      {action != null || showChevron ? (
        <View style={rowTrailingStyle(theme)}>
          {action}
          {showChevron ? (
            // `muted` and not `mutedText`: a chevron is a UI mark held to
            // 1.4.11's 3:1, not a run of text — the same reading `AccordionV4`
            // records for its disclosure mark, and the one slot the web twin's
            // closed `IconColor` union can also spell.
            <IconV4 name="chevron-right" size="base" color="muted" />
          ) : null}
        </View>
      ) : null}
    </>
  );

  if (!navigates) {
    return (
      <View
        accessibilityLabel={title}
        style={[container, { backgroundColor: rowGround(theme, { selected }) }, style]}
      >
        {inner}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }): StyleProp<ViewStyle> => [
        container,
        { backgroundColor: rowGround(theme, { pressed, selected }) },
        style,
      ]}
    >
      {inner}
    </Pressable>
  );
}
