import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { CardV4 } from '../primitives/CardV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { ratingParts, type RatingParts } from '../../hr/workforce-v4';
import { StatusPillV4 } from './StatusPillV4';
import { REVIEW_STATUS_V4, clampPercent, spokenLine } from './internal/tone-v4';
import type { PerformanceReviewProps } from './PerformanceReview';

export interface PerformanceReviewV4Props extends PerformanceReviewProps {
  /** Build the rating readout. Default `'4.5/5'`. */
  formatRating?: (parts: RatingParts) => string;
  /** Caption over the goal meter. Default `'Goals'`. */
  goalsLabel?: string;
  /** Build the due line. Default `` `Due ${date}` ``. */
  formatDue?: (date: string) => string;
}

/**
 * **V4 performance review** — same props as {@link PerformanceReview} plus
 * `formatRating`, `goalsLabel` and `formatDue`.
 *
 * ## Six changes
 *
 * 1. **Both meters are meters.** The rating was a `View` with
 *    `accessibilityRole="text"` — the web twin spelled the same thing as an
 *    `aria-label` on a bare `<span>`, which is role `generic` and cannot be
 *    named at all, so the two twins announced different things and neither was
 *    a `progressbar`. The goal meter *was* one, and it sat inside the card's
 *    `Pressable`, which flattens its subtree: its value was dropped before a
 *    reader ever saw it. Both are `progressbar`s now, and both sit **beside**
 *    the card's activation rather than under it.
 * 2. **Four and a half stars is not five.** The star row drew
 *    `Math.round(rated)` while the text beside it printed `rated` raw, so
 *    `rating={4.5}` filled **five** stars — a perfect score — next to the words
 *    "4.5/5". `ratingParts()` floors the filled count, so what is drawn and what
 *    is printed cannot disagree; the remainder is carried by the numeral.
 * 3. **`ratingMax={NaN}` no longer prints "NaN/NaN".** A badly parsed API field
 *    walked through `Math.max(1, Math.floor(NaN))` unchanged and rendered as
 *    visible text *and* as the accessible name.
 * 4. **The stars are inked with ink.** `colors.accent` is a **fill** slot used
 *    as a text colour; `accentText` is the contrast-corrected form.
 * 5. **No literals.** `letterSpacing: 2`, `height: 6`, `gap: 2` and
 *    `withAlpha(colors.onSurface, 0.1)` become the spacing scale and
 *    `ProgressV4`, whose track is composited from the tone rather than washed
 *    over whatever is behind it.
 * 6. **The card announces the whole review** — cycle, reviewer, rating, goal
 *    completion, status and due date — where the base said "Review H1 2026".
 *
 * The reviewer's avatar is `xs` on both twins; the web base used `sm`, so the
 * same review card had a different visual weight per platform.
 *
 * **Renders nothing without a `cycle`.**
 */
export function PerformanceReviewV4({
  cycle,
  reviewer,
  reviewerAvatarUrl,
  rating,
  ratingMax = 5,
  status,
  goalCompletion,
  goalCount,
  dueDate,
  variant = 'default',
  formatRating,
  goalsLabel = 'Goals',
  formatDue,
  onPress,
  testID,
  style,
}: PerformanceReviewV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!cycle) return null;

  const compact = variant === 'compact';
  const tap = minTap(tokens.spacing);

  const hasRating = rating != null && Number.isFinite(rating);
  const parts = ratingParts(rating ?? 0, ratingMax);
  const ratingText = (formatRating ?? ((p: RatingParts) => `${p.value}/${p.max}`))(parts);

  /*
    Floored, never rounded: a drawn mark claims a whole point. The remainder is
    carried by the numeral beside it rather than by a half-star glyph — the kit
    draws ratings with ★ and ☆ and nothing else, and a half-star codepoint has
    patchy font coverage on exactly the devices least able to render it.
  */
  const stars = Array.from({ length: parts.max }, (_, i) => (i < parts.filled ? '★' : '☆')).join('');

  const pct = clampPercent(goalCompletion);
  const showGoals = !compact && pct != null;
  const goalsCaption = goalCount != null ? `${goalsLabel} (${goalCount})` : goalsLabel;
  /*
    A status pill that sits BESIDE the activation is hidden from the reader when
    the row is interactive — the activation's own name already carries the
    status word, and hearing "Denied" twice in a row is worse than hearing it
    once. On a static row there is no activation to carry it, so the pill speaks
    for itself and the name leaves it out. Same rule on both twins.
  */
  const interactive = onPress != null;

  const statusMeta = status ? REVIEW_STATUS_V4[status] : undefined;
  const due = dueDate ? (formatDue ?? ((d: string) => `Due ${d}`))(dueDate) : null;

  const spoken = spokenLine([
    cycle,
    reviewer,
    hasRating ? ratingText : null,
    showGoals ? `${goalsCaption} ${pct}%` : null,
    interactive ? statusMeta?.label : null,
    due,
  ]);

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        minHeight: tap,
        justifyContent: 'center',
        gap: tokens.spacing.xs / 2,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1}>
        {cycle}
      </TextV4>
      {reviewer ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <AvatarV4 size="xs" name={reviewer} src={reviewerAvatarUrl} />
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {reviewer}
          </TextV4>
        </View>
      ) : null}
    </View>
  );

  return (
    <CardV4
      variant="outlined"
      padding={compact ? 'sm' : 'md'}
      testID={testID}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={spoken}
            onPress={onPress}
            style={{ flex: 1, borderRadius: tokens.radius.md }}
          >
            {({ pressed }) => identity(pressed)}
          </Pressable>
        ) : (
          <View accessible accessibilityLabel={spoken} style={{ flex: 1 }}>
            {identity(false)}
          </View>
        )}
        {statusMeta ? (
          <StatusPillV4 meta={statusMeta} size="sm" decorative={interactive} />
        ) : null}
      </View>

      {/* A meter, beside the activation rather than inside it — change 1. */}
      {hasRating ? (
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel={ratingText}
          accessibilityValue={{ min: 0, max: parts.max, now: parts.value }}
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
        >
          <TextV4
            size="base"
            style={{ color: colors.accentText, letterSpacing: tokens.spacing.xs / 2 }}
          >
            {stars}
          </TextV4>
          <TextV4 size="xs" weight="semibold" tone="mutedText" numeric="tabular">
            {ratingText}
          </TextV4>
        </View>
      ) : null}

      {showGoals ? (
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel={goalsCaption}
          accessibilityValue={{ min: 0, max: 100, now: pct }}
          style={{ gap: tokens.spacing.xs / 2 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextV4 size="xs" tone="mutedText">
              {goalsCaption}
            </TextV4>
            <TextV4 size="xs" weight="semibold" tone="mutedText" numeric="tabular">
              {`${pct}%`}
            </TextV4>
          </View>
          <ProgressV4 value={pct} max={100} size="sm" />
        </View>
      ) : null}

      {due ? (
        <TextV4 size="xs" tone="mutedText">
          {due}
        </TextV4>
      ) : null}
    </CardV4>
  );
}
