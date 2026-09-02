import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { pluralizeCount } from '../../hr/workforce-v4';
import { metaLine, spokenLine } from './internal/tone-v4';
import type { OrgChartNodeProps } from './OrgChartNode';

export interface OrgChartNodeV4Props extends OrgChartNodeProps {
  /** Build the direct-report count. Default `'3 reports'`. */
  formatReports?: (count: number) => string;
  /** Name for the disclosure when collapsed. Default `` `Expand ${name}` ``. */
  expandLabel?: string;
  /** Name for the disclosure when expanded. Default `` `Collapse ${name}` ``. */
  collapseLabel?: string;
}

/**
 * **V4 org chart node** — same props as {@link OrgChartNode} plus
 * `formatReports`, `expandLabel` and `collapseLabel`.
 *
 * ## Five changes
 *
 * 1. **The disclosure is reachable.** It was a `Pressable` inside the node's
 *    own `Pressable`, which is `accessible` by default and flattens its whole
 *    subtree into one leaf named "Org node Ada" — so the only control that
 *    opens a manager's reports was not a focus stop, and a VoiceOver user could
 *    not walk the tree at all. The node is a plain card now; the activation
 *    wraps only the avatar-and-text region and the disclosure is its sibling,
 *    keeping its own `expanded` state.
 * 2. **The disclosure is a target.** 28 × 28 with `hitSlop={8}` is not a 44pt
 *    target, and it is the smallest control in the module.
 * 3. **A press is a state layer.** The disclosure moved
 *    `withAlpha(colors.onSurface, 0.05)` to `0.1` on press — a translucent
 *    tint whose result depends on whatever is behind the card.
 * 4. **"3 reports" is a prop.** The base appended `'s'` to `report`, which is
 *    wrong in every language the kit is otherwise ready for, and the expand /
 *    collapse names were hard-coded English too.
 * 5. **The node announces what it shows** — name, title, department and the
 *    report count as one sentence — and the highlight uses the compiler's own
 *    `selected` slot rather than a hand-mixed 6% wash of `primary`.
 *
 * **Renders nothing without a `name`.**
 */
export function OrgChartNodeV4({
  name,
  title,
  avatarUrl,
  department,
  directReports = 0,
  depth = 0,
  expandable = false,
  expanded = false,
  variant = 'default',
  formatReports,
  expandLabel,
  collapseLabel,
  onToggle,
  onPress,
  testID,
  style,
}: OrgChartNodeV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const compact = variant === 'compact';
  const highlighted = variant === 'highlighted';
  const level = Math.max(0, Math.floor(Number.isFinite(depth) ? depth : 0));
  const indent = level * tokens.spacing.lg;
  const reports = Number.isFinite(directReports) && directReports > 0 ? directReports : 0;
  const reportsLabel =
    reports > 0 ? (formatReports ?? ((n: number) => pluralizeCount(n, 'report')))(reports) : null;
  const tap = minTap(tokens.spacing);

  const ground = highlighted ? colors.selected : colors.card;
  const ink = highlighted ? colors.onSelected : colors.onCard;
  const subtitle = metaLine([title, department]);
  const spoken = spokenLine([name, title, department, reportsLabel]);

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        minHeight: tap,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, ground, ink) : 'transparent',
      }}
    >
      <AvatarV4 size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <TextV4 size="base" weight="bold" numberOfLines={1} style={{ color: ink }}>
          {name}
        </TextV4>
        {subtitle ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {subtitle}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <View testID={testID} style={[{ flexDirection: 'row', alignItems: 'stretch' }, style]}>
      {/* The rail is decoration: it draws the tree, it does not describe it. */}
      {level > 0 ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ width: indent, alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <View style={{ width: 1, height: '100%', backgroundColor: colors.border }} />
        </View>
      ) : null}

      <CardV4
        variant={highlighted ? 'elevated' : 'outlined'}
        padding={compact ? 'sm' : 'md'}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: ground,
          borderColor: highlighted ? colors.primary : colors.border,
        }}
      >
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={spoken}
            onPress={onPress}
            style={{ flex: 1, borderRadius: tokens.radius.md }}
          >
            {({ pressed }) => identity(pressed)}
          </Pressable>
        ) : (
          <View accessible accessibilityLabel={spoken} style={{ flex: 1 }}>
            {identity(false)}
          </View>
        )}

        {reportsLabel ? (
          <TextV4
            size="xs"
            weight="semibold"
            tone="mutedText"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            {reportsLabel}
          </TextV4>
        ) : null}

        {/* A sibling of the node's activation, never a descendant — change 1. */}
        {expandable ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              expanded ? (collapseLabel ?? `Collapse ${name}`) : (expandLabel ?? `Expand ${name}`)
            }
            accessibilityState={{ expanded }}
            onPress={() => onToggle?.(!expanded)}
            style={({ pressed }) => ({
              width: tap,
              height: tap,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              backgroundColor: pressed ? pressOver(theme, ground, ink) : 'transparent',
            })}
          >
            <TextV4 size="sm" style={{ color: ink }}>
              {expanded ? '▾' : '▸'}
            </TextV4>
          </Pressable>
        ) : null}
      </CardV4>
    </View>
  );
}
