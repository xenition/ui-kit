import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, EmptyState, Icon } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import type { HarvestLogProps } from './HarvestLog';

/** Drop-in alternate of {@link HarvestLogProps} — identical prop contract. */
export type HarvestLogV2Props = HarvestLogProps;

/**
 * HarvestLog — design variant **V2**: an elevated card fronted by a **big total
 * hero** (large figure + "total harvested" label on a tinted panel), then a
 * record list where each row leads with a tinted quantity chip. Where V1 tucks
 * the total in the header corner, V2 makes it the headline. Same props as
 * {@link HarvestLogProps}; only the layout differs. Token-only.
 */
export function HarvestLogV2({
  entries,
  title = 'Harvest log',
  total,
  maxRows,
  emptyTitle = 'No harvests logged',
  emptyDescription = 'Recorded harvests will appear here.',
  style,
}: HarvestLogV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });
  const list = Array.isArray(entries) ? entries : [];
  const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
  const remaining = list.length - visible.length;

  const container: StyleProp<ViewStyle> = [
    {
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 0,
      backgroundColor: colors.surface,
      ...shadow('md', tokens),
    },
    style,
  ];

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, container]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph="🧺" color="accent" size="base" />
        <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
      </View>

      {total != null ? (
        <View
          style={{
            marginTop: tokens.spacing.sm,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.success, 0.1),
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Total harvested</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', fontFamily: tokens.typography.fontHeading }}>
            {total}
          </Text>
        </View>
      ) : null}

      {list.length === 0 ? (
        <View style={{ marginTop: tokens.spacing.md }}>
          <EmptyState icon={<Icon glyph="🌾" size="2xl" color="muted" />} title={emptyTitle} description={emptyDescription} />
        </View>
      ) : (
        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.sm }}>
          {visible.map((entry, i) => (
            <View
              key={entry.id ?? `harvest-${i}`}
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
            >
              <View
                style={{
                  minWidth: 52,
                  paddingVertical: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.sm,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: withAlpha(colors.primary, 0.1),
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800', fontFamily: tokens.typography.fontHeading }}>
                  {String(entry.quantity)}
                </Text>
                {entry.unit != null ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{entry.unit}</Text>
                ) : null}
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                  {entry.crop}
                </Text>
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {[entry.field, entry.date].filter((s) => s != null && s !== '').join(' · ')}
                </Text>
              </View>
              {entry.grade != null ? (
                <Badge tone="neutral" variant="outline" size="sm">
                  {entry.grade}
                </Badge>
              ) : null}
            </View>
          ))}
          {remaining > 0 ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>+{remaining} more</Text>
          ) : null}
        </View>
      )}
    </Animated.View>
  );
}
