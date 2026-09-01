import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TagV4 } from '../primitives/TagV4';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { minTap } from '../primitives/internal/chrome-v4';
import type { ToneV4 } from './internal/reading-v4';
import type { NewsTickerItem, NewsTickerProps } from './NewsTicker';

export interface NewsTickerV4Props extends NewsTickerProps {
  /** Announced while the headlines load. Default `'Loading headlines…'`. */
  loadingLabel?: string;
  /** The strip's accessible name. Default `'Latest headlines'`. */
  regionLabel?: string;
  /** Tone of the leading `label` chip. Default `'neutral'`. */
  labelTone?: ToneV4;
}

/**
 * **V4 news ticker** — same props as {@link NewsTicker} plus `loadingLabel`,
 * `regionLabel` and `labelTone`.
 *
 * ## Six changes
 *
 * 1. **The eyebrow stops being an error.** `label` is caller copy — the prop
 *    doc offers `'LIVE'` and `'BREAKING'` as examples — and it was painted in
 *    `danger` unconditionally, so a section name or a sponsor tag came out in
 *    the colour that means something has gone wrong. It defaults to `neutral`;
 *    a newsroom that genuinely wants red passes `labelTone="danger"`.
 * 2. **Loading draws the ticker's own skeleton.** The base collapsed to a
 *    single line of text and then reflowed to N headlines, and the line was
 *    hard-coded English two lines below a parameterised `emptyLabel`.
 * 3. **The strip is named on both twins.** This one had no name at all, so a
 *    reader met an unlabelled group of headlines.
 * 4. **A headline is the same control on both twins** — a button, where this
 *    twin said `link` — and it clears 44.
 * 5. **The separator dots are hidden from the reader**, where they were
 *    announced between every headline.
 * 6. **Press is a state layer**, not `opacity: 0.6`.
 */
export function NewsTickerV4({
  items,
  label = 'LIVE',
  onItemPress,
  variant = 'scroll',
  loading = false,
  emptyLabel = 'No headlines',
  loadingLabel = 'Loading headlines…',
  regionLabel = 'Latest headlines',
  labelTone = 'neutral',
  style,
}: NewsTickerV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const scroll = variant === 'scroll';

  const labelChip =
    label != null ? (
      <TagV4 tone={labelTone} variant="solid" size="sm">
        {label}
      </TagV4>
    ) : null;

  const shell = (children: React.ReactNode, busy = false): React.ReactElement => (
    <View
      accessibilityRole="summary"
      accessibilityLabel={busy ? loadingLabel : regionLabel}
      accessibilityLiveRegion={busy ? 'polite' : 'none'}
      style={[
        {
          flexDirection: scroll ? 'row' : 'column',
          alignItems: scroll ? 'center' : 'stretch',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      {labelChip}
      {children}
    </View>
  );

  if (loading) {
    // The shape it is about to be, so nothing reflows when the wire lands.
    return shell(
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        {(scroll ? (['70%'] as const) : (['90%', '75%', '60%'] as const)).map((width) => (
          <SkeletonV4
            key={width}
            variant="rect"
            width={width}
            height={tokens.typography.scale.sm}
          />
        ))}
      </View>,
      true
    );
  }

  if (items.length === 0) {
    return shell(
      <TextV4 size="sm" tone="mutedText">
        {emptyLabel}
      </TextV4>
    );
  }

  if (!scroll) {
    return shell(
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        {items.map((item) => (
          <Headline key={item.id} item={item} onItemPress={onItemPress} numberOfLines={2} />
        ))}
      </View>
    );
  }

  return shell(
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center', gap: tokens.spacing.sm }}
      style={{ flex: 1 }}
    >
      {items.map((item, i) => (
        <View
          key={item.id}
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
        >
          {i > 0 ? (
            <TextV4
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              size="sm"
              tone="mutedText"
            >
              ·
            </TextV4>
          ) : null}
          <Headline item={item} onItemPress={onItemPress} numberOfLines={1} />
        </View>
      ))}
    </ScrollView>
  );
}

/** One headline — a button when it goes somewhere, plain text when it does not. */
function Headline({
  item,
  onItemPress,
  numberOfLines,
}: {
  item: NewsTickerItem;
  onItemPress?: (id: string) => void;
  numberOfLines: number;
}): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const text = (
    <TextV4 size="sm" weight="semibold" tone="onSurface" numberOfLines={numberOfLines}>
      {item.text}
    </TextV4>
  );

  if (!onItemPress) return text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.text}
      onPress={() => onItemPress(item.id)}
      style={({ pressed }) => ({
        flexShrink: 1,
        justifyContent: 'center',
        minHeight: minTap(tokens.spacing),
        paddingHorizontal: tokens.spacing.xs,
        borderRadius: tokens.radius.sm,
        backgroundColor: pressed ? pressFill(theme) : 'transparent',
      })}
    >
      {text}
    </Pressable>
  );
}
