import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Textarea } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

export interface GratitudeItem {
  /** Stable id. */
  id: string;
  /** The gratitude text. */
  text: string;
}

export interface GratitudeEntryProps {
  /** Heading prompt. Default "What are you grateful for?". */
  prompt?: string;
  /** Controlled draft text. */
  value?: string;
  /** Placeholder for the input. */
  placeholder?: string;
  /** Already-recorded entries (rendered as a chip list above the input). */
  entries?: GratitudeItem[];
  /** Max characters allowed; shows a live counter when set. */
  maxLength?: number;
  /** Fires as the draft changes. */
  onChangeText?: (text: string) => void;
  /** Fires with the trimmed draft when submitted. */
  onSubmit?: (text: string) => void;
  /** Fires when an existing entry's remove control is tapped. */
  onRemove?: (id: string) => void;
  /** Submit button label. Default "Add". */
  submitLabel?: string;
  /** Empty-list note. Default "No entries yet — add your first.". */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A gratitude journal entry block: a prompt, any existing entries as removable
 * chips (or an empty note), a multi-line input with an optional character
 * counter, and a submit action disabled until the draft is non-empty. `onSubmit`
 * receives the trimmed text. Token-only colors (semantic slots + a `withAlpha`
 * tint).
 */
export function GratitudeEntry({
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
}: GratitudeEntryProps): React.ReactElement {
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
                backgroundColor: withAlpha(colors.primary, 0.1),
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
