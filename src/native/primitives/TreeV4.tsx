import * as React from 'react';
import { LayoutAnimation, Platform, Pressable, Text, UIManager, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { SELECT_MIX } from '../../primitives/internal/v4-data';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import type { TreeNode, TreeProps } from './Tree';
import { pressFill } from './internal/state-v4';

export type { TreeProps as TreeV4Props, TreeNode };

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * **V4 tree** — same props as {@link Tree}, a different design line.
 *
 * A tree's whole job is to make a hierarchy visible, and the base fills the
 * selected row edge-to-edge with solid `primary`. That answers "which one" and
 * destroys the answer to "where am I": the indentation, the caret and the
 * label all vanish under a brand bar, and on a deep tree the bar is the
 * loudest thing on the screen — §35.6 asks that colour create hierarchy rather
 * than noise, and §35.5 that accents stay rare.
 *
 * Three changes:
 *
 * 1. **Selection tints, it does not repaint.** 12% `primary` composited into
 *    `surface`, the label in `primaryText` at weight 600. The row still reads
 *    as chosen at a glance, and the structure it sits in survives. The label
 *    is re-measured with `ensureContrast` against the tint the row actually
 *    painted, so the promise is about this row rather than about the page it
 *    was designed on.
 * 2. **The indent is the structure, and it matches its twin.** Both twins now
 *    step by `spacing.lg` per level. The base web twin used a literal `1rem`
 *    while native used `spacing.lg`, so the same tree was a different shape on
 *    the two platforms — and §9 makes indentation the one thing a tree cannot
 *    get wrong.
 * 3. **A row is a real target and never a card.** Every row takes the same
 *    `xl + xs` height the V4 tables use, so the whole line is one rhythm, and
 *    a press tints from the two scheme-resolved neutral slots instead of the
 *    light-oriented ramp step the base web twin reached for.
 *
 * **No guide lines and no depth.** Vertical guides are the obvious "premium"
 * addition and they are ink per level for something 24pt of indentation
 * already says (§7, §9). Nothing lifts: a tree row that casts a shadow is a
 * card in a stack of cards (§8).
 */
export function TreeV4({
  data,
  defaultExpanded = [],
  selectedId,
  onSelect,
  style,
}: TreeProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [expanded, setExpanded] = React.useState<string[]>(defaultExpanded);

  const toggle = (id: string): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // The two grounds a row can own, composited once so neither borrows the
  // colour of whatever is behind the tree.
  const selectedBg = mixToken(colors.surface, colors.primary, SELECT_MIX);
  const pressedBg = pressFill(theme);
  const selectedInk = ensureContrast(colors.primaryText, selectedBg, MIN_CONTRAST);
  const rowHeight = tokens.spacing.xl + tokens.spacing.xs;

  const renderNodes = (nodes: TreeNode[], depth: number): React.ReactNode =>
    nodes.map((node) => {
      const hasChildren = (node.children?.length ?? 0) > 0;
      const isOpen = expanded.includes(node.id);
      const isSelected = selectedId != null && node.id === selectedId;
      return (
        <View key={node.id}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: hasChildren ? isOpen : undefined, selected: isSelected }}
            onPress={() => {
              if (hasChildren) toggle(node.id);
              onSelect?.(node);
            }}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              minHeight: rowHeight,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.sm,
              // Indentation is the hierarchy (§9) — one `lg` step per level,
              // the same step the web twin takes.
              paddingLeft: tokens.spacing.sm + depth * tokens.spacing.lg,
              borderRadius: tokens.radius.sm,
              // Selection wins over the press tint: pointing at the chosen row
              // must not un-choose it.
              backgroundColor: isSelected ? selectedBg : pressed ? pressedBg : 'transparent',
            })}
          >
            <Text
              style={{
                width: tokens.spacing.md,
                color: isSelected ? selectedInk : colors.mutedText,
                fontSize: tokens.typography.scale.xs,
                transform: [{ rotate: isOpen ? '90deg' : '0deg' }],
              }}
            >
              {hasChildren ? '▸' : ''}
            </Text>
            {typeof node.label === 'string' ? (
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  color: isSelected ? selectedInk : colors.onSurface,
                  fontFamily: tokens.typography.fontBody,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: isSelected ? '600' : '400',
                }}
              >
                {node.label}
              </Text>
            ) : (
              node.label
            )}
          </Pressable>
          {hasChildren && isOpen ? renderNodes(node.children ?? [], depth + 1) : null}
        </View>
      );
    });

  return (
    <View accessibilityRole="list" style={style}>
      {renderNodes(data, 0)}
    </View>
  );
}
