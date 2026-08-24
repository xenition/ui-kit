import * as React from 'react';
import { Animated, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { StoryBarProps } from './StoryBar';
import type { StoryState } from './StoryRing';

/** Drop-in for {@link StoryBar} — identical props, a different design. */
export type StoryBarV3Props = StoryBarProps;

const TILE_W = 68;
const TILE_H = 92;

function initials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}

/**
 * StoryBar, design V3 — **compact rounded square tiles**. Each story is a small
 * cover tile (image or tinted initials) with a scrim-backed name at the bottom;
 * ring state maps to the tile border (`unseen` primary, `seen` hairline, `live`
 * a badge, `add` a dashed `+`). Same props as {@link StoryBar}, token-only.
 */
export function StoryBarV3({
  stories,
  onPressStory,
  showAdd = true,
  onPressAdd,
  addLabel = 'Your story',
  style,
}: StoryBarV3Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}
      style={style}
    >
      {showAdd ? <Tile state="add" name={addLabel} onPress={onPressAdd} /> : null}
      {stories.map((s) => (
        <Tile
          key={s.id}
          src={s.src}
          name={s.name}
          state={s.state ?? 'unseen'}
          onPress={onPressStory ? () => onPressStory(s.id) : undefined}
        />
      ))}
    </ScrollView>
  );
}

function Tile({
  src,
  name,
  state,
  onPress,
}: {
  src?: string;
  name?: string;
  state: StoryState;
  onPress?: () => void;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const border =
    state === 'add'
      ? { borderWidth: 2, borderStyle: 'dashed' as const, borderColor: colors.border }
      : state === 'seen'
        ? { borderWidth: 1, borderColor: colors.border }
        : state === 'live'
          ? { borderWidth: 2, borderColor: colors.danger }
          : { borderWidth: 2, borderColor: colors.primary };

  const tile = (
    <View
      style={{
        width: TILE_W,
        height: TILE_H,
        borderRadius: tokens.radius.lg,
        overflow: 'hidden',
        backgroundColor: withAlpha(colors.primary, 0.1),
        alignItems: 'center',
        justifyContent: 'center',
        ...border,
      }}
    >
      {state === 'add' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>+</Text>
      ) : src ? (
        <Image source={{ uri: src }} accessibilityLabel={name ?? 'Story'} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      ) : (
        <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{initials(name)}</Text>
      )}

      {state === 'live' ? (
        <View style={{ position: 'absolute', top: tokens.spacing.xs, alignSelf: 'center', backgroundColor: colors.danger, borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1 }}>
          <Text style={{ color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>LIVE</Text>
        </View>
      ) : null}

      {name ? (
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: withAlpha(colors.onSurface, 0.55), paddingHorizontal: tokens.spacing.xs, paddingVertical: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600', textAlign: 'center' }}>
            {name}
          </Text>
        </View>
      ) : null}
    </View>
  );

  if (!onPress) return tile;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {tile}
      </Pressable>
    </Animated.View>
  );
}
