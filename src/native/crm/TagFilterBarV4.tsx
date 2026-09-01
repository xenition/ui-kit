import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { toneFill, toneOnOf } from './internal/crm-v4';
import type { TagFilterBarProps } from './TagFilterBar';

export interface TagFilterBarV4Props extends TagFilterBarProps {
  /** How a chip's label and count read together. Default `'Enterprise, 12'`. */
  formatFilterLabel?: (label: string, count?: number) => string;
}

/**
 * **V4 tag filter bar** — same props as {@link TagFilterBar} plus
 * `formatFilterLabel`.
 *
 * ## Six changes
 *
 * 1. **A selected chip is readable.** Native filled with `colors[tone]` and
 *    inked with `colors.onSurface` for every tone but `primary` and `accent` —
 *    body ink on a saturated brand fill, with no contrast promise at all. And
 *    `neutral` filled the chip with `colors.muted`, a **text** token. Both go
 *    through `toneFill` / `toneOnOf`, so every fill wears its own paired ink.
 *    The web twin was already correct here; the same prop was unreadable on
 *    one platform only.
 * 2. **The idle chip's ground is opaque.** It was a 4% wash of `onSurface`,
 *    so the chip's rendered colour depended on whatever the bar was sitting
 *    over.
 * 3. **Chips clear 44**, which a 8px-padded pill did not.
 * 4. **Clear is a real button.** Red text alone is a colour-only affordance
 *    with no target; it gains a ground, a border and a full-height box.
 * 5. **The count joins the chip's name.** It was rendered on screen and never
 *    announced.
 * 6. **Selection is announced once.** The base said `accessibilityState`
 *    *and* appended ", selected" to the label, so a reader said it twice.
 *    Plus rule B.
 */
export function TagFilterBarV4({
  tags,
  selected,
  onToggle,
  onClear,
  tone = 'primary',
  emptyLabel = 'No filters',
  formatFilterLabel,
  style,
}: TagFilterBarV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const fill = toneFill(theme, tone);
  const onFill = toneOnOf(theme, tone);
  const tap = minTap(tokens.spacing);
  const hasActive = selected.length > 0;
  const chipLabel =
    formatFilterLabel ?? ((label: string, count?: number) =>
      count == null ? label : `${label}, ${count}`);

  if (tags.length === 0) {
    return (
      <View
        accessibilityRole="summary"
        style={[{ paddingVertical: tokens.spacing.sm }, style]}
      >
        <TextV4 size="sm" tone="mutedText">
          {emptyLabel}
        </TextV4>
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style}>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.xs, alignItems: 'center' }}>
        {tags.map((tag) => {
          const isOn = selected.includes(tag.key);
          const ground = isOn ? fill : colors.card;
          const ink = isOn ? onFill : colors.onCard;
          return (
            <Pressable
              key={tag.key}
              accessibilityRole="button"
              // Announced once, by the state — not also spelled into the name.
              accessibilityState={{ selected: isOn }}
              accessibilityLabel={`Filter ${chipLabel(tag.label, tag.count)}`}
              onPress={() => onToggle(tag.key)}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.xs / 2,
                minHeight: tap,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: isOn ? fill : colors.border,
                backgroundColor: pressed ? pressOver(theme, ground, ink) : ground,
              })}
            >
              {isOn ? (
                <TextV4 size="xs" weight="bold" style={{ color: ink }}>
                  ✓
                </TextV4>
              ) : null}
              <TextV4
                size="sm"
                weight={isOn ? 'bold' : 'medium'}
                style={{ color: ink }}
              >
                {tag.label}
              </TextV4>
              {tag.count != null ? (
                <TextV4 size="xs" weight="semibold" style={{ color: ink }}>
                  {`${tag.count}`}
                </TextV4>
              ) : null}
            </Pressable>
          );
        })}

        {onClear && hasActive ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear filters"
            onPress={onClear}
            style={({ pressed }) => ({
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: tap,
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.md,
              borderRadius: tokens.radius.full,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: pressed
                ? pressOver(theme, colors.card, colors.onCard)
                : colors.card,
            })}
          >
            <TextV4 size="sm" weight="semibold" tone="dangerText">
              Clear
            </TextV4>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}
