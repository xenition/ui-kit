import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { Interview, InterviewMode } from './types';
import { formatShortDate, formatTime } from './format';

/** Mode → [glyph, label] — a non-color signal for the interview channel. */
const MODE: Record<InterviewMode, [string, string]> = {
  onsite: ['📍', 'On-site'],
  video: ['🎥', 'Video'],
  phone: ['📞', 'Phone'],
};

export interface InterviewSlotProps {
  /** The interview (or proposed slot) to render. */
  interview: Interview;
  /** Marks this slot as the chosen one. */
  selected?: boolean;
  /** Disables selection (e.g. slot no longer available). */
  disabled?: boolean;
  /** Fired when a bookable slot is pressed. */
  onSelect?: (interview: Interview) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A selectable interview slot chip/card: date + time range, a mode marker
 * (on-site / video / phone — glyph + label, not color alone), and the
 * interviewer. Selected state is announced via `accessibilityState.selected` and
 * a token outline; disabled slots never fire `onSelect`. Tokens only.
 */
export function InterviewSlot({
  interview,
  selected = false,
  disabled = false,
  onSelect,
  style,
}: InterviewSlotProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [glyph, modeLabel] = MODE[interview.mode] ?? MODE.video;

  const start = formatTime(interview.startsAt);
  const end = interview.endsAt ? formatTime(interview.endsAt) : '';
  const timeRange = end ? `${start} – ${end}` : start;
  const dateLabel = formatShortDate(interview.startsAt);
  const a11y = `${dateLabel} ${timeRange}, ${modeLabel}${
    interview.interviewer ? `, with ${interview.interviewer}` : ''
  }`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      accessibilityState={{ selected, disabled }}
      disabled={disabled || !onSelect}
      onPress={onSelect ? () => onSelect(interview) : undefined}
      style={({ pressed }) => [
        {
          gap: tokens.spacing.xs,
          backgroundColor: selected ? colors.primary : colors.surface,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: selected ? 2 : 1,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
          opacity: disabled ? 0.5 : pressed && onSelect ? 0.9 : 1,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
          {glyph}
        </Text>
        <Text
          style={{
            color: selected ? colors.onPrimary : colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '600',
          }}
        >
          {dateLabel}
          {'  ·  '}
          {modeLabel}
        </Text>
      </View>
      <Text
        style={{
          color: selected ? colors.onPrimary : colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: '600',
        }}
      >
        {timeRange}
      </Text>
      {interview.interviewer ? (
        <Text
          numberOfLines={1}
          style={{
            color: selected ? colors.onPrimary : colors.muted,
            fontSize: tokens.typography.scale.xs,
          }}
        >
          {interview.interviewer}
        </Text>
      ) : null}
    </Pressable>
  );
}
