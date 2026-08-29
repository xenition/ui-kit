import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { RULE_MIX, ZEBRA_MIX } from '../../primitives/internal/v4-data';
import type { CodeBlockProps } from './CodeBlock';
import { pressFill } from './internal/state-v4';

export type { CodeBlockProps as CodeBlockV4Props };

/** Line height as a ratio of the size — a proportion, not a picked number. */
const CODE_LEADING = 1.5;

/**
 * **V4 code block** — same props as {@link CodeBlock}, a different design line.
 *
 * Code is the one content in this kit that is read character by character, so
 * the V4 answer is the opposite of decoration: a calmer surface and one more
 * piece of structure.
 *
 * Three changes:
 *
 * 1. **A calm, recessed ground.** The base painted the code on `surface` — the
 *    same colour as the page — so a block sat on a page it could not be
 *    distinguished from except by its border. V4 sinks the body by the same 4%
 *    neutral step the V4 tables band with, mixed from the two scheme-resolved
 *    slots so it darkens a light page and lightens a dark one. One recessed
 *    amount for the whole data-display line, and the block reads as quoted
 *    rather than as more page.
 * 2. **A gutter with an edge.** The header keeps its rule and the gutter gains
 *    one. A line number the reader is counting to needs something to stop at;
 *    with only a margin the numbers read as a first column of code. That is
 *    the second and last rule on the surface — everything else is spacing
 *    (§9).
 * 3. **The header is chrome, the body is content.** The header stays on
 *    `surface` while the body sinks, so the two layers are told apart by
 *    ground rather than by another border. The copy control also takes a real
 *    `xl` target and tints on press instead of doing nothing visible.
 *
 * **No gradient, anywhere near this.** §35.11 keeps gradients for a hero and
 * one primary action; a brand sweep behind code is decoration laid over
 * something read one glyph at a time. **No syntax colours either** — the base
 * highlights nothing, and inventing a palette here would be a second colour
 * system living outside the seed.
 *
 * `fontFamily: 'monospace'` is a font family, not a colour. Monospace figures
 * are tabular by construction, so the gutter needs no numeral setting of its
 * own.
 */
export function CodeBlockV4({
  code,
  language,
  lineNumbers = true,
  onCopy,
  style,
}: CodeBlockProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const lines = code.replace(/\n$/, '').split('\n');
  const showHeader = language != null || onCopy != null;

  const ground = mixToken(colors.surface, colors.onSurface, ZEBRA_MIX);
  const rule = mixToken(colors.surface, colors.onSurface, RULE_MIX);
  const pressedBg = pressFill(theme);
  const size = tokens.typography.scale.sm;

  const codeText = {
    fontFamily: 'monospace' as const,
    fontSize: size,
    lineHeight: size * CODE_LEADING,
  };

  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {showHeader ? (
        // Chrome, not content: it stays on `surface` while the body sinks.
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            borderBottomWidth: 1,
            borderColor: rule,
          }}
        >
          <Text
            style={{
              color: colors.mutedText,
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '600',
            }}
          >
            {language ?? ''}
          </Text>
          {onCopy != null ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Copy code"
              onPress={() => onCopy(code)}
              style={({ pressed }) => ({
                minHeight: tokens.spacing.xl,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.sm,
                backgroundColor: pressed ? pressedBg : 'transparent',
              })}
            >
              <Text
                style={{
                  color: colors.primaryText,
                  fontFamily: tokens.typography.fontBody,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '600',
                }}
              >
                Copy
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: ground }}>
        <View style={{ flexDirection: 'row', padding: tokens.spacing.md, backgroundColor: ground }}>
          {lineNumbers ? (
            // The gutter's one rule: a number the reader is counting to needs
            // an edge to stop at.
            <View
              style={{
                marginRight: tokens.spacing.md,
                paddingRight: tokens.spacing.md,
                borderRightWidth: 1,
                borderColor: rule,
                alignItems: 'flex-end',
              }}
            >
              {lines.map((_, i) => (
                <Text key={i} style={{ ...codeText, color: colors.mutedText }}>
                  {i + 1}
                </Text>
              ))}
            </View>
          ) : null}
          <View>
            {lines.map((line, i) => (
              <Text key={i} style={{ ...codeText, color: colors.onSurface }}>
                {line.length > 0 ? line : ' '}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
