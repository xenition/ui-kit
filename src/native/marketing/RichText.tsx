import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface RichTextProps {
  /** Trusted CMS body HTML (e.g. a cms page's `bodyHtml`). */
  html: string;
  /** Optional container style override. */
  style?: StyleProp<ViewStyle>;
}

type Block =
  | { kind: 'heading'; level: number; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'listitem'; text: string }
  | { kind: 'quote'; text: string };

const ENTITIES: Record<string, string> = {
  '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
  '&#39;': "'", '&apos;': "'", '&rsquo;': '’', '&lsquo;': '‘',
  '&ldquo;': '“', '&rdquo;': '”', '&mdash;': '—', '&ndash;': '–',
  '&hellip;': '…',
};

function decodeEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m);
}

/** Strip inline tags to their text and normalise whitespace. */
function inlineText(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/**
 * Parse trusted CMS HTML into ordered blocks — headings, paragraphs, list items
 * and blockquotes — preserving document order. Anything outside a recognised
 * block tag (bare inline/plain text) is captured as a trailing paragraph.
 */
export function parseRichText(html: string): Block[] {
  const blocks: Block[] = [];
  const re = /<(h[1-6]|p|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  const pushLoose = (chunk: string) => {
    const t = inlineText(chunk);
    if (t) blocks.push({ kind: 'paragraph', text: t });
  };
  while ((m = re.exec(html)) !== null) {
    if (m.index > lastIndex) pushLoose(html.slice(lastIndex, m.index));
    lastIndex = re.lastIndex;
    const tag = m[1]!.toLowerCase();
    const text = inlineText(m[2]!);
    if (!text) continue;
    if (tag[0] === 'h') blocks.push({ kind: 'heading', level: Number(tag[1]), text });
    else if (tag === 'li') blocks.push({ kind: 'listitem', text });
    else if (tag === 'blockquote') blocks.push({ kind: 'quote', text });
    else blocks.push({ kind: 'paragraph', text });
  }
  if (lastIndex < html.length) pushLoose(html.slice(lastIndex));
  // No block tags at all → treat the whole thing as one paragraph.
  if (blocks.length === 0) {
    const t = inlineText(html);
    if (t) blocks.push({ kind: 'paragraph', text: t });
  }
  return blocks;
}

/**
 * The native mirror of the web pattern of rendering a trusted CMS `bodyHtml`
 * (which the web does via `dangerouslySetInnerHTML`). React Native has no DOM,
 * so this dependency-free reader parses the HTML into ordered blocks and renders
 * each as a token-styled `Text`: headings larger/bold, list items with a bullet,
 * blockquotes muted/indented, paragraphs as body copy. Bold/links collapse to
 * their text. Token-only — colors + spacing from the active theme. For trusted,
 * seed-authored content only (it does not sanitise).
 */
export function RichText({ html, style }: RichTextProps) {
  const { colors, tokens } = useXenitionTheme();
  const blocks = React.useMemo(() => parseRichText(html), [html]);

  // Body copy tracks the `base` type token; line height stays proportional so
  // it scales with Dynamic Type rather than being pinned to a literal px value.
  const bodySize = tokens.typography.scale.base;
  const bodyLine = Math.round(bodySize * 1.5);

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {blocks.map((b, i) => {
        if (b.kind === 'heading') {
          const headingSize =
            b.level <= 2 ? tokens.typography.scale['2xl'] : tokens.typography.scale.lg;
          return (
            <Text
              key={i}
              style={{
                fontSize: headingSize,
                lineHeight: Math.round(headingSize * 1.3),
                fontWeight: '700',
                color: colors.onSurface,
                marginTop: i === 0 ? 0 : tokens.spacing.sm,
              }}
            >
              {b.text}
            </Text>
          );
        }
        if (b.kind === 'listitem') {
          return (
            <View key={i} style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
              <Text style={{ fontSize: bodySize, lineHeight: bodyLine, color: colors.accent }}>{'•'}</Text>
              <Text style={{ flex: 1, fontSize: bodySize, lineHeight: bodyLine, color: colors.onSurface }}>
                {b.text}
              </Text>
            </View>
          );
        }
        if (b.kind === 'quote') {
          return (
            <View
              key={i}
              style={{
                borderLeftWidth: 3,
                borderLeftColor: colors.border,
                paddingLeft: tokens.spacing.md,
              }}
            >
              <Text style={{ fontSize: bodySize, lineHeight: bodyLine, fontStyle: 'italic', color: colors.muted }}>
                {b.text}
              </Text>
            </View>
          );
        }
        return (
          <Text key={i} style={{ fontSize: bodySize, lineHeight: bodyLine, color: colors.onSurface }}>
            {b.text}
          </Text>
        );
      })}
    </View>
  );
}
