import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface PaginationProps {
  /** Current 1-based page. */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  onPageChange: (page: number) => void;
  /** How many pages to show either side of the current one (default 1). */
  siblingCount?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Page navigation — the native mirror of the web `Pagination`, with the same
 * ellipsis truncation. Prev/next arrows plus numbered page buttons, all
 * token-bound. Returns null when there is a single page. No literal colors.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  style,
}: PaginationProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (pageCount <= 1) return null;

  const wanted = new Set<number>([1, pageCount]);
  for (let i = page - siblingCount; i <= page + siblingCount; i++) {
    if (i >= 1 && i <= pageCount) wanted.add(i);
  }
  const sorted = Array.from(wanted).sort((a, b) => a - b);
  const items: (number | 'ellipsis')[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) items.push('ellipsis');
    items.push(p);
    prev = p;
  }

  const cell = (
    active: boolean,
    disabled: boolean,
    label: string,
    onPress: () => void,
    a11y: string,
    key: string
  ): React.ReactElement => (
    <Pressable
      key={key}
      accessibilityRole="button"
      accessibilityLabel={a11y}
      accessibilityState={{ selected: active, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={{
        height: 32,
        minWidth: 32,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: tokens.spacing.sm,
        borderRadius: tokens.radius.sm,
        backgroundColor: active ? colors.primary : 'transparent',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Text
        style={{
          color: active ? colors.onPrimary : colors.onSurface,
          fontSize: tokens.typography.scale.sm,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View
      accessibilityLabel="Pagination"
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}
    >
      {cell(false, page <= 1, '‹', () => onPageChange(page - 1), 'Previous', 'prev')}
      {items.map((it, i) =>
        it === 'ellipsis' ? (
          <Text
            key={`e${i}`}
            style={{ color: colors.muted, paddingHorizontal: tokens.spacing.xs }}
          >
            …
          </Text>
        ) : (
          cell(it === page, false, String(it), () => onPageChange(it), `Page ${it}`, `p${it}`)
        )
      )}
      {cell(false, page >= pageCount, '›', () => onPageChange(page + 1), 'Next', 'next')}
    </View>
  );
}
