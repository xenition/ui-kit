import * as React from 'react';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StoryRing, type StoryState } from './StoryRing';

export interface Story {
  id: string;
  name?: string;
  src?: string;
  /** Ring state; `add` tiles are usually supplied via `showAdd` instead. */
  state?: StoryState;
}

export interface StoryBarProps {
  /** Ordered stories to display. */
  stories: ReadonlyArray<Story>;
  /** Tapping a ring fires with its id. */
  onPressStory?: (id: string) => void;
  /** Prepend the viewer's own "add story" tile. Default `true`. */
  showAdd?: boolean;
  /** Handler for the add tile. */
  onPressAdd?: () => void;
  /** Caption for the add tile. */
  addLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A horizontally-scrolling rail of {@link StoryRing}s, optionally led by the
 * viewer's "add story" tile. Ring state (unseen/seen/live) comes straight from
 * each story. Token-only; scrolls without a visible scrollbar.
 */
export function StoryBar({
  stories,
  onPressStory,
  showAdd = true,
  onPressAdd,
  addLabel = 'Your story',
  style,
}: StoryBarProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="list"
      contentContainerStyle={{ gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.sm }}
      style={style}
    >
      {showAdd ? (
        <View accessibilityRole="none">
          <StoryRing state="add" label={addLabel} onPress={onPressAdd} />
        </View>
      ) : null}
      {stories.map((s) => (
        <View key={s.id} accessibilityRole="none">
          <StoryRing
            src={s.src}
            name={s.name}
            state={s.state ?? 'unseen'}
            onPress={onPressStory ? () => onPressStory(s.id) : undefined}
          />
        </View>
      ))}
    </ScrollView>
  );
}
