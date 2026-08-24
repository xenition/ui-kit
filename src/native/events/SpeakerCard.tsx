import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { Rating } from '../primitives/Rating';
import { Badge } from '../primitives/Badge';

/** Layout of a {@link SpeakerCard}. */
export type SpeakerCardVariant = 'row' | 'stacked';

export interface SpeakerCardProps {
  /** Speaker name. */
  name: string;
  /** Role / title, e.g. `Principal Engineer`. */
  role?: string;
  /** Company / organisation. */
  company?: string;
  /** Avatar image URL (initials fallback when absent). */
  avatarUrl?: string;
  /** Short bio (clamped to 3 lines in `stacked`, 2 in `row`). */
  bio?: string;
  /** Optional 0–5 rating shown as stars. */
  rating?: number;
  /** Topic / track tags. */
  tags?: string[];
  /** `row` (horizontal, list-friendly) or `stacked` (centered profile). */
  variant?: SpeakerCardVariant;
  /** Press handler for the whole card. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Speaker profile card built on the `Avatar` and `Rating` primitives. `row`
 * lays the avatar beside the details for lists; `stacked` centers a larger
 * avatar for a profile header. Role and company collapse gracefully when
 * absent. Colors come from the compiled theme tokens; no literal colors.
 */
export function SpeakerCard({
  name,
  role,
  company,
  avatarUrl,
  bio,
  rating,
  tags = [],
  variant = 'row',
  onPress,
  style,
}: SpeakerCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const stacked = variant === 'stacked';
  const roleLine = [role, company].filter(Boolean).join(' · ');

  const content = (
    <View
      style={{
        flexDirection: stacked ? 'column' : 'row',
        alignItems: stacked ? 'center' : 'flex-start',
        gap: tokens.spacing.md,
        padding: tokens.spacing.lg,
      }}
    >
      <Avatar src={avatarUrl} name={name} size={stacked ? 'lg' : 'md'} />
      <View style={{ flex: stacked ? undefined : 1, alignItems: stacked ? 'center' : 'flex-start', gap: tokens.spacing.xs }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: stacked ? 'center' : 'left' }}>
          {name}
        </Text>
        {roleLine ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: stacked ? 'center' : 'left' }}>
            {roleLine}
          </Text>
        ) : null}
        {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
        {bio ? (
          <Text
            numberOfLines={stacked ? 3 : 2}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, textAlign: stacked ? 'center' : 'left' }}
          >
            {bio}
          </Text>
        ) : null}
        {tags.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, justifyContent: stacked ? 'center' : 'flex-start' }}>
            {tags.map((t, i) => (
              <Badge key={`${t}-${i}`} tone="neutral">
                {t}
              </Badge>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );

  const containerStyle: StyleProp<ViewStyle> = [
    {
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {content}
      </Pressable>
    );
  }
  return <View style={containerStyle}>{content}</View>;
}
