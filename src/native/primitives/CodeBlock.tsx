import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface CodeBlockProps {
  /** Source text to render verbatim in a monospace face. */
  code: string;
  /** Language label shown in the header (display only — no highlighting). */
  language?: string;
  /** Show a left gutter of line numbers (default true). */
  lineNumbers?: boolean;
  /**
   * Fires when the copy button is pressed with the full `code` string. Clipboard
   * writing is left to the host app (the kit takes no clipboard dependency).
   * Omit to hide the copy button.
   */
  onCopy?: (code: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Monospace code surface with an optional header (language label + copy button)
 * and an optional line-number gutter. Horizontally scrollable for long lines.
 * `fontFamily: 'monospace'` is a font family, not a color. All colors, radii and
 * spacing come from the compiled theme tokens via `useXenitionTheme()` — no
 * literal colors.
 */
export function CodeBlock({
  code,
  language,
  lineNumbers = true,
  onCopy,
  style,
}: CodeBlockProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const lines = code.replace(/\n$/, '').split('\n');
  const showHeader = language != null || onCopy != null;

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            borderBottomWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {language ?? ''}
          </Text>
          {onCopy != null ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Copy code"
              onPress={() => onCopy(code)}
              style={{ paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}
            >
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                Copy
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', padding: tokens.spacing.md }}>
          {lineNumbers ? (
            <View style={{ marginRight: tokens.spacing.md, alignItems: 'flex-end' }}>
              {lines.map((_, i) => (
                <Text
                  key={i}
                  style={{
                    color: colors.muted,
                    fontFamily: 'monospace',
                    fontSize: tokens.typography.scale.sm,
                    lineHeight: tokens.typography.scale.sm * 1.5,
                  }}
                >
                  {i + 1}
                </Text>
              ))}
            </View>
          ) : null}
          <View>
            {lines.map((line, i) => (
              <Text
                key={i}
                style={{
                  color: colors.onSurface,
                  fontFamily: 'monospace',
                  fontSize: tokens.typography.scale.sm,
                  lineHeight: tokens.typography.scale.sm * 1.5,
                }}
              >
                {line.length > 0 ? line : ' '}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
