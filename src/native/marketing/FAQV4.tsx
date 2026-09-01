import * as React from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import type { FAQProps, FAQItemData } from './FAQ';

/** Drop-in for {@link FAQProps} — same props, the V4 "showcase" design. */
export type FAQV4Props = FAQProps;

/**
 * Drop-in for the base `FAQItemData` — the native base `FAQ` has no separate
 * item sub-component (it takes an `items` data array), so `FAQItemV4Props`
 * aliases the base item type rather than a distinct component's props.
 */
export type FAQItemV4Props = FAQItemData;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * FAQ — **V4** "showcase" design (native mirror of the web V4). An elegant
 * accordion: each `items` entry a clean rounded row with an extra-bold
 * `question` and a chevron, expanding inline with `LayoutAnimation` (dropped
 * under the OS "Reduce Motion" toggle via {@link useReducedMotion}, exactly as
 * the web V4 drops its grid animation). The open row sits on a subtle
 * soft-primary (`withAlpha(colors.primary, 0.06)`) tint with a soft-primary
 * chevron; the toggle is a `≥44px` tap target. NOT a gradient surface. Honors
 * every prop — `items` (`question`/`answer`), `multiple`, `defaultOpen`. Same
 * props/behavior as {@link FAQProps}; token-only colors, no literals.
 */
export function FAQV4({
  items,
  multiple = false,
  defaultOpen = [],
  style,
}: FAQV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState<string[]>(defaultOpen);

  const toggle = (q: string): void => {
    if (!reduced) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setOpen((prev) =>
      prev.includes(q) ? prev.filter((x) => x !== q) : multiple ? [...prev, q] : [q]
    );
  };

  return (
    <View testID="xen-faq" style={[{ gap: tokens.spacing.sm }, style]}>
      {items.map((it, i) => {
        const isOpen = open.includes(it.question);
        return (
          <View
            key={i}
            style={{
              borderRadius: tokens.radius.lg,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: tokens.spacing.md,
              backgroundColor: isOpen ? withAlpha(colors.primary, 0.06) : colors.card,
            }}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen }}
              onPress={() => toggle(it.question)}
              style={{
                minHeight: 44,
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
                  fontWeight: '800',
                  letterSpacing: -0.3,
                }}
              >
                {it.question}
              </Text>
              <View
                style={{
                  height: 24,
                  width: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: tokens.radius.full,
                  backgroundColor: withAlpha(colors.primary, 0.1),
                }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: '700',
                    transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
                  }}
                >
                  ▾
                </Text>
              </View>
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
