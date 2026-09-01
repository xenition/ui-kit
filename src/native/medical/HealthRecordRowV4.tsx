import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { HealthRecordRowProps, HealthRecordType } from './HealthRecordRow';

/** Drop-in for {@link HealthRecordRowProps} — same props, the V4 "clinic" design. */
export type HealthRecordRowV4Props = HealthRecordRowProps;

interface TypeMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const TYPE_META: Record<HealthRecordType, TypeMeta> = {
  lab: { glyph: '🧪', label: 'Lab', color: 'primary' },
  imaging: { glyph: '🩻', label: 'Imaging', color: 'accent' },
  note: { glyph: '📝', label: 'Note', color: 'muted' },
  immunization: { glyph: '💉', label: 'Immunization', color: 'success' },
  prescription: { glyph: '💊', label: 'Prescription', color: 'warn' },
  document: { glyph: '📄', label: 'Document', color: 'muted' },
};

/**
 * HealthRecordRow — **V4** "clinic" design. The calm, clinical take on a
 * patient-timeline row: an elevated rounded surface with a soft shadow, the type
 * glyph tucked in a soft-primary well, the record title, a provider · date meta
 * line, a labelled type chip (text label + token tone, never color alone), and an
 * optional unread dot. Tap to open, with a ≥44px tap target. Identical
 * props/behavior to {@link HealthRecordRowProps}. Token-only colors via
 * `useXenitionTheme()`. Informational UI only — not a medical device.
 */
export function HealthRecordRowV4({
  type,
  title,
  date,
  provider,
  unread = false,
  onPress,
  style,
}: HealthRecordRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = TYPE_META[type] ?? TYPE_META.document;
  const accent = colors[meta.color];
  const metaLine = [provider, date].filter(Boolean) as string[];
  const a11y = `${meta.label}: ${title}${metaLine.length ? `, ${metaLine.join(', ')}` : ''}${unread ? ', unread' : ''}`;

  const shellStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    minHeight: 56,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const content = (
    <View style={[shellStyle, style]}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.primary, 0.1),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
          {meta.glyph}
        </Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: unread ? '700' : '600' }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <View
            style={{
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: tokens.spacing.xs,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(colors.primary, 0.1),
            }}
          >
            <Text style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{meta.label}</Text>
          </View>
          {metaLine.length ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {metaLine.join('  ·  ')}
            </Text>
          ) : null}
        </View>
      </View>
      {unread ? (
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary }} />
      ) : (
        <Text allowFontScaling={false} style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
          ›
        </Text>
      )}
    </View>
  );

  if (!onPress) {
    return <View accessibilityLabel={a11y}>{content}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {content}
    </Pressable>
  );
}
