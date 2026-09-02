import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { cardSurfaceStyle, metaLine, relativeLabel, spokenName } from './internal/tone-v4';
import type { ResumeRowProps } from './ResumeRow';

export interface ResumeRowV4Props extends ResumeRowProps {
  /** Copy on the default marker. Default `'Default'`. */
  defaultLabel?: string;
  /** Copy on the set-default action. Default `'Set default'`. */
  setDefaultLabel?: string;
  /** Name of the download affordance. Default `'Download'`. */
  downloadLabel?: string;
  /** Re-word the updated age. Default `'2d ago'`. */
  formatRelative?: (iso: string) => string;
}

/**
 * **V4 résumé row** — same props as {@link ResumeRow} plus `defaultLabel`,
 * `setDefaultLabel`, `downloadLabel` and `formatRelative`.
 *
 * ## Five changes
 *
 * 1. **Download and Set default are reachable.** Both sat inside the row's own
 *    `Pressable`, which flattens its subtree on native — so neither was a
 *    focus stop, and the ⬇ had `hitSlop={8}` and no size of its own, roughly
 *    28 points of target for the row's primary action. Both are now siblings
 *    of the activation, with names and 44 targets.
 * 2. **`Default` stopped being a success badge.** Which of three files is the
 *    default one is **identity**, not health — spending `success` on it means
 *    the other two résumés read as somehow not-good. A neutral outline chip
 *    says the same thing and leaves green meaning green.
 * 3. **The file tile stopped being drawn in `border`.** `border` is the
 *    hairline colour; as a 40-square fill it made the tile read as an empty
 *    input. It is now a soft `IconV4` badge, whose ground and glyph are a
 *    measured pair.
 * 4. **The row announces the file, not just its name.** The updated age, the
 *    size and the default marker are all inside the activation and flattened
 *    into it, so they belong in its name.
 * 5. **Tokens and press.** `muted` inking the meta line becomes `mutedText`,
 *    `surface` becomes `card`, and `opacity: 0.9` becomes a state layer.
 *
 * **Renders nothing without a file name** (§4.5).
 */
export function ResumeRowV4({
  resume,
  onPress,
  onDownload,
  onSetDefault,
  defaultLabel = 'Default',
  setDefaultLabel = 'Set default',
  downloadLabel = 'Download',
  formatRelative,
  style,
}: ResumeRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!resume?.name) return null;

  const isDefault = resume.isDefault === true;
  const meta = metaLine([relativeLabel(resume.updatedAt, formatRelative), resume.sizeLabel]);
  const tap = minTap(tokens.spacing);
  const name = spokenName([resume.name, isDefault ? defaultLabel : null, meta]);

  const body = (
    <>
      <IconV4
        name="document"
        size="lg"
        color="primary"
        badge="soft"
        badgeShape="rounded"
      />
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <TextV4
            size="sm"
            weight="semibold"
            tone="onCard"
            numberOfLines={1}
            style={{ flexShrink: 1 }}
          >
            {resume.name}
          </TextV4>
          {/* Neutral: which file is the default one is identity, not health. */}
          {isDefault ? (
            <BadgeV4 tone="neutral" variant="outline" size="sm">
              {defaultLabel}
            </BadgeV4>
          ) : null}
        </View>
        {meta ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {meta}
          </TextV4>
        ) : null}
      </View>
    </>
  );

  return (
    <View
      style={[
        cardSurfaceStyle(theme),
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={name}
          onPress={() => onPress(resume)}
          style={({ pressed }) => ({
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
          })}
        >
          {body}
        </Pressable>
      ) : (
        <View
          accessible
          accessibilityLabel={name}
          style={{
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
          }}
        >
          {body}
        </View>
      )}

      {/* Siblings of the activation — see change 1. */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {!isDefault && onSetDefault ? (
          <ButtonV4
            variant="ghost"
            size="sm"
            onPress={() => onSetDefault(resume)}
            accessibilityLabel={spokenName([setDefaultLabel, resume.name])}
            style={{ minHeight: tap }}
          >
            {setDefaultLabel}
          </ButtonV4>
        ) : null}
        {onDownload ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={spokenName([downloadLabel, resume.name])}
            onPress={() => onDownload(resume)}
            style={({ pressed }) => ({
              minWidth: tap,
              minHeight: tap,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              backgroundColor: pressed
                ? pressOver(theme, colors.card, colors.onCard)
                : 'transparent',
            })}
          >
            <IconV4 name="download" size="lg" color="primaryText" />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
