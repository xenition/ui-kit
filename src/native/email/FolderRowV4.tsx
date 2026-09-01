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
import { spokenLine } from './internal/mail-v4';
import type { FolderRowProps } from './FolderRow';

export interface FolderRowV4Props extends FolderRowProps {
  /**
   * Turn `count` into the words a reader hears. Default `'3 items'`.
   *
   * The prop it describes is documented as an "unread / item count", so the
   * unit belongs to the caller — a Drafts folder counts drafts.
   */
  formatCount?: (count: number) => string;
}

/** Above this the badge shows `999+` rather than a number nobody reads. */
const COUNT_CAP = 999;

/**
 * **V4 folder row** — same props as {@link FolderRow} plus `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It stops asserting "unread".** The base announced `` `${name}, ${count}
 *    unread` `` for a prop its own doc defines as an "unread / item count", so
 *    "Drafts, 3 unread" was wrong in every folder where the number is a count
 *    of items. `formatCount` names the unit and defaults to `'3 items'`.
 * 2. **Selected and pressed are different colours.** The base drew pressed as
 *    `colors.border` — a hairline token as a fill — so a finger held on Inbox
 *    made it look like the folder you were already in. Both grounds come from
 *    the shared row line now.
 * 3. **The label and count are their ground's guaranteed pair.** `selected`
 *    inked the name with `colors.primary`, a fill slot with no contrast
 *    promise as text, over a tint nobody measured; and the count pill mixed
 *    `withAlpha(colors.onSurface, 0.1)` by hand. The count is a `BadgeV4`,
 *    which owns its ground and re-measures its own ink.
 * 4. **The row clears 44** and joins the row family's one height and rhythm.
 */
export function FolderRowV4({
  name,
  glyph,
  count = 0,
  selected = false,
  depth = 0,
  formatCount = (n) => `${n} items`,
  onPress,
  style,
}: FolderRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!name) return null;

  const indent = Math.max(0, depth) * tokens.spacing.lg;
  const ink = selected ? 'onSelected' : 'onSurface';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spokenLine([name, count > 0 ? formatCount(count) : null])}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        rowContainerStyle(theme),
        {
          paddingLeft: tokens.spacing.md + indent,
          borderRadius: tokens.radius.md,
          backgroundColor: rowGround(theme, { pressed, selected }),
        },
        style,
      ]}
    >
      {glyph ? (
        <View style={rowLeadingStyle(theme)}>
          <IconV4 glyph={glyph} size="base" color={selected ? 'onSelected' : 'mutedText'} />
        </View>
      ) : null}
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight={selected ? 'bold' : 'medium'} tone={ink} numberOfLines={1}>
          {name}
        </TextV4>
      </View>
      {count > 0 ? (
        <BadgeV4
          tone={selected ? 'primary' : 'neutral'}
          variant="soft"
          size="sm"
          count={count}
          max={COUNT_CAP}
        />
      ) : null}
    </Pressable>
  );
}
