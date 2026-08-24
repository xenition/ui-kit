import * as React from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

type TypeScaleKey = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

export interface MentionTextProps {
  /** Raw body text. `@handles` and `#hashtags` are auto-highlighted. */
  text: string;
  /** Base color slot for plain text. Default `'onSurface'`. */
  color?: keyof SemanticColors;
  /** Highlight color slot for mentions/hashtags/links. Default `'primary'`. */
  linkColor?: keyof SemanticColors;
  /** Font size from the typography scale. Default `'base'`. */
  size?: TypeScaleKey;
  /** Clamp to N lines. */
  numberOfLines?: number;
  /** Fired with the bare handle (no `@`) when a mention is tapped. */
  onPressMention?: (handle: string) => void;
  /** Fired with the bare tag (no `#`) when a hashtag is tapped. */
  onPressHashtag?: (tag: string) => void;
  style?: StyleProp<TextStyle>;
}

type Segment = { kind: 'text' | 'mention' | 'hashtag'; value: string };

/** Split a string into plain / @mention / #hashtag segments (order preserved). */
export function parseMentions(text: string): Segment[] {
  const segments: Segment[] = [];
  const re = /([@#][\w]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const token = match[0] ?? '';
    if (match.index > lastIndex) {
      segments.push({ kind: 'text', value: text.slice(lastIndex, match.index) });
    }
    segments.push({
      kind: token.charAt(0) === '@' ? 'mention' : 'hashtag',
      value: token,
    });
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    segments.push({ kind: 'text', value: text.slice(lastIndex) });
  }
  return segments;
}

/**
 * Rich body text that highlights `@mentions` and `#hashtags` in the theme's
 * link color and makes each tappable. Everything else renders in the base
 * color. Pure `Text` composition (so it wraps/clamps naturally); token-only.
 */
export function MentionText({
  text,
  color = 'onSurface',
  linkColor = 'primary',
  size = 'base',
  numberOfLines,
  onPressMention,
  onPressHashtag,
  style,
}: MentionTextProps): React.ReactElement {
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
