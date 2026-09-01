import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { formatMoney as defaultFormat } from '../commerce';
import { onPair, spokenLine, toneInk } from './internal/menu-v4';
import type { ModifierListProps } from './ModifierList';

export interface ModifierListV4Props extends ModifierListProps {
  /** The word marking the group required. Default `'Required'`. */
  requiredLabel?: string;
}

/** The check / dot indicator, square. `2xl - md` off the scale. */
function markSize(spacing: { '2xl': number; md: number }): number {
  return spacing['2xl'] - spacing.md;
}

/**
 * **V4 modifier list** — same props as {@link ModifierList} plus
 * `requiredLabel`.
 *
 * ## Five changes
 *
 * 1. **A paid extra is no longer added in silence.** Each row was a
 *    `checkbox` / `radio` carrying `accessibilityLabel={option.label}`, and
 *    both roles are children-presentational — so "Extra cheese" was announced
 *    and "+$1.50" was not. The price delta is part of the row's one name now.
 * 2. **`required` reaches assistive tech.** It was a red word beside the
 *    heading and nothing else; it is folded into the group's name, the way
 *    `LabelV4` folds it into a field's.
 * 3. **A row clears 44.** The rows were roughly 38 tall, on a control a thumb
 *    hits repeatedly while building an order.
 * 4. **Disabled means the handler does not fire**, and it is drawn at M3's
 *    0.38 band rather than a hand-picked 0.5 — and press is a state layer, so
 *    a pressed row no longer reads as an unavailable one.
 * 5. **The empty case is a real empty state**, not a lone grey line.
 */
export function ModifierListV4({
  options,
  mode = 'multi',
  title,
  required = false,
  requiredLabel = 'Required',
  onToggle,
  currency = 'USD',
  emptyLabel = 'No options',
  formatMoney = defaultFormat,
  style,
}: ModifierListV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const single = mode === 'single';
  const tap = minTap(tokens.spacing);
  const mark = markSize(tokens.spacing);

  const groupName = spokenLine([title, required ? requiredLabel : null]);

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {title ? (
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <TextV4 accessibilityRole="header" size="base" weight="semibold" tone="onSurface">
            {title}
          </TextV4>
          {required ? (
            <TextV4 size="xs" weight="semibold" style={{ color: toneInk(theme, 'danger') }}>
              {requiredLabel}
            </TextV4>
          ) : null}
        </View>
      ) : null}

      {options.length === 0 ? (
        <View
          accessible
          accessibilityRole="summary"
          style={{
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            paddingVertical: tokens.spacing.lg,
            paddingHorizontal: tokens.spacing.md,
          }}
        >
          <TextV4 size="sm" tone="mutedText" align="center">
            {emptyLabel}
          </TextV4>
        </View>
      ) : (
        <View
          accessibilityRole={single ? 'radiogroup' : undefined}
          accessibilityLabel={groupName !== '' ? groupName : undefined}
          style={{
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            overflow: 'hidden',
          }}
        >
          {options.map((option, index) => {
            const selected = option.selected === true;
            const disabled = option.disabled === true;
            const cents = option.priceCents;
            const hasDelta = typeof cents === 'number' && cents !== 0;
            const deltaText = hasDelta
              ? `${(cents as number) > 0 ? '+' : '−'}${formatMoney(Math.abs(cents as number), currency)}`
              : null;
            // Change 1: the delta is in the name, because the role prunes it
            // out of the subtree.
            const rowName = spokenLine([option.label, deltaText, required ? requiredLabel : null]);

            return (
              <Pressable
                key={option.id}
                accessibilityRole={single ? 'radio' : 'checkbox'}
                accessibilityState={{ checked: selected, disabled }}
                accessibilityLabel={rowName}
                disabled={disabled}
                // Change 4: the guard as well as the flag.
                onPress={disabled ? undefined : () => onToggle?.(option.id)}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.sm,
                  minHeight: tap,
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.md,
                  borderTopWidth: index === 0 ? 0 : 1,
                  borderTopColor: colors.border,
                  opacity: disabledOpacity(theme.state, disabled),
                  backgroundColor: pressed
                    ? pressOver(theme, colors.card, colors.onCard)
                    : 'transparent',
                })}
              >
                <View
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={{
                    width: mark,
                    height: mark,
                    borderRadius: single ? tokens.radius.full : tokens.radius.sm,
                    borderWidth: 2,
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected ? colors.primary : colors.card,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selected ? (
                    <IconV4
                      glyph={single ? '●' : '✓'}
                      size="xs"
                      style={{ color: onPair(theme, 'primary') }}
                    />
                  ) : null}
                </View>
                <TextV4 size="sm" tone="onCard" style={{ flex: 1 }}>
                  {option.label}
                </TextV4>
                {deltaText ? (
                  <TextV4 size="sm" tone="mutedText" numeric="tabular">
                    {deltaText}
                  </TextV4>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
