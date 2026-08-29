import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { minTap } from './internal/nav-v4';
import type { PaginationProps } from './Pagination';
import { pressLayer } from './internal/state-v4';

export type { PaginationProps as PaginationV4Props };

/**
 * The pages to show: first, last, the current one and `siblingCount` either
 * side, with `'ellipsis'` wherever a run was skipped. Same truncation as the
 * base component — the arithmetic of "where am I in this list" is not a design
 * decision and should not differ between design lines.
 */
function pageItems(
  page: number,
  pageCount: number,
  siblingCount: number
): (number | 'ellipsis')[] {
  const wanted = new Set<number>([1, pageCount]);
  for (let i = page - siblingCount; i <= page + siblingCount; i++) {
    if (i >= 1 && i <= pageCount) wanted.add(i);
  }
  const items: (number | 'ellipsis')[] = [];
  let previous = 0;
  for (const p of Array.from(wanted).sort((a, b) => a - b)) {
    if (p - previous > 1) items.push('ellipsis');
    items.push(p);
    previous = p;
  }
  return items;
}

/**
 * **V4 pagination** — same props as {@link Pagination}, a different design
 * line.
 *
 * ## One page is filled; nothing else has chrome
 *
 * §32 asks the user to recognise where they are rather than reconstruct it, and
 * in a row of numbers the only thing that can carry that is a **contained
 * fill**. The current page gets `primary` with its guaranteed `onPrimary` and
 * weight 600; every other cell is plain `onSurface` with no ground, no border
 * and no tint. That contrast is what makes the answer findable in a glance —
 * one filled shape in a row of bare numerals — and it is exactly the hierarchy
 * §5 asks for, applied to a component that had none.
 *
 * The ellipsis stays `muted`: it is a gap marker, not a page, and a reader
 * should never spend a fixation deciding whether it is one.
 *
 * ## Reach — the change that actually matters
 *
 * The base cell was **32 × 32**, hard-coded. That is not a tap target on any
 * platform (§30, §46), and this is a component whose entire surface area is
 * tap targets sitting side by side, so a miss lands on the wrong page rather
 * than on nothing. Every cell is now 44 × 44, composed from the spacing scale
 * by `minTap` — the same expression `ButtonV4` and every other V4 navigation
 * control uses.
 *
 * The arrows keep their glyphs and gain the same target. A disabled arrow
 * drops to `muted` AND to 40% opacity, so "you cannot go back" survives a
 * reader who cannot separate the two colours.
 */
export function PaginationV4({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  style,
}: PaginationProps): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (pageCount <= 1) return null;

  const tap = minTap(tokens.spacing);
  const items = pageItems(page, pageCount, siblingCount);

  const cell = (options: {
    key: string;
    label: string;
    a11yLabel: string;
    current: boolean;
    disabled: boolean;
    onPress: () => void;
  }): React.ReactElement => (
    <Pressable
      key={options.key}
      accessibilityRole="button"
      accessibilityLabel={options.a11yLabel}
      accessibilityState={{ selected: options.current, disabled: options.disabled }}
      disabled={options.disabled}
      onPress={options.onPress}
      style={({ pressed }) => ({
        minHeight: tap,
        minWidth: tap,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: tokens.spacing.xs,
        borderRadius: tokens.radius.md,
        // Exactly one cell in the row is filled; the rest are bare numerals.
        backgroundColor: options.current
          ? colors.primary
          : pressed && !options.disabled
            ? pressLayer(theme)
            : 'transparent',
        opacity: options.disabled ? theme.state.disabledContent : 1,
      })}
    >
      <Text
        style={{
          color: options.current
            ? colors.onPrimary
            : options.disabled
              ? colors.mutedText
              : colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontFamily: tokens.typography.fontBody,
          fontWeight: options.current ? '600' : '500',
        }}
      >
        {options.label}
      </Text>
    </Pressable>
  );

  return (
    <View
      accessibilityLabel="Pagination"
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
        style,
      ]}
    >
      {cell({
        key: 'prev',
        label: '‹',
        a11yLabel: 'Previous',
        current: false,
        disabled: page <= 1,
        onPress: () => onPageChange(page - 1),
      })}
      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <Text
            key={`ellipsis-${index}`}
            style={{
              // A gap marker, not a page. Never let a reader spend a fixation
              // deciding whether it is one.
              color: colors.mutedText,
              fontSize: tokens.typography.scale.sm,
              paddingHorizontal: tokens.spacing.xs,
            }}
          >
            …
          </Text>
        ) : (
          cell({
            key: `page-${item}`,
            label: String(item),
            a11yLabel: `Page ${item}`,
            current: item === page,
            disabled: false,
            onPress: () => onPageChange(item),
          })
        )
      )}
      {cell({
        key: 'next',
        label: '›',
        a11yLabel: 'Next',
        current: false,
        disabled: page >= pageCount,
        onPress: () => onPageChange(page + 1),
      })}
    </View>
  );
}
