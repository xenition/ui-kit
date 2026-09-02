import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { MIN_NON_TEXT_CONTRAST } from '../../primitives/internal/feedback-v4';
import { ensureContrast } from '../../theme/color';
import { starParts } from '../../kids/family-v4';
import { spokenLine, tapTargetStyle } from './internal/tone-v4';
import type { RewardStarProps, RewardStarSize } from './RewardStar';

export interface RewardStarV4Props extends RewardStarProps {
  /** The count, spoken and printed. Default `'3 of 5 stars'`. */
  formatCount?: (filled: number, max: number) => string;
  /** Verb the per-star buttons are named with. Default `'Award'`. */
  awardLabel?: string;
}

const SIZE_KEY: Record<RewardStarSize, 'lg' | 'xl' | '2xl'> = {
  sm: 'lg',
  md: 'xl',
  lg: '2xl',
};

/**
 * **V4 reward star** — same props as {@link RewardStar} plus `formatCount` and
 * `awardLabel`.
 *
 * ## Four changes
 *
 * 1. **The swipe gestures the control promised now exist — as buttons.** The
 *    base declared `accessibilityRole="adjustable"` and no
 *    `accessibilityActions`, so VoiceOver offered swipe-up and swipe-down and
 *    both did **nothing**: the control announced itself as adjustable and could
 *    not be adjusted. The web twin meanwhile used `role="group"`/`"img"`, so
 *    the same component was two different things on two platforms. Both twins
 *    now use one model — **one real button per star** — because it is the only
 *    one both platforms can express identically, it needs no gesture
 *    vocabulary, and a child using switch control or a keyboard reaches every
 *    value directly instead of stepping through them.
 * 2. **The stars are targets.** They were a ~20px glyph with `hitSlop={6}` — a
 *    32px target with slop that overlaps its neighbours', in a module built for
 *    people whose aim is worse than an adult's. Each star is now a 44 control.
 * 3. **The count is drawn as a number, not only as five pictures of one.**
 *    `starParts` clamps what is **drawn** and leaves the caller's own value
 *    alone, and the numeral beside the glyphs is what a low-vision or
 *    colour-blind user actually reads — five glyphs at `sm` are not a number.
 *    It is `formatCount`, so it translates.
 * 4. **Press is a state layer** rather than `opacity: pressed ? 0.6 : 1`, which
 *    is well inside M3's *disabled* band, and the filled star's ink is held to
 *    3:1 against the ground rather than being whatever `colors[color]` happened
 *    to be.
 *
 * **Renders nothing when there is no scale to draw** (`max <= 0`, §4.5).
 */
export function RewardStarV4({
  value,
  max = 5,
  size = 'md',
  label,
  color = 'warn',
  readOnly = false,
  formatCount,
  awardLabel = 'Award',
  onReward,
  style,
}: RewardStarV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const parts = starParts(value, max);
  if (!parts.hasScale) return null;

  const format = formatCount ?? ((filled: number, total: number) => `${filled} of ${total} stars`);
  const count = format(parts.filled, parts.max);
  const interactive = !readOnly && !!onReward;
  // A star is a graphic, so 3:1 — and against the card it is drawn on, not
  // against whatever ground `colors[color]` was measured on.
  const filledInk = ensureContrast(colors[color], colors.card, MIN_NON_TEXT_CONTRAST);

  const star = (isFilled: boolean): React.ReactElement => (
    <TextV4
      size={SIZE_KEY[size] ?? 'xl'}
      allowFontScaling={false}
      style={{ color: isFilled ? filledInk : colors.mutedText }}
    >
      {isFilled ? '★' : '☆'}
    </TextV4>
  );

  const glyphs = Array.from({ length: parts.max }).map((_, i) => {
    const isFilled = i < parts.filled;
    if (!interactive) {
      return (
        <View
          key={i}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ paddingHorizontal: tokens.spacing.xs / 2 }}
        >
          {star(isFilled)}
        </View>
      );
    }
    return (
      <Pressable
        key={i}
        accessibilityRole="button"
        accessibilityLabel={`${awardLabel}: ${format(i + 1, parts.max)}`}
        accessibilityState={{ selected: isFilled }}
        onPress={() => onReward?.(i + 1)}
        style={({ pressed }) => [
          tapTargetStyle(theme),
          {
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? pressFill(theme) : 'transparent',
          },
        ]}
      >
        {star(isFilled)}
      </Pressable>
    );
  });

  const row = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
      {glyphs}
    </View>
  );

  return (
    <View style={[{ gap: tokens.spacing.xs, alignItems: 'flex-start' }, style]}>
      {row}
      {/* The numeral, always — and the group's only spoken stop when the stars
          are display-only. Five glyphs are a picture of a number, not one. */}
      <TextV4 size="sm" tone="mutedText" numeric="tabular">
        {spokenLine([count, label])}
      </TextV4>
    </View>
  );
}
