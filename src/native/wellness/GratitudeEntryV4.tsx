import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Textarea } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { GratitudeEntry, type GratitudeEntryProps } from './GratitudeEntry';

export type GratitudeEntryV4Props = GratitudeEntryProps;

/**
 * GratitudeEntryV4 — the calm redesign of {@link GratitudeEntry}. Same props,
 * defaults, counter, remove control, empty note, and disabled-until-nonempty
 * submit. Only the visuals change: a clean surface card with recorded entries as
 * soft primary-tinted chips.
 */
export function GratitudeEntryV4({
  prompt = 'What are you grateful for?',
  value = '',
  placeholder = 'I’m grateful for…',
  entries = [],
  maxLength,
  onChangeText,
  onSubmit,
  onRemove,
  submitLabel = 'Add',
  emptyLabel = 'No entries yet — add your first.',
  style,
}: GratitudeEntryV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const trimmed = value.trim();
  const canSubmit = trimmed.length > 0;

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
          🙏
        </Text>
        <Text
          accessibilityRole="header"
          style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
        >
          {prompt}
        </Text>
      </View>

      {entries.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      ) : (
        <View accessibilityRole="list" style={{ gap: tokens.spacing.xs }}>
          {entries.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: withAlpha(colors.primary, 0.12),
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
              }}
            >
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: colors.primary }}>
                ✦
              </Text>
              <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                {item.text}
              </Text>
              {onRemove ? (
                <Text
                  accessibilityRole="button"
                  accessibilityLabel={`Remove: ${item.text}`}
                  onPress={() => onRemove(item.id)}
                  style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}
                >
                  ✕
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      )}

      <Textarea
        rows={3}
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        placeholder={placeholder}
        accessibilityLabel="Gratitude entry"
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {maxLength != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {value.length}/{maxLength}
          </Text>
        ) : (
          <View />
        )}
        {onSubmit ? (
          <Button variant="primary" disabled={!canSubmit} onPress={() => canSubmit && onSubmit(trimmed)}>
            {submitLabel}
          </Button>
        ) : null}
      </View>
    </View>
  );
}
