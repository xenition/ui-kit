import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { ACTIVITY_META, toneColor, type ActivityKind } from './internal';

export interface ActivityLogRowProps {
  /** Activity type — drives the leading glyph badge (call/email/…). */
  kind: ActivityKind;
  /** One-line summary of what happened. */
  title: string;
  /** Optional detail / note snippet. */
  detail?: string;
  /** Who performed it. */
  actor?: string;
  /** Pre-formatted timestamp (e.g. "2h ago", "Mar 4"). */
  timestamp?: string;
  /** Marks the activity as pending/incomplete (dims the row). */
  pending?: boolean;
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One entry in an activity feed. A tinted round badge carries the activity
 * **kind** as a glyph (📞 call, ✉ email, 👥 meeting, 📝 note, ✔ task, 💰 deal)
 * paired with a `kind`-derived tone — meaning is never color-only because the
 * glyph and the accessible label both name the kind. Optional actor + timestamp
 * meta line. The badge tint uses `withAlpha` over a theme token (no literal).
 */
export function ActivityLogRow({
  kind,
  title,
  detail,
  actor,
  timestamp,
  pending = false,
  onPress,
  testID,
  style,
}: ActivityLogRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = ACTIVITY_META[kind];
  const accent = toneColor(colors, meta.tone);
  const metaLine = [actor, timestamp].filter(Boolean).join(' · ');

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={`${meta.label}: ${title}`}
      disabled={!onPress}
      onPress={onPress}
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          alignItems: 'flex-start',
          opacity: pending ? 0.6 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(accent, 0.14),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: accent }}>
          {meta.glyph}
        </Text>
      </View>

      <View style={{ flex: 1, gap: 1 }}>
        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {title}
        </Text>
        {detail ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {detail}
          </Text>
        ) : null}
        {metaLine ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>{metaLine}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}
