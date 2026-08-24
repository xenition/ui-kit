import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type HealthRecordType = 'lab' | 'imaging' | 'note' | 'immunization' | 'prescription' | 'document';

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

export interface HealthRecordRowProps {
  /** Record type; drives the leading icon + type tag. */
  type: HealthRecordType;
  /** Record title, e.g. "CBC panel". */
  title: string;
  /** Date line, e.g. "24 Aug 2026". */
  date?: string;
  /** Ordering provider / facility. */
  provider?: string;
  /** Marks the record as unread/new. */
  unread?: boolean;
  /** Fires when the row is pressed to open the record. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A health-record list row for a patient timeline / documents screen: a
 * type-coded icon, the record title, a provider · date meta line, a type tag,
 * and an optional unread dot. Tap to open. The type is labelled in text as well
 * as color-coded. Informational UI only — not a medical device. Token-only
 * colors.
 */
export function HealthRecordRow({
  type,
  title,
  date,
  provider,
  unread = false,
  onPress,
  style,
}: HealthRecordRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = TYPE_META[type];
  const metaLine = [provider, date].filter(Boolean) as string[];
  const a11y = `${meta.label}: ${title}${metaLine.length ? `, ${metaLine.join(', ')}` : ''}${unread ? ', unread' : ''}`;

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          minHeight: 56,
        },
        style,
      ]}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
        {meta.glyph}
      </Text>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: unread ? '700' : '600' }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors[meta.color], fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{meta.label}</Text>
          {metaLine.length ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              · {metaLine.join('  ·  ')}
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
