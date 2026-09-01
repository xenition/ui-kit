import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, type AvatarSize } from '../primitives/Avatar';
import { usePressScale } from '../primitives/internal/motion';
import { feedStory } from './internal/feed';
import { GradientSurface } from './internal/GradientSurface';
import type { StoryRingProps } from './StoryRing';

/** Drop-in for {@link StoryRingProps} — same props, the V4 "feed" design. */
export type StoryRingV4Props = StoryRingProps;

const DIAMETER: Record<AvatarSize, number> = { xs: 32, sm: 44, md: 56, lg: 76, xl: 96 };

/**
 * StoryRing — **V4** "feed" design. The one place in the feed line that carries
 * a gradient: an unseen story wears an accent→primary gradient ring
 * ({@link feedStory} through a {@link GradientSurface}), a seen one falls back
 * to a muted ring, `live` keeps the danger ring + LIVE tag, and `add` renders a
 * dashed ring with a primary `⊕`. Keeps `size`, `state`, `label` and the
 * caption behavior. Same props/behavior as {@link StoryRingProps}; token-only
 * colors via `useXenitionTheme()` / feed helpers (no literals).
 */
export function StoryRingV4({
  src,
  name,
  state = 'unseen',
  size = 'md',
  label,
  onPress,
  style,
}: StoryRingV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const outer = DIAMETER[size];
  // A 3px ring stroke sits between the gradient/tone backing and the avatar.
  const ringWidth = 3;
  const backing = outer + ringWidth * 2 + tokens.spacing.xs;
  const caption = label ?? (state === 'add' ? 'Your story' : name);

  const avatarNode =
    state === 'add' ? (
      <View
        style={{
          width: outer,
          height: outer,
          borderRadius: outer / 2,
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.surface,
        }}
      >
        <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>⊕</Text>
      </View>
    ) : (
      <Avatar src={src} name={name} size={size} />
    );

  // The avatar padded on the surface so the ring reads as a clean stroke.
  const avatarPad = (
    <View style={{ padding: ringWidth, borderRadius: backing / 2, backgroundColor: colors.surface }}>{avatarNode}</View>
  );

  let ring: React.ReactElement;
  if (state === 'add') {
    ring = <View style={{ alignItems: 'center', justifyContent: 'center' }}>{avatarPad}</View>;
  } else if (state === 'unseen') {
    ring = (
      <GradientSurface
        colors={feedStory(tokens.ramps)}
        style={{ width: backing, height: backing, borderRadius: backing / 2, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        {avatarPad}
      </GradientSurface>
    );
  } else {
    ring = (
      <View
        style={{
          width: backing,
          height: backing,
          borderRadius: backing / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: state === 'live' ? colors.danger : colors.border,
        }}
      >
        {avatarPad}
      </View>
    );
  }

  const ringWrap = (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {ring}
      {state === 'live' ? (
        <View
          style={{
            position: 'absolute',
            bottom: -tokens.spacing.xs,
            backgroundColor: colors.danger,
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.xs,
            paddingVertical: 1,
          }}
        >
          <Text style={{ color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>LIVE</Text>
        </View>
      ) : null}
    </View>
  );

  const body = (
    <View style={[{ alignItems: 'center', gap: tokens.spacing.xs, width: backing + tokens.spacing.md }, style]}>
      {ringWrap}
      {caption ? (
        <Text
          numberOfLines={1}
          style={{
            color: state === 'seen' ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.xs,
            fontWeight: state === 'seen' ? '400' : '500',
            textAlign: 'center',
            maxWidth: backing + tokens.spacing.md,
          }}
        >
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
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
