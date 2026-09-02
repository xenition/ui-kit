import * as React from 'react';
import { Pressable, View, type LayoutChangeEvent } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import {
  cardStyle,
  skeletonBlockStyle,
  spokenLine,
  tapTargetStyle,
  toneFill,
  trackGround,
} from './internal/tone-v4';
import type { StickerRewardProps } from './StickerReward';

export interface StickerRewardV4Props extends StickerRewardProps {
  /** The earned/total summary. Default `'3/12'`. */
  formatCount?: (earned: number, total: number) => string;
  /** Announced for an unlocked sticker. Default `'earned'`. */
  earnedLabel?: string;
  /** Announced for a locked sticker. Default `'locked'`. */
  lockedLabel?: string;
}

/**
 * **V4 sticker board** — same props as {@link StickerReward} plus
 * `formatCount`, `earnedLabel` and `lockedLabel`.
 *
 * ## Four changes
 *
 * 1. **`columns={4}` renders four columns.** Each cell was `width: '25%'` and
 *    the grid added a `gap` *on top of* that, so four cells plus three gaps
 *    exceeded the line and the fourth wrapped: the prop rendered **three**
 *    columns and quietly meant something other than what it said. The grid now
 *    measures itself and subtracts the gaps before dividing, so `columns={n}`
 *    is `n` at any width, on any seed's spacing scale.
 * 2. **A locked sticker is dimmed to M3's band, not to a guess.** `0.45` was
 *    picked by hand; `state.disabledContent` is 0.38 and is the same number
 *    every other unavailable thing in the kit uses, so a locked sticker and a
 *    disabled button read alike.
 * 3. **A sticker is a target.** The pressable was the cell with no size floor
 *    under it at all, and the glyph inside it was a 44 circle whose padding was
 *    the only thing keeping it near the tap floor. Every cell now clears 44,
 *    and press is a state layer rather than `opacity: pressed ? 0.6 : 1` —
 *    which is inside M3's *disabled* band, so a pressed sticker read as a
 *    locked one.
 * 4. **The board is a card and its skeleton is a skeleton.** It painted
 *    `colors.surface` — the page colour — and drew its loading blocks in
 *    `colors.border`, the hairline colour used as a fill.
 */
export function StickerRewardV4({
  stickers,
  title = 'Sticker rewards',
  columns = 4,
  loading = false,
  emptyLabel = 'No stickers yet',
  formatCount,
  earnedLabel = 'earned',
  lockedLabel = 'locked',
  onCollect,
  style,
}: StickerRewardV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [gridWidth, setGridWidth] = React.useState(0);

  const cols = Math.max(1, Math.floor(Number.isFinite(columns) ? columns : 1));
  const gap = tokens.spacing.sm;
  const tap = minTap(tokens.spacing);
  // Percentage widths cannot know about the gaps between them. Measuring is the
  // only honest way to divide a row into `cols` equal cells with `cols - 1`
  // gaps in it — which is defect 1.
  const cellWidth = gridWidth > 0 ? Math.max(tap, (gridWidth - gap * (cols - 1)) / cols) : undefined;

  const container = [cardStyle(theme), style];

  if (loading) {
    return (
      <View accessible accessibilityLabel="Loading stickers" style={container}>
        <View
          style={skeletonBlockStyle(theme, { height: tokens.typography.scale.base, width: '40%' })}
        />
        <View style={skeletonBlockStyle(theme, { height: tap })} />
      </View>
    );
  }

  const items = stickers ?? [];

  if (items.length === 0) {
    return (
      <View accessible accessibilityLabel={spokenLine([title, emptyLabel])} style={container}>
        <TextV4 size="base" weight="bold" tone="onCard">
          {title}
        </TextV4>
        <View
          style={{ alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }}
        >
          <TextV4
            size="2xl"
            allowFontScaling={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            ✨
          </TextV4>
          <TextV4 size="sm" tone="mutedText" align="center">
            {emptyLabel}
          </TextV4>
        </View>
      </View>
    );
  }

  const earnedCount = items.filter((s) => s.earned === true).length;
  const summary = (formatCount ?? ((e: number, t: number) => `${e}/${t}`))(
    earnedCount,
    items.length
  );

  const onGridLayout = (event: LayoutChangeEvent): void => {
    setGridWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={container}>
      <View
        accessible
        accessibilityLabel={spokenLine([title, summary])}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1} style={{ flexShrink: 1 }}>
          {title}
        </TextV4>
        <TextV4 size="sm" weight="semibold" tone="mutedText" numeric="tabular">
          {summary}
        </TextV4>
      </View>

      <View
        onLayout={onGridLayout}
        style={{ flexDirection: 'row', flexWrap: 'wrap', gap }}
      >
        {items.map((sticker, i) => {
          const earned = sticker.earned ?? false;
          const name = spokenLine([sticker.label ?? title, earned ? earnedLabel : lockedLabel]);

          const cell = (pressed: boolean): React.ReactElement => (
            <View
              style={{
                width: cellWidth,
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
              }}
            >
              <View
                style={[
                  tapTargetStyle(theme),
                  {
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: earned ? toneFill(theme, 'accent') : colors.border,
                    backgroundColor: earned ? 'transparent' : trackGround(theme),
                    opacity: earned ? 1 : disabledOpacity(theme.state, true),
                  },
                ]}
              >
                <TextV4 size="xl" allowFontScaling={false}>
                  {earned ? sticker.glyph : '🔒'}
                </TextV4>
              </View>
              {sticker.label ? (
                <TextV4 size="xs" tone="mutedText" align="center" numberOfLines={1}>
                  {sticker.label}
                </TextV4>
              ) : null}
            </View>
          );

          if (!onCollect) {
            return (
              <View key={sticker.id ?? i} accessible accessibilityLabel={name}>
                {cell(false)}
              </View>
            );
          }
          return (
            <Pressable
              key={sticker.id ?? i}
              accessibilityRole="button"
              accessibilityLabel={name}
              accessibilityState={{ selected: earned }}
              onPress={() => onCollect(i)}
            >
              {({ pressed }) => cell(pressed)}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
