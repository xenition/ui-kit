import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StoryRing } from './StoryRing';
import { feedStory } from './internal/feed';
import { GradientSurface } from './internal/GradientSurface';
import type { StoryBarProps } from './StoryBar';

/** Drop-in for {@link StoryBarProps} — same props, the V4 "feed" design. */
export type StoryBarV4Props = StoryBarProps;

/**
 * StoryBar — **V4** "feed" design. A clean, airy horizontally-scrolling rail of
 * {@link StoryRing}s, optionally led by the viewer's "add story" tile. In the
 * feed line an unseen story wears the accent→primary gradient ring ({@link
 * feedStory}) while a seen one falls back to the ring's muted tone; the add
 * tile keeps its dashed ring. Ring state comes straight from each story. Same
 * props/behavior as {@link StoryBarProps}; token-only colors via
 * `useXenitionTheme()`. Scrolls without a visible scrollbar.
 */
export function StoryBarV4({
  stories,
  onPressStory,
  showAdd = true,
  onPressAdd,
  addLabel = 'Your story',
  style,
}: StoryBarV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const storyColors = feedStory(tokens.ramps);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="list"
      contentContainerStyle={{ gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}
      style={style}
    >
      {showAdd ? (
        <View accessibilityRole="none">
          <StoryRing state="add" label={addLabel} onPress={onPressAdd} />
        </View>
      ) : null}
      {stories.map((s) => {
        const state = s.state ?? 'unseen';
        const ring = (
          <StoryRing
            src={s.src}
            name={s.name}
            state={state}
            onPress={onPressStory ? () => onPressStory(s.id) : undefined}
          />
        );
        // An unseen story rides the accent→primary gradient ring; the gradient
        // sits behind the ring (which draws its own surface-filled avatar plate),
        // so it reads as a gradient halo. Seen/live keep the StoryRing tones.
        if (state === 'unseen') {
          return (
            <View key={s.id} accessibilityRole="none" style={{ alignItems: 'center' }}>
              <GradientSurface
                colors={storyColors}
                style={{ position: 'absolute', top: 0, alignSelf: 'center', width: 60, height: 60, borderRadius: 30 }}
              />
              {ring}
            </View>
          );
        }
        return (
          <View key={s.id} accessibilityRole="none">
            {ring}
          </View>
        );
      })}
    </ScrollView>
  );
}
