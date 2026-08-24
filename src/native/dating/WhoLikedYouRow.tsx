import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Avatar } from '../primitives';

export interface Liker {
  id: string;
  name?: string;
  photoUri?: string;
  /** Super-liked you (highlighted). */
  superLiked?: boolean;
}

export interface WhoLikedYouRowProps {
  /** People who liked the user. */
  likers?: Liker[];
  /** Total count (may exceed the loaded `likers`). Defaults to `likers.length`. */
  total?: number;
  /** Obscure faces behind an "unlock" scrim (premium gate). Defaults to true. */
  locked?: boolean;
  /** Section heading. */
  title?: string;
  /** Fires when a specific liker is tapped (only when unlocked). */
  onPressLiker?: (id: string) => void;
  /** Fires when the locked row / "see all" is tapped (upsell). */
  onUnlock?: () => void;
  /** Loading skeleton. */
  loading?: boolean;
  /** Copy when nobody has liked yet. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontal "who liked you" strip — the native likes row. Shows a scrollable
 * rail of liker avatars with a total count pill; when `locked` (a premium gate)
 * the faces sit behind a token scrim and the whole rail becomes an unlock CTA
 * instead of exposing identities. Handles loading and empty states. Colors are
 * token-derived via `withAlpha` — no literal colors. Lock state is announced in
 * the a11y label, never by color alone.
 */
export function WhoLikedYouRow({
  likers,
  total,
  locked = true,
  title = 'Liked you',
  onPressLiker,
  onUnlock,
  loading = false,
  emptyLabel = 'No likes yet — keep swiping!',
  style,
}: WhoLikedYouRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = likers ?? [];
  const count = total ?? list.length;

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginBottom: tokens.spacing.sm }}>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {title}
      </Text>
      {count > 0 ? (
        <View
          style={{
            backgroundColor: withAlpha(colors.danger, 0.14),
            borderRadius: tokens.radius.full,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.sm,
          }}
        >
          <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {count}
          </Text>
        </View>
      ) : null}
    </View>
  );

  if (loading) {
    return (
      <View style={style}>
        {header}
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.border }} />
          ))}
        </View>
      </View>
    );
  }

  if (count === 0) {
    return (
      <View style={style}>
        {header}
        <View
          accessibilityRole="text"
          accessibilityLabel={emptyLabel}
          style={{
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            padding: tokens.spacing.lg,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        </View>
      </View>
    );
  }

  const tile = (liker: Liker, i: number): React.ReactElement => {
    const label = locked
      ? `Locked like ${i + 1}`
      : `${liker.name ?? 'Someone'}${liker.superLiked ? ', super liked you' : ''}`;
    return (
      <Pressable
        key={liker.id}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: locked && !onUnlock }}
        onPress={() => (locked ? onUnlock?.() : onPressLiker?.(liker.id))}
        style={{ alignItems: 'center', width: 72, gap: tokens.spacing.xs }}
      >
        <View>
          <Avatar
            src={locked ? undefined : liker.photoUri}
            name={locked ? '?' : liker.name}
            size="xl"
            ring={liker.superLiked}
          />
          {locked ? (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 36,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: withAlpha(colors.onSurface, 0.45),
              }}
            >
              <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.lg }}>🔒</Text>
            </View>
          ) : null}
        </View>
        {!locked ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, maxWidth: 68 }}>
            {liker.name ?? 'Someone'}
          </Text>
        ) : null}
      </Pressable>
    );
  };

  return (
    <View style={style}>
      {header}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.sm, paddingRight: tokens.spacing.md }}
      >
        {list.map(tile)}
      </ScrollView>
      {locked ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Unlock to see who liked you, ${count} total`}
          onPress={onUnlock}
          style={({ pressed }) => ({
            marginTop: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.12),
            paddingVertical: tokens.spacing.sm,
            alignItems: 'center',
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            See all {count} likes
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
