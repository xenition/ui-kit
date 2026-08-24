import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { ACTIVITY_META, toneColor, type ActivityKind } from './internal';

export interface TimelineItem {
  id: string;
  /** Activity kind — drives the node glyph + tone. */
  kind: ActivityKind;
  /** Headline for the event. */
  title: string;
  /** Optional detail line. */
  detail?: string;
  /** Who did it. */
  actor?: string;
  /** Pre-formatted timestamp. */
  timestamp?: string;
}

export interface ContactTimelineProps {
  /** Chronological events (caller controls ordering). */
  items: TimelineItem[];
  /** Fired when an event is tapped. */
  onItemPress?: (item: TimelineItem) => void;
  /** Show a skeleton instead of content. */
  loading?: boolean;
  /** Placeholder when there are no events. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Vertical activity timeline for a contact / deal: each event is a glyph node
 * (kind → glyph + tone, matching {@link ActivityLogRow}) on a connector rail,
 * with title, detail and an actor · timestamp meta line. The connector is
 * suppressed on the last node via guarded indexing. Renders a `loading`
 * skeleton and an `emptyLabel` placeholder. All colors are theme tokens; node
 * tints use `withAlpha` over a token.
 */
export function ContactTimeline({
  items,
  onItemPress,
  loading = false,
  emptyLabel = 'No activity yet',
  style,
}: ContactTimelineProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View accessibilityLabel="Loading timeline" style={[{ gap: tokens.spacing.md }, style]}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.border }} />
            <View style={{ flex: 1, gap: tokens.spacing.xs, paddingTop: tokens.spacing.xs }}>
              <View style={{ height: tokens.typography.scale.sm, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
              <View style={{ height: tokens.typography.scale.xs, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View accessibilityRole="text" accessibilityLabel={emptyLabel} style={[{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  return (
    <View style={style}>
      {items.map((item, index) => {
        const meta = ACTIVITY_META[item.kind];
        const accent = toneColor(colors, meta.tone);
        const isLast = index === items.length - 1;
        const metaLine = [item.actor, item.timestamp].filter(Boolean).join(' · ');
        return (
          <Pressable
            key={item.id}
            accessibilityRole={onItemPress ? 'button' : 'text'}
            accessibilityLabel={`${meta.label}: ${item.title}`}
            disabled={!onItemPress}
            onPress={onItemPress ? () => onItemPress(item) : undefined}
            style={{ flexDirection: 'row', gap: tokens.spacing.sm }}
          >
            <View style={{ alignItems: 'center', width: 28 }}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: withAlpha(accent, 0.14),
                  borderWidth: 1,
                  borderColor: accent,
                }}
              >
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>
                  {meta.glyph}
                </Text>
              </View>
              {isLast ? null : <View style={{ flex: 1, width: 2, backgroundColor: colors.border, marginVertical: 2 }} />}
            </View>

            <View style={{ flex: 1, gap: 1, paddingBottom: isLast ? 0 : tokens.spacing.md }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{item.title}</Text>
              {item.detail ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{item.detail}</Text>
              ) : null}
              {metaLine ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>{metaLine}</Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
