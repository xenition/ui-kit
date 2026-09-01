import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { ReactionBarProps } from './ReactionBar';

/** Drop-in for {@link ReactionBarProps} — same props, the V4 "feed" design. */
export type ReactionBarV4Props = ReactionBarProps;

/**
 * ReactionBar — **V4** "feed" design. A clean wrap of emoji reaction pills, each
 * with a count. The selected reaction highlights with a soft-primary tint pill
 * (primary border + `withAlpha(primary)` fill + `primaryText` count); the rest
 * read on a plain surface with a `muted` count. A trailing `+` opens a fuller
 * picker upstream, and the empty tally is handled too. Same props/behavior as
 * {@link ReactionBarProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`, `accessibilityState.selected` per pill.
 */
export function ReactionBarV4({
  reactions,
  onReact,
  onAddReaction,
  emptyLabel = 'No reactions yet',
  style,
}: ReactionBarV4Props): React.ReactElement {
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
              minHeight: 44,
              borderRadius: tokens.radius.full,
              borderWidth: 1,
              borderColor: selected ? colors.primary : colors.border,
              backgroundColor: selected
                ? withAlpha(colors.primary, pressed ? 0.2 : 0.1)
                : pressed
                  ? withAlpha(colors.primary, 0.1)
                  : colors.surface,
              paddingHorizontal: tokens.spacing.md,
            })}
          >
            <Text style={{ fontSize: tokens.typography.scale.base }}>{r.emoji}</Text>
            {r.count != null ? (
              <Text
                style={{
                  color: selected ? colors.primaryText : colors.muted,
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
            minHeight: 44,
            minWidth: 44,
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: pressed ? withAlpha(colors.primary, 0.1) : colors.surface,
            paddingHorizontal: tokens.spacing.md,
          })}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            +
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
