import * as React from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  children?: TreeNode[];
}

export interface TreeProps {
  /** Root nodes; each may nest `children` to any depth. */
  data: TreeNode[];
  /** Node ids expanded on first render. */
  defaultExpanded?: string[];
  /** Currently selected node id (controlled highlight). */
  selectedId?: string;
  /** Fires when a node row is tapped. */
  onSelect?: (node: TreeNode) => void;
  style?: StyleProp<ViewStyle>;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Expandable/collapsible hierarchy view. Each level is indented by
 * `tokens.spacing.lg`; nodes with `children` show a rotating caret and toggle
 * inline (animated via `LayoutAnimation`). Selection highlights with
 * `colors.primary`; all color/spacing values come from the compiled theme
 * tokens via `useXenitionTheme()` — no literal colors.
 */
export function Tree({
  data,
  defaultExpanded = [],
  selectedId,
  onSelect,
  style,
}: TreeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [expanded, setExpanded] = React.useState<string[]>(defaultExpanded);

  const toggle = (id: string): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

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
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.sm,
              paddingLeft: tokens.spacing.sm + depth * tokens.spacing.lg,
              borderRadius: tokens.radius.sm,
              backgroundColor: isSelected ? colors.primary : 'transparent',
            }}
          >
            <Text
              style={{
                width: tokens.spacing.md,
                color: isSelected ? colors.onPrimary : colors.muted,
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
                  color: isSelected ? colors.onPrimary : colors.onSurface,
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
