import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { PresenceDotV4 } from './PresenceDotV4';
import { PRESENCE_META, metaLine } from './internal/thread-v4';
import type { ChatHeaderProps } from './ChatHeader';

export interface ChatHeaderV4Props extends ChatHeaderProps {
  /** Accessible name for the back control. Default `'Back'`. */
  backLabel?: string;
  /** Copy shown while the other party types. Default `'typing…'`. */
  typingLabel?: string;
}

/**
 * **V4 chat header** — same props as {@link ChatHeader} plus `backLabel` and
 * `typingLabel`.
 *
 * ## Four changes
 *
 * 1. **Presence is a word, not only a dot.** The dot was the entire signal in
 *    a header; it now carries its label in the subtitle line and in the
 *    header's accessible name.
 * 2. **Back and the actions clear 44 and are named.** They were glyphs at
 *    text size — and `ChatHeaderAction` already carries a `label` the base
 *    never rendered or announced.
 * 3. **Typing replaces the subtitle rather than stacking under it**, so the
 *    header does not change height every time the other person starts and
 *    stops typing.
 * 4. **The title row is one press target** with one name, not a title and a
 *    subtitle a reader walks separately.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export function ChatHeaderV4({
  title,
  subtitle,
  avatarUri,
  presence,
  typing = false,
  backLabel = 'Back',
  typingLabel = 'typing…',
  onBack,
  onPressTitle,
  actions = [],
  appearance = 'classic',
  style,
}: ChatHeaderV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!title) return null;

  const tap = minTap(tokens.spacing);
  const presenceWord = presence ? PRESENCE_META[presence].label : null;
  // Typing REPLACES the subtitle. Stacking it changes the header's height
  // every time the other person pauses.
  const caption = typing ? typingLabel : (subtitle ?? presenceWord);

  const titleBlock = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }}>
      <View>
        <AvatarV4 src={avatarUri} name={title} size="sm" />
        {presence ? (
          <View style={{ position: 'absolute', right: -2, bottom: -2 }}>
            <PresenceDotV4 status={presence} ring scale="sm" />
          </View>
        ) : null}
      </View>
      <View style={{ flex: 1 }}>
        <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
          {title}
        </TextV4>
        {caption ? (
          <TextV4
            size="xs"
            tone={typing ? 'primaryText' : 'mutedText'}
            numberOfLines={1}
            accessibilityLiveRegion={typing ? 'polite' : 'none'}
          >
            {caption}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <View
      style={[
        {
          ...appearanceStyle(appearance, colors, tokens),
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={backLabel}
          onPress={onBack}
          style={({ pressed }) => ({
            width: tap,
            height: tap,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? pressFill(theme) : 'transparent',
          })}
        >
          <IconV4 name="chevron-left" size="lg" color="onSurface" />
        </Pressable>
      ) : null}

      {onPressTitle ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={metaLine([title, caption])}
          onPress={onPressTitle}
          style={({ pressed }) => ({
            flex: 1,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? pressFill(theme) : 'transparent',
          })}
        >
          {titleBlock}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={metaLine([title, caption])} style={{ flex: 1 }}>
          {titleBlock}
        </View>
      )}

      {actions.map((action) => (
        <Pressable
          key={action.id}
          accessibilityRole="button"
          // `ChatHeaderAction` has always carried a `label`; the base never
          // rendered or announced it.
          accessibilityLabel={action.label}
          onPress={action.onPress}
          style={({ pressed }) => ({
            width: tap,
            height: tap,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? pressFill(theme) : 'transparent',
          })}
        >
          <IconV4 glyph={action.glyph} size="lg" />
        </Pressable>
      ))}
    </View>
  );
}
