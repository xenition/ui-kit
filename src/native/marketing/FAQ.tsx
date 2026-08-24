import * as React from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface FAQItemData {
  /** The question line (toggle button text). */
  question: string;
  /** The answer body, revealed when expanded. */
  answer: React.ReactNode;
}

export interface FAQProps {
  /** Q/A pairs (mirrors the web `FAQItem` children). */
  items: FAQItemData[];
  /** Allow multiple panels open at once (default: single). */
  multiple?: boolean;
  /** Questions expanded on first render. */
  defaultOpen?: string[];
  style?: StyleProp<ViewStyle>;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Accordion of question/answer rows — the native mirror of the web `FAQ` +
 * `FAQItem`. The web version composes children and animates height with the CSS
 * grid `0fr → 1fr` trick; native takes an `items` data array and expands inline
 * with `LayoutAnimation` (same idiom as the native `Accordion` primitive).
 * Token-only.
 */
export function FAQ({
  items,
  multiple = false,
  defaultOpen = [],
  style,
}: FAQProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState<string[]>(defaultOpen);

  const toggle = (q: string): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) =>
      prev.includes(q) ? prev.filter((x) => x !== q) : multiple ? [...prev, q] : [q]
    );
  };

  return (
    <View
      testID="xen-faq"
      style={[
        { borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
        style,
      ]}
    >
      {items.map((it, i) => {
        const isOpen = open.includes(it.question);
        return (
          <View
            key={i}
            style={i > 0 ? { borderTopWidth: 1, borderColor: colors.border } : undefined}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen }}
              onPress={() => toggle(it.question)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: '600',
                }}
              >
                {it.question}
              </Text>
              <Text
                style={{
                  color: colors.muted,
                  transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
                }}
              >
                ▾
              </Text>
            </Pressable>
            {isOpen ? (
              <View style={{ paddingBottom: tokens.spacing.md }}>
                {typeof it.answer === 'string' ? (
                  <Text
                    style={{
                      color: colors.muted,
                      fontSize: tokens.typography.scale.sm,
                      lineHeight: tokens.typography.scale.sm * 1.6,
                    }}
                  >
                    {it.answer}
                  </Text>
                ) : (
                  it.answer
                )}
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
