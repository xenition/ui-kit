import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { needsExplanation } from '../../kids/family-v4';
import {
  cardStyle,
  metaLine,
  skeletonBlockStyle,
  spokenLine,
  type ToneV4,
} from './internal/tone-v4';
import type { MilestoneCardProps, MilestoneCategory } from './MilestoneCard';

/** Where a milestone stands. Declared identically on both twins. */
export type MilestoneStatus = 'upcoming' | 'achieved' | 'delayed';

export interface MilestoneCardV4Props extends MilestoneCardProps {
  /** Where the milestone stands. Defaults from `achieved`. */
  status?: MilestoneStatus;
  /** A neutral explanation for a delayed milestone. */
  note?: string;
  /** The word each status is printed and announced with. */
  statusLabels?: Partial<Record<MilestoneStatus, string>>;
}

const CATEGORY_GLYPH: Record<MilestoneCategory, string> = {
  physical: '🏃',
  cognitive: '🧠',
  social: '🤝',
  language: '💬',
  emotional: '❤️',
  other: '🌟',
};

const CATEGORY_LABEL: Record<MilestoneCategory, string> = {
  physical: 'Physical',
  cognitive: 'Cognitive',
  social: 'Social',
  language: 'Language',
  emotional: 'Emotional',
  other: 'Milestone',
};

const STATUS_MARK: Record<MilestoneStatus, { glyph: string; tone: ToneV4 }> = {
  upcoming: { glyph: '◦', tone: 'neutral' },
  achieved: { glyph: '✓', tone: 'success' },
  delayed: { glyph: '…', tone: 'warn' },
};

const STATUS_LABEL: Record<MilestoneStatus, string> = {
  upcoming: 'Upcoming',
  achieved: 'Achieved',
  delayed: 'Taking longer',
};

/**
 * **V4 milestone card** — same props as {@link MilestoneCard} plus `status`,
 * `note` and `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **A milestone has three states, not two.** `achieved` was a boolean, so a
 *    milestone a child had not reached at the expected age was indistinguishable
 *    from one whose age band has not arrived yet — the single fact a parent
 *    most needs from this screen. `status` adds `delayed`, and it is `warn`
 *    with a glyph and a word: **never `danger`**, because a child developing on
 *    their own schedule is not a fault and this module does not paint children
 *    in the error colour. `status` defaults from `achieved`, so a caller who
 *    passes neither sees exactly today's card.
 * 2. **A `delayed` milestone can explain itself.** `needsExplanation('delayed')`
 *    is what invites `note`, and the note is an explanation rather than a
 *    verdict.
 * 3. **The card is a card.** It painted `colors.surface` — the *page* colour —
 *    so it never read as raised, and its skeleton painted `colors.border`, the
 *    hairline colour used as a fill.
 * 4. **Press is a state layer**, not `opacity: pressed ? 0.85 : 1`, which sits
 *    inside M3's disabled band and made a pressed card read as unavailable.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function MilestoneCardV4({
  title,
  category = 'other',
  date,
  ageLabel,
  description,
  achieved = false,
  loading = false,
  status,
  note,
  statusLabels,
  onPress,
  style,
}: MilestoneCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const container = [cardStyle(theme), { gap: tokens.spacing.sm }, style];

  if (loading) {
    return (
      <View accessible accessibilityLabel="Loading milestone" style={container}>
        <View
          style={skeletonBlockStyle(theme, { height: tokens.typography.scale.base, width: '55%' })}
        />
        <View
          style={skeletonBlockStyle(theme, { height: tokens.typography.scale.xs, width: '40%' })}
        />
      </View>
    );
  }

  if (!title) return null;

  const glyph = CATEGORY_GLYPH[category] ?? CATEGORY_GLYPH.other;
  const categoryWord = CATEGORY_LABEL[category] ?? CATEGORY_LABEL.other;
  const state: MilestoneStatus = status ?? (achieved ? 'achieved' : 'upcoming');
  const mark = STATUS_MARK[state];
  const word = statusLabels?.[state] ?? STATUS_LABEL[state];
  const explanation = needsExplanation(state) ? note : undefined;
  const caption = metaLine([categoryWord, ageLabel, date]);
  const name = spokenLine([title, categoryWord, ageLabel, date, word, explanation]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        padding: tokens.spacing.xs,
        marginHorizontal: -tokens.spacing.xs,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressFill(theme) : 'transparent',
      }}
    >
      <TextV4
        size="2xl"
        allowFontScaling={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {glyph}
      </TextV4>
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={2}>
          {title}
        </TextV4>
        <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
          {caption}
        </TextV4>
      </View>
      <BadgeV4 tone={mark.tone} variant="soft" size="sm">
        {`${mark.glyph} ${word}`}
      </BadgeV4>
    </View>
  );

  return (
    <View style={container}>
      {onPress ? (
        <Pressable accessibilityRole="button" accessibilityLabel={name} onPress={onPress}>
          {({ pressed }) => body(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={name}>
          {body(false)}
        </View>
      )}

      {explanation ? (
        <TextV4 size="sm" tone="mutedText">
          {explanation}
        </TextV4>
      ) : null}

      {description ? (
        <TextV4 size="sm" tone="mutedText">
          {description}
        </TextV4>
      ) : null}
    </View>
  );
}
