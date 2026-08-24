import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, type BadgeTone } from '../primitives';
import { withAlpha } from './internal/format';

/** Category of a public notice / announcement. */
export type NoticeCategory =
  | 'hearing'
  | 'meeting'
  | 'roadwork'
  | 'election'
  | 'ordinance'
  | 'bid'
  | 'general';

const CATEGORY: Record<NoticeCategory, { label: string; glyph: string; tone: BadgeTone }> = {
  hearing: { label: 'Public hearing', glyph: '⚖️', tone: 'primary' },
  meeting: { label: 'Meeting', glyph: '📋', tone: 'accent' },
  roadwork: { label: 'Roadwork', glyph: '🚧', tone: 'warn' },
  election: { label: 'Election', glyph: '🗳️', tone: 'primary' },
  ordinance: { label: 'Ordinance', glyph: '📜', tone: 'neutral' },
  bid: { label: 'Bid / RFP', glyph: '📑', tone: 'accent' },
  general: { label: 'Notice', glyph: '📢', tone: 'neutral' },
};

export interface PublicNoticeCardProps {
  /** Notice category — drives the leading glyph + a category badge. */
  category: NoticeCategory;
  /** Notice headline. */
  title: string;
  /** Body / summary text (truncated by the caller as needed). */
  body?: string;
  /** Issuing agency / department. */
  agency?: string;
  /** Localized posted / effective date. */
  date?: string;
  /** Location the notice concerns (address, venue, ward). */
  location?: string;
  /** Marks the notice as new / unread (a text+glyph pill, not color alone). */
  isNew?: boolean;
  /** Fires on card press (open full notice); card is a button only when set. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A public-notice / civic-announcement card for a notices feed. The `category`
 * selects a tinted leading glyph and a labelled badge (text + glyph + color,
 * never color alone), with optional agency / date / location metadata and a
 * "New" flag. Becomes a button only when `onPress` is supplied. Every color
 * traces to a `SemanticColors` slot or a token-derived tint — no literals.
 */
export function PublicNoticeCard({
  category,
  title,
  body,
  agency,
  date,
  location,
  isNew = false,
  onPress,
  style,
}: PublicNoticeCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cat = CATEGORY[category] ?? CATEGORY.general;

  const content = (
    <Card variant={onPress ? 'interactive' : 'outlined'} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(cat.tone === 'neutral' ? colors.muted : colors[cat.tone], 0.14),
          }}
        >
          <Icon glyph={cat.glyph} accessibilityLabel={cat.label} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          <Badge tone={cat.tone} variant="soft" size="sm">
            {cat.label}
          </Badge>
          {isNew ? (
            <Badge tone="danger" variant="solid" size="sm">
              ● New
            </Badge>
          ) : null}
        </View>
      </View>

      <Text
        style={{
          marginTop: tokens.spacing.sm,
          color: colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: '700',
        }}
      >
        {title}
      </Text>

      {body != null ? (
        <Text
          numberOfLines={3}
          style={{ marginTop: 2, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}
        >
          {body}
        </Text>
      ) : null}

      {agency != null || date != null || location != null ? (
        <Text style={{ marginTop: tokens.spacing.sm, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[agency, location, date].filter((v) => v != null && v !== '').join(' · ')}
        </Text>
      ) : null}
    </Card>
  );

  if (!onPress) return content;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${cat.label}: ${title}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {content}
    </Pressable>
  );
}
