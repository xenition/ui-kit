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

export interface AccordionItemData {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  /** `single` keeps one panel open; `multiple` allows many (default single). */
  type?: 'single' | 'multiple';
  /** Values open on first render. */
  defaultValue?: string[];
  style?: StyleProp<ViewStyle>;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Themed collapsible sections — the native mirror of the web `Accordion`. No
 * modal: sections expand/collapse inline, animated with `LayoutAnimation`.
 * Supports `single` (one open) and `multiple` like the web version. No literal
 * colors.
 */
export function Accordion({
  items,
  type = 'single',
  defaultValue = [],
  style,
}: AccordionProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState<string[]>(defaultValue);

  const toggle = (v: string): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : type === 'single' ? [v] : [...prev, v]
    );
  };

  return (
    <View
      style={[
        {
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {items.map((it, i) => {
        const isOpen = open.includes(it.value);
        return (
          <View
            key={it.value}
            style={i > 0 ? { borderTopWidth: 1, borderColor: colors.border } : undefined}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen }}
              onPress={() => toggle(it.value)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.lg,
              }}
            >
              {typeof it.title === 'string' ? (
                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.onSurface }}>
                  {it.title}
                </Text>
              ) : (
                it.title
              )}
              <Text
                style={{
                  color: colors.muted,
                  transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
                }}
              >
                ▾
              </Text>
            </Pressable>
            {isOpen && (
              <View style={{ paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.md }}>
                {typeof it.content === 'string' ? (
                  <Text style={{ fontSize: 14, color: colors.muted }}>{it.content}</Text>
                ) : (
                  it.content
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
