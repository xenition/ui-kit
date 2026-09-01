import * as React from 'react';
import { Image, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { rowTextStyle, rowTrailingStyle } from '../dashboard/internal/row-v4';
import { formatMoney as defaultFormat } from '../commerce';
import { placeholderGround, spokenLine, TABULAR } from './internal/menu-v4';
import type { ReorderRowProps } from './ReorderRow';

export type ReorderRowV4Props = ReorderRowProps;

/**
 * **V4 reorder row** — the same props as {@link ReorderRow}.
 *
 * ## Five changes
 *
 * 1. **Reorder is reachable.** It sat inside a `Pressable` that is
 *    `accessible` by default and carried the row's own label, so VoiceOver
 *    flattened the row to one leaf and the button — the entire point of the
 *    component — did not exist. It is a **sibling** of the row's activation
 *    now. (The web twin loses it a different way: the row's `onKeyDown`
 *    cancels Enter's default action on the nested button, so Enter on
 *    "Reorder" opens the old order instead of reordering it.)
 * 2. **The row says what is in the order.** The name was title plus the meta
 *    line; the items summary — "2× Pad Thai, 1× Spring rolls", the thing that
 *    tells a person which past order this is — was pruned with everything else
 *    inside the button role.
 * 3. **`disabled` blocks the handler**, rather than only setting a flag beside
 *    a live one, and it is drawn at M3's 0.38 band on the thumbnail alone —
 *    the base dimmed the whole row to 0.6 and then *brightened* it to 0.9 on
 *    press, so a disabled row lit up under a finger.
 * 4. **The text and trailing slots come from the shared row family**, so a
 *    past order's title column and its action sit on the same rhythm as every
 *    other row in the kit. Only those two: the family's container is
 *    transparent and border-less by design, because there the *container* owns
 *    the card — and this row is its own framed card.
 * 5. **The thumbnail placeholder survives dark mode** — it was
 *    `tokens.ramps.neutral[100]`, which native copies without inverting.
 *
 * **Renders nothing without a `title`.**
 */
export function ReorderRowV4({
  title,
  itemsSummary,
  dateText,
  totalCents,
  currency = 'USD',
  imageUrl,
  onReorder,
  reorderLabel = 'Reorder',
  onPress,
  disabled = false,
  formatMoney = defaultFormat,
  style,
}: ReorderRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const tap = minTap(tokens.spacing);
  // The base's 56 thumbnail, composed rather than typed. Not the row family's
  // 44 leading slot: this row draws its own frame and its own leading size.
  const thumb = tokens.spacing['2xl'] + tokens.spacing.sm;
  const totalText = typeof totalCents === 'number' ? formatMoney(totalCents, currency) : null;
  const meta = metaLine([dateText, totalText]);

  // Change 2: the items summary is what identifies a past order.
  const spoken = spokenLine([title, itemsSummary, dateText, totalText]);

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    style,
  ];

  const summary = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <View
        style={{
          width: thumb,
          height: thumb,
          flexShrink: 0,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          // The one dim in this component, and it is not on the same element
          // as the press treatment.
          opacity: disabledOpacity(theme.state, disabled),
          backgroundColor: placeholderGround(theme),
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {title}
        </TextV4>
        {itemsSummary ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {itemsSummary}
          </TextV4>
        ) : null}
        {meta ? (
          <TextV4 size="xs" tone="mutedText" style={TABULAR}>
            {meta}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  const activation = onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={{ flex: 1, minWidth: 0 }}
    >
      {({ pressed }) => summary(pressed)}
    </Pressable>
  ) : (
    <View accessible accessibilityLabel={spoken} style={{ flex: 1, minWidth: 0 }}>
      {summary(false)}
    </View>
  );

  return (
    <View style={containerStyle}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
        }}
      >
        {activation}
        {/* Change 1: a sibling of the row's activation, never a descendant. */}
        {onReorder ? (
          <View style={rowTrailingStyle(theme)}>
            <ButtonV4
              variant="secondary"
              size="sm"
              disabled={disabled}
              // Change 3: the guard as well as the flag.
              onPress={disabled ? undefined : onReorder}
              accessibilityLabel={spokenLine([reorderLabel, title])}
              style={{ minHeight: tap }}
            >
              {reorderLabel}
            </ButtonV4>
          </View>
        ) : null}
      </View>
    </View>
  );
}
