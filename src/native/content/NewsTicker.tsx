import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

export type NewsTickerVariant = 'scroll' | 'stacked';

export interface NewsTickerItem {
  /** Stable unique id. */
  id: string;
  /** Headline text. */
  text: string;
}

export interface NewsTickerProps {
  /** Breaking / latest headlines. */
  items: NewsTickerItem[];
  /** Optional leading label chip, e.g. `'LIVE'` or `'BREAKING'`. Pass `null` to hide. */
  label?: string | null;
  /** Called with an item's id when a headline is tapped. */
  onItemPress?: (id: string) => void;
  /**
   * - `scroll`  — single horizontal strip of headlines (default).
   * - `stacked` — vertical list of headline rows.
   */
  variant?: NewsTickerVariant;
  /** Show a placeholder while headlines load. */
  loading?: boolean;
  /** Message when there are no headlines. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A breaking-news ticker — the accent "LIVE / BREAKING" strip of latest
 * headlines. `scroll` lays the headlines out in a single horizontally
 * scrollable strip (separated by middots); `stacked` renders them as vertical
 * rows. Tapping a headline fires `onItemPress(id)`. Handles `loading` and empty
 * states. All colors from `SemanticColors`; no literal hex.
 */
export function NewsTicker({
  items,
  label = 'LIVE',
  onItemPress,
  variant = 'scroll',
  loading = false,
  emptyLabel = 'No headlines',
  style,
}: NewsTickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const labelChip =
    label != null ? (
      <View
        style={{
          backgroundColor: colors.danger,
          borderRadius: tokens.radius.sm,
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.sm,
          alignSelf: 'center',
        }}
      >
        <Text
          style={{ color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '800', letterSpacing: 0.8 }}
        >
          {label}
        </Text>
      </View>
    ) : null;

  const shell = (children: React.ReactNode): React.ReactElement => (
    <View
      accessibilityRole="summary"
      style={[
        {
          flexDirection: variant === 'scroll' ? 'row' : 'column',
          alignItems: variant === 'scroll' ? 'center' : 'stretch',
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
    return shell(
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Loading headlines…</Text>
    );
  }

  if (items.length === 0) {
    return shell(<Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>);
  }

  if (variant === 'stacked') {
    return shell(
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        {items.map((item) => (
          <HeadlineText key={item.id} item={item} onItemPress={onItemPress} numberOfLines={2} />
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
        <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {i > 0 ? <Text style={{ color: colors.muted }}>·</Text> : null}
          <HeadlineText item={item} onItemPress={onItemPress} numberOfLines={1} />
        </View>
      ))}
    </ScrollView>
  );
}

/** A single tappable headline (or plain text when no handler). */
function HeadlineText({
  item,
  onItemPress,
  numberOfLines,
}: {
  item: NewsTickerItem;
  onItemPress?: (id: string) => void;
  numberOfLines: number;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const text = (
    <Text
      numberOfLines={numberOfLines}
      style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
    >
      {item.text}
    </Text>
  );
  if (!onItemPress) return text;
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={item.text}
      onPress={() => onItemPress(item.id)}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, flexShrink: 1 })}
    >
      {text}
    </Pressable>
  );
}
