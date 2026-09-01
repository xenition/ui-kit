import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** The kinds of task activity a feed row can describe. */
export type ActivityAction = 'completed' | 'created' | 'commented' | 'assigned' | 'moved';

/** One activity entry in the {@link ActivityFeed}. */
export interface ActivityItem {
  /** Stable identity for the entry; used as the row `key`. */
  id: string;
  /** Who performed the action — drives the leading avatar. */
  actor: {
    /** Display name (also the avatar's initials fallback). */
    name: string;
    /** Optional avatar image URL. */
    avatarUrl?: string;
  };
  /** What happened; selects the kind glyph and its semantic tint. */
  action: ActivityAction;
  /** Optional object of the action (e.g. a task title), rendered bold. */
  target?: string;
  /** Optional pre-formatted relative time (e.g. `'2h ago'`), rendered muted. */
  time?: string;
}

export interface ActivityFeedProps {
  /** The activity entries, newest first. */
  items: readonly ActivityItem[];
  /** Section heading above the list. Defaults to `'Activity'`. Pass `null` to hide it. */
  title?: string | null;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Per-action presentation: a kind glyph, its semantic accent slot (drives the
 * badge disc + glyph), and the sentence verb. Each color traces to a
 * `SemanticColors` slot — no literals.
 */
const ACTION: Record<ActivityAction, { glyph: string; accent: keyof SemanticColors; text: keyof SemanticColors; verb: string }> = {
  completed: { glyph: '✓', accent: 'success', text: 'successText', verb: 'completed' },
  created: { glyph: '＋', accent: 'primary', text: 'primaryText', verb: 'created' },
  commented: { glyph: '💬', accent: 'accent', text: 'accentText', verb: 'commented on' },
  assigned: { glyph: '👤', accent: 'warn', text: 'warnText', verb: 'assigned' },
  moved: { glyph: '↔', accent: 'primary', text: 'primaryText', verb: 'moved' },
};

/** A single activity row: actor avatar + kind glyph badge + action text + time. */
function Row({ item }: { item: ActivityItem }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kind = ACTION[item.action] ?? ACTION.created;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
      }}
    >
      <View>
        <Avatar size="sm" name={item.actor.name} src={item.actor.avatarUrl} />
        <View
          style={{
            position: 'absolute',
            bottom: -4,
            right: -4,
            width: 20,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            borderWidth: 2,
            borderColor: colors.card,
            backgroundColor: withAlpha(colors[kind.accent], 0.14),
          }}
        >
          <Text style={{ color: colors[kind.text], fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {kind.glyph}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }}>
          <Text style={{ color: colors.onCard, fontWeight: '700' }}>{item.actor.name}</Text>
          <Text style={{ color: colors.mutedText }}>{` ${kind.verb}`}</Text>
          {item.target ? (
            <Text style={{ color: colors.onCard, fontWeight: '700' }}>{` ${item.target}`}</Text>
          ) : null}
        </Text>
        {item.time ? (
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{item.time}</Text>
        ) : null}
      </View>
    </View>
  );
}

/**
 * ActivityFeed — **V4** "flow" task activity feed (native twin of the web
 * component). A calm vertical list: each row an actor {@link Avatar} pinned with
 * a kind glyph badge (✓ / ＋ / 💬 / 👤 / ↔) tinted by its **semantic** token, the
 * action sentence with its **target in bold**, and a muted timestamp. Exposes a
 * `list` for screen readers. Presentational only. Token-only colors via
 * `useXenitionTheme()` — no literals.
 */
export function ActivityFeed({
  items,
  title = 'Activity',
  style,
}: ActivityFeedProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const rows = Array.isArray(items) ? items : [];

  return (
    <View
      style={[
        { gap: tokens.spacing.sm, padding: tokens.spacing.md, borderRadius: tokens.radius.lg, backgroundColor: colors.card },
        style,
      ]}
    >
      {title ? (
        <Text style={{ color: colors.onCard, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {title}
        </Text>
      ) : null}
      <View accessibilityRole="list">
        {rows.map((item, i) => (
          <View
            key={item.id}
            style={
              i > 0 ? { borderTopWidth: 1, borderTopColor: colors.border } : undefined
            }
          >
            <Row item={item} />
          </View>
        ))}
      </View>
    </View>
  );
}
