import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface Reaction {
  /** Stable key for the reaction type (e.g. `'like'`, `'love'`). */
  key: string;
  /** Emoji/glyph shown for the reaction. */
  emoji: string;
  /** Count for this reaction. */
  count?: number;
  /** Whether the viewer has selected this reaction. */
  reacted?: boolean;
  /** Accessible label (e.g. `'Love'`). Falls back to `key`. */
  label?: string;
}

export interface ReactionBarProps {
  /** The reaction tallies to render. */
  reactions: ReadonlyArray<Reaction>;
  /** Fires with the reaction key when a pill is tapped. */
  onReact?: (key: string) => void;
  /** Renders a trailing `+` add-reaction affordance. */
  onAddReaction?: () => void;
  /** Message shown when `reactions` is empty and there's no add affordance. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A wrap of emoji reaction pills, each with a count and a selected state.
 * Selected pills fill with the primary color; the rest read on-surface. An
 * optional `+` opens a fuller picker upstream. Handles the empty tally too.
 * Token-only.
 */
export function ReactionBar({
  reactions,
  onReact,
  onAddReaction,
  emptyLabel = 'No reactions yet',
  style,
}: ReactionBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (reactions.length === 0 && !onAddReaction) {
    return (
      <Text style={[{ color: colors.muted, fontSize: tokens.typography.scale.sm }, style as never]}>
        {emptyLabel}
      </Text>
    );
  }

  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, style]}>
      {reactions.map((r) => {
        const selected = !!r.reacted;
        return (
          <Pressable
            key={r.key}
            accessibilityRole="button"
            accessibilityLabel={`${r.label ?? r.key}${r.count != null ? `, ${r.count}` : ''}`}
            accessibilityState={{ selected }}
            disabled={!onReact}
            onPress={onReact ? () => onReact(r.key) : undefined}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              borderRadius: tokens.radius.full,
              borderWidth: 1,
              borderColor: selected ? colors.primary : colors.border,
              backgroundColor: selected ? colors.primary : colors.surface,
              paddingVertical: 2,
              paddingHorizontal: tokens.spacing.sm,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text style={{ fontSize: tokens.typography.scale.sm }}>{r.emoji}</Text>
            {r.count != null ? (
              <Text
                style={{
                  color: selected ? colors.onPrimary : colors.onSurface,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '600',
                }}
              >
                {r.count}
              </Text>
            ) : null}
          </Pressable>
        );
      })}
      {onAddReaction ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add reaction"
          onPress={onAddReaction}
          style={({ pressed }) => ({
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.sm,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            +
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
