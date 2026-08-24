import * as React from 'react';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { usePressScale } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { StoryBarProps, Story } from './StoryBar';
import type { StoryState } from './StoryRing';

/** Drop-in for {@link StoryBar} — identical props, a different design. */
export type StoryBarV2Props = StoryBarProps;

const RING = 84;

/**
 * StoryBar, design V2 — **large gradient-ring circles**. Each tile is an
 * oversized avatar inside a four-corner multi-tone ring (a token-pure faux
 * gradient), with `live` in danger and `add` a dashed ring. Same props as
 * {@link StoryBar}, token-only; scrolls without a visible scrollbar.
 */
export function StoryBarV2({
  stories,
  onPressStory,
  showAdd = true,
  onPressAdd,
  addLabel = 'Your story',
  style,
}: StoryBarV2Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: tokens.spacing.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}
      style={style}
    >
      {showAdd ? <Ring state="add" label={addLabel} onPress={onPressAdd} /> : null}
      {stories.map((s) => (
        <Ring
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

function Ring({
  src,
  name,
  state,
  label,
  onPress,
}: {
  src?: string;
  name?: string;
  state: StoryState;
  label?: string;
  onPress?: () => void;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const caption = label ?? (state === 'add' ? 'Your story' : name);

  // A four-corner multi-tone border reads as a gradient sweep — every stop is
  // derived from a theme token via withAlpha, so no literal color appears.
  const gradientRing =
    state === 'live'
      ? { borderTopColor: colors.danger, borderRightColor: withAlpha(colors.danger, 0.7), borderBottomColor: withAlpha(colors.danger, 0.5), borderLeftColor: colors.danger }
      : state === 'seen'
        ? { borderTopColor: colors.border, borderRightColor: colors.border, borderBottomColor: colors.border, borderLeftColor: colors.border }
        : {
            borderTopColor: colors.primary,
            borderRightColor: withAlpha(colors.accent, 0.9),
            borderBottomColor: withAlpha(colors.accent, 0.6),
            borderLeftColor: withAlpha(colors.primary, 0.7),
          };

  const ring = (
    <View
      style={{
        width: RING,
        height: RING,
        borderRadius: RING / 2,
        borderWidth: 3,
        borderStyle: state === 'add' ? 'dashed' : 'solid',
        ...(state === 'add'
          ? { borderColor: colors.border }
          : gradientRing),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
      }}
    >
      {state === 'add' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>+</Text>
      ) : (
        <Avatar src={src} name={name} size="lg" />
      )}
      {state === 'live' ? (
        <View style={{ position: 'absolute', bottom: -tokens.spacing.xs, backgroundColor: colors.danger, borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 1 }}>
          <Text style={{ color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>LIVE</Text>
        </View>
      ) : null}
    </View>
  );

  const body = (
    <View style={{ alignItems: 'center', gap: tokens.spacing.xs, width: RING + tokens.spacing.md }}>
      {ring}
      {caption ? (
        <Text numberOfLines={1} style={{ color: state === 'seen' ? colors.muted : colors.onSurface, fontSize: tokens.typography.scale.xs, textAlign: 'center', maxWidth: RING + tokens.spacing.md }}>
          {caption}
        </Text>
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
