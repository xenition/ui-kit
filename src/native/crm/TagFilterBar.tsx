import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { CrmTone } from './internal';

export interface FilterTag {
  /** Stable key (returned by `onToggle`). */
  key: string;
  /** Visible label. */
  label: string;
  /** Optional count shown after the label. */
  count?: number;
}

export interface TagFilterBarProps {
  /** Available filter chips. */
  tags: FilterTag[];
  /** Keys currently selected (controlled). */
  selected: string[];
  /** Fired with the toggled key. */
  onToggle: (key: string) => void;
  /** When set, shows a "Clear" chip while any filter is active. */
  onClear?: () => void;
  /** Selected-chip tone (default `primary`). */
  tone?: CrmTone;
  /** Placeholder when there are no tags. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontally scrolling filter bar of toggleable chips (segments, tags,
 * sources). Selection state is conveyed by a filled tone **and** the chip's
 * `selected` a11y state (not color alone). Controlled via `selected` + a
 * per-key `onToggle`; an optional `onClear` chip appears while any filter is
 * active. Guards an empty `tags` array. Colors are theme tokens; the idle chip
 * fill uses `withAlpha` over a token.
 */
export function TagFilterBar({
  tags,
  selected,
  onToggle,
  onClear,
  tone = 'primary',
  emptyLabel = 'No filters',
  style,
}: TagFilterBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const toneColor = tone === 'neutral' ? colors.muted : colors[tone];
  const onTone = tone === 'primary' ? colors.onPrimary : tone === 'accent' ? colors.onAccent : colors.onSurface;
  const hasActive = selected.length > 0;

  if (tags.length === 0) {
    return (
      <View accessibilityRole="text" accessibilityLabel={emptyLabel} style={[{ paddingVertical: tokens.spacing.sm }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style}>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.xs, alignItems: 'center' }}>
        {tags.map((tag) => {
          const isOn = selected.includes(tag.key);
          return (
            <Pressable
              key={tag.key}
              accessibilityRole="button"
              accessibilityState={{ selected: isOn }}
              accessibilityLabel={`Filter ${tag.label}${isOn ? ', selected' : ''}`}
              onPress={() => onToggle(tag.key)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs / 2,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: isOn ? toneColor : colors.border,
                backgroundColor: isOn ? toneColor : withAlpha(colors.onSurface, 0.04),
              }}
            >
              {isOn ? (
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: onTone, fontWeight: '700' }}>
                  ✓
                </Text>
              ) : null}
              <Text style={{ color: isOn ? onTone : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: isOn ? '700' : '500' }}>
                {tag.label}
              </Text>
              {tag.count != null ? (
                <Text style={{ color: isOn ? onTone : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {tag.count}
                </Text>
              ) : null}
            </Pressable>
          );
        })}

        {onClear && hasActive ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear filters"
            onPress={onClear}
            style={{
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
              borderRadius: tokens.radius.full,
            }}
          >
            <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Clear</Text>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}
