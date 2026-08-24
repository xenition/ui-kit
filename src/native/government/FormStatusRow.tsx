import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge } from '../primitives';
import { withAlpha } from './internal/format';
import { formStatus, type FormStatusValue } from './internal/status';

export type { FormStatusValue };

export interface FormStatusRowProps {
  /** Form / application reference (e.g. "APP-77412"). */
  formNumber: string;
  /** Short title of the form (e.g. "Homestead exemption"). */
  title: string;
  /** Submission lifecycle status — conveyed by text + glyph + color. */
  status: FormStatusValue;
  /** Agency / department that owns the form. */
  agency?: string;
  /** Localized date (submitted / last updated, already formatted). */
  date?: string;
  /** Fires on row press (e.g. open form detail / continue). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in a list of submitted civic forms / applications: a tinted status
 * glyph disc, a title/number stack, and a status pill. Status is conveyed
 * redundantly (glyph + label + a color that traces to a `SemanticColors` slot:
 * complete → success, rejected/action-needed → danger) — never color alone.
 * Becomes a button only when `onPress` is supplied.
 */
export function FormStatusRow({
  formNumber,
  title,
  status,
  agency,
  date,
  onPress,
  style,
}: FormStatusRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = formStatus(status);
  const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];

  const row = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(tint, 0.14),
        }}
      >
        <Icon glyph={sd.glyph} accessibilityLabel={sd.label} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{formNumber}</Text>
          {agency != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {agency}</Text>
          ) : null}
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Badge tone={sd.tone} variant="soft" size="sm">
          {`${sd.glyph} ${sd.label}`}
        </Badge>
        {date != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{date}</Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Form ${formNumber}, ${title}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
