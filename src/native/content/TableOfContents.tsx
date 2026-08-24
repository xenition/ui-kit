import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import type { TocItem } from './types';

export interface TableOfContentsProps {
  /** The document headings, in reading order. */
  items: TocItem[];
  /** Id of the currently in-view heading (highlighted). */
  activeId?: string;
  /** Called with a heading id when tapped (scroll the reader to it). */
  onSelect?: (id: string) => void;
  /** Optional heading above the list. Pass `null` to hide. */
  title?: string | null;
  /** Text shown when there are no headings. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** Per-nesting-level indent (guards against undefined `level`). */
function indentFor(level: number | undefined, unit: number): number {
  const depth = Math.max(0, (level ?? 1) - 1);
  return depth * unit;
}

/**
 * An in-article table of contents — the jump-list of headings for a long read.
 * Data-driven via `items` (each a `{ id, label, level }` heading); indents by
 * nesting `level` and highlights the `activeId` in the accent color. Tapping a
 * row fires `onSelect(id)` so the reader can scroll to that anchor. Renders an
 * `emptyLabel` when there are no headings. All colors from `SemanticColors`;
 * no literal hex.
 */
export function TableOfContents({
  items,
  activeId,
  onSelect,
  title = 'Contents',
  emptyLabel = 'No sections',
  style,
}: TableOfContentsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      accessibilityRole="menu"
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          gap: tokens.spacing.xs,
        },
        style,
      ]}
    >
      {title != null ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            marginBottom: tokens.spacing.xs,
          }}
        >
          {title}
        </Text>
      ) : null}

      {items.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      ) : (
        items.map((item) => {
          const active = item.id === activeId;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="menuitem"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: active }}
              disabled={!onSelect}
              onPress={onSelect ? () => onSelect(item.id) : undefined}
              style={({ pressed }) => ({
                paddingVertical: tokens.spacing.xs,
                paddingLeft: indentFor(item.level, tokens.spacing.md),
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <Text
                numberOfLines={2}
                style={{
                  color: active ? colors.accent : colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: active ? '700' : '400',
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })
      )}
    </View>
  );
}
