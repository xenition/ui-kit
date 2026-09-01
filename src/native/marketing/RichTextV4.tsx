import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { parseRichText, type RichTextProps } from './RichText';

/** Drop-in for {@link RichTextProps} — same props, the V4 "showcase" design. */
export type RichTextV4Props = RichTextProps;

/**
 * RichText — **V4** "showcase" design (native mirror of the web V4). Beautiful
 * long-form typography for a trusted CMS `html` body: a strong heading hierarchy
 * (extra-bold h2/h3), a comfortable reading measure with generous leading, styled
 * list items and blockquotes. Uses the shared {@link parseRichText} reader (no
 * DOM), so the `html` contract is identical to the base; blockquotes gain a
 * soft-primary left rule and muted italic ink. Same props/behavior as
 * {@link RichTextProps}; token-only colors, no literals. For trusted,
 * seed-authored content only (it does not sanitise).
 */
export function RichTextV4({ html, style }: RichTextV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const blocks = React.useMemo(() => parseRichText(html), [html]);

  // Body copy tracks the `base` type token; line height stays proportional so it
  // scales with Dynamic Type rather than being pinned to a literal px value.
  const bodySize = tokens.typography.scale.base;
  const bodyLine = Math.round(bodySize * 1.65);

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      {blocks.map((b, i) => {
        if (b.kind === 'heading') {
          const headingSize =
            b.level <= 2 ? tokens.typography.scale['3xl'] : tokens.typography.scale.xl;
          return (
            <Text
              key={i}
              style={{
                fontSize: headingSize,
                lineHeight: Math.round(headingSize * 1.2),
                fontWeight: '800',
                letterSpacing: -0.5,
                color: colors.onSurface,
                marginTop: i === 0 ? 0 : tokens.spacing.md,
              }}
            >
              {b.text}
            </Text>
          );
        }
        if (b.kind === 'listitem') {
          return (
            <View key={i} style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
              <Text style={{ fontSize: bodySize, lineHeight: bodyLine, color: colors.primary, fontWeight: '700' }}>
                {'•'}
              </Text>
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
                borderLeftColor: withAlpha(colors.primary, 0.4),
                backgroundColor: withAlpha(colors.primary, 0.04),
                borderTopRightRadius: tokens.radius.md,
                borderBottomRightRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingLeft: tokens.spacing.md,
                paddingRight: tokens.spacing.md,
              }}
            >
              <Text
                style={{ fontSize: bodySize, lineHeight: bodyLine, fontStyle: 'italic', color: colors.onSurface }}
              >
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
