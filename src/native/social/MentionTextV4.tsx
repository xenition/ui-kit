import * as React from 'react';
import { Text } from 'react-native';
import { useXenitionTheme } from '../theme';
import { parseMentions } from './MentionText';
import type { MentionTextProps } from './MentionText';

/** Drop-in for {@link MentionTextProps} — same props, the V4 "feed" design. */
export type MentionTextV4Props = MentionTextProps;

/**
 * MentionText — **V4** "feed" design. The clean, airy mention-aware body:
 * `@mentions` and `#hashtags` render in **primary** and become tappable,
 * everything else in the on-surface base color. Reuses the shared
 * {@link parseMentions} splitter. Pure `Text` composition (so it wraps/clamps
 * naturally). Same props/behavior as {@link MentionTextProps}; token-only colors
 * via `useXenitionTheme()`, `link` a11y role on tappable segments.
 */
export function MentionTextV4({
  text,
  color = 'onSurface',
  linkColor = 'primaryText',
  size = 'base',
  numberOfLines,
  onPressMention,
  onPressHashtag,
  style,
}: MentionTextV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const fontSize = tokens.typography.scale[size];
  const segments = parseMentions(text);

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[{ color: colors[color], fontSize, lineHeight: fontSize * 1.4 }, style]}
    >
      {segments.map((seg, i) => {
        if (seg.kind === 'text') {
          return <Text key={i}>{seg.value}</Text>;
        }
        const bare = seg.value.slice(1);
        const onPress =
          seg.kind === 'mention'
            ? onPressMention
              ? () => onPressMention(bare)
              : undefined
            : onPressHashtag
              ? () => onPressHashtag(bare)
              : undefined;
        return (
          <Text
            key={i}
            accessibilityRole={onPress ? 'link' : undefined}
            onPress={onPress}
            style={{ color: colors[linkColor], fontWeight: '600' }}
          >
            {seg.value}
          </Text>
        );
      })}
    </Text>
  );
}
