import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Avatar } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

export type OrgChartNodeVariant = 'default' | 'compact' | 'highlighted';

export interface OrgChartNodeProps {
  /** Person's name. */
  name: string;
  /** Job title / role. */
  title?: string;
  /** Avatar image URL (initials fallback otherwise). */
  avatarUrl?: string;
  /** Department / team label. */
  department?: string;
  /** Number of direct reports — shown as a count when > 0. */
  directReports?: number;
  /** Depth in the tree; indents the node by this many levels. */
  depth?: number;
  /** Whether this node has children that can be toggled. */
  expandable?: boolean;
  /** Current expand state (controlled). */
  expanded?: boolean;
  /** Marks the focused person (tints the surface). */
  variant?: OrgChartNodeVariant;
  /** Fires with the next expanded value when the disclosure is tapped. */
  onToggle?: (expanded: boolean) => void;
  /** Tap handler for the node body. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single node in a reporting hierarchy: avatar, name, title, and an optional
 * direct-report count. `depth` indents the node with a token-derived rail so a
 * flat list of nodes reads as a tree; `expandable` adds a disclosure toggle for
 * collapsing a manager's reports. `highlighted` tints the surface for the
 * focused person. Managers are flagged by a "N reports" count (a word, not
 * color). All colors are theme tokens — no literals.
 */
export function OrgChartNode({
  name,
  title,
  avatarUrl,
  department,
  directReports = 0,
  depth = 0,
  expandable = false,
  expanded = false,
  variant = 'default',
  onToggle,
  onPress,
  testID,
  style,
}: OrgChartNodeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const highlighted = variant === 'highlighted';
  const level = Math.max(0, Math.floor(depth));
  const indent = level * tokens.spacing.lg;
  const isManager = directReports > 0;

  const inner = (
    <Card
      variant={highlighted ? 'elevated' : 'outlined'}
      padding={compact ? 'sm' : 'md'}
      style={[
        highlighted ? { backgroundColor: withAlpha(colors.primary, 0.06), borderColor: colors.primary } : null,
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
      ]}
    >
      <Avatar size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        {title ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {title}
            {department ? ` · ${department}` : ''}
          </Text>
        ) : null}
      </View>
      {isManager ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {directReports} report{directReports === 1 ? '' : 's'}
        </Text>
      ) : null}
      {expandable ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${expanded ? 'Collapse' : 'Expand'} ${name}`}
          accessibilityState={{ expanded }}
          hitSlop={8}
          onPress={() => onToggle?.(!expanded)}
          style={({ pressed }) => ({
            width: 28,
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.sm,
            backgroundColor: withAlpha(colors.onSurface, pressed ? 0.1 : 0.05),
          })}
        >
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{expanded ? '▾' : '▸'}</Text>
        </Pressable>
      ) : null}
    </Card>
  );

  const node =
    onPress ? (
      <Pressable accessibilityRole="button" accessibilityLabel={`Org node ${name}`} onPress={onPress}>
        {inner}
      </Pressable>
    ) : (
      inner
    );

  return (
    <View testID={testID} style={[{ flexDirection: 'row', alignItems: 'stretch' }, style]}>
      {level > 0 ? (
        <View style={{ width: indent, alignItems: 'flex-end', justifyContent: 'center' }}>
          <View style={{ width: 1, height: '100%', backgroundColor: colors.border }} />
        </View>
      ) : null}
      <View style={{ flex: 1 }}>{node}</View>
    </View>
  );
}
