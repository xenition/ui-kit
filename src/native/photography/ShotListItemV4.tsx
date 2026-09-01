import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import type { ShotListItemProps, ShotPriority } from './ShotListItem';

/** Drop-in for {@link ShotListItemProps} — same props, the V4 "studio" design. */
export type ShotListItemV4Props = ShotListItemProps;

const PRIORITY: Record<
  ShotPriority,
  { label: string; glyph: string; tone: BadgeTone; color: 'danger' | 'primary' | 'muted' }
> = {
  must: { label: 'Must-have', glyph: '★', tone: 'danger', color: 'danger' },
  nice: { label: 'Nice-to-have', glyph: '☆', tone: 'primary', color: 'primary' },
  optional: { label: 'Optional', glyph: '○', tone: 'neutral', color: 'muted' },
};

/**
 * ShotListItem — **V4** "studio" design. A checklist row on a clean, elevated
 * studio surface: an elevated card row (soft shadow, hairline border), a check
 * affordance, the shot title (struck when `done`), a muted notes line, and the
 * `priority` shown three ways — a leading glyph, a token color, and a labelled
 * `Badge` — so it never rides on color alone: `must` (★, danger), `nice`
 * (☆, primary), `optional` (○, muted). The whole row is a `checkbox` when
 * `onToggle` is provided; its captured state is announced via the accessibility
 * `checked` state and a ✓ glyph. Identical props/behavior to
 * {@link ShotListItemProps}. Token-only colors via `useXenitionTheme()`.
 */
export function ShotListItemV4({
  title,
  notes,
  done = false,
  priority,
  onToggle,
  style,
}: ShotListItemV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = priority ? PRIORITY[priority] : null;
  const priorityColor = meta
    ? meta.color === 'danger'
      ? colors.onSurface
      : meta.color === 'primary'
        ? colors.primary
        : colors.muted
    : colors.muted;

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      minHeight: 44,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  const checkbox = (
    <View
      style={{
        width: 24,
        height: 24,
        borderRadius: tokens.radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: done ? 0 : 1,
        borderColor: colors.border,
        backgroundColor: done ? colors.success : 'transparent',
      }}
    >
      {done ? <Icon glyph="✓" size="sm" color="onSuccess" /> : null}
    </View>
  );

  const inner = (
    <>
      {checkbox}
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={2}
          style={{
            color: done ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
            textDecorationLine: done ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>
        {notes ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {notes}
          </Text>
        ) : null}
      </View>
      {meta ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ color: priorityColor, fontSize: tokens.typography.scale.sm }}>
            {meta.glyph}
          </Text>
          <Badge tone={meta.tone} variant="soft" size="sm">
            {meta.label}
          </Badge>
        </View>
      ) : null}
    </>
  );

  if (onToggle) {
    return (
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: done }}
        accessibilityLabel={title}
        onPress={onToggle}
        style={({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={rowStyle}>{inner}</View>;
}
