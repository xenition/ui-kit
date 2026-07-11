import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';

export interface TestimonialItem {
  /** The quote body. */
  quote: string;
  /** Author name — also the source for the avatar-initials fallback. */
  author: string;
  /** Author role/company line. */
  role?: string;
  /** Avatar slot; when omitted, initials derived from `author` are shown. */
  avatar?: React.ReactNode;
}

export interface TestimonialsProps {
  /** The quote cards to render (mirrors the web `Testimonial` children). */
  items: TestimonialItem[];
  style?: StyleProp<ViewStyle>;
}

/** Derive up to two initials from a display name. */
export function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Stacked quote cards — the native mirror of the web `Testimonials` +
 * `Testimonial`. The web version composes children and offers a `marquee` mode;
 * native takes an `items` data array and only renders the `grid`-equivalent
 * vertical stack (the infinite marquee is dropped — native motion is
 * Reveal/Stagger only). Token-only.
 */
export function Testimonials({ items, style }: TestimonialsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View testID="xen-testimonials" style={[{ gap: tokens.spacing.lg }, style]}>
      {items.map((t, i) => (
        <Card key={i} style={{ gap: tokens.spacing.md }}>
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              lineHeight: tokens.typography.scale.sm * 1.6,
            }}
          >
            {t.quote}
          </Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
          >
            {t.avatar !== undefined ? (
              t.avatar
            ) : (
              <View
                accessibilityElementsHidden
                importantForAccessibility="no"
                style={{
                  height: 36,
                  width: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: tokens.radius.full,
                  backgroundColor: tokens.ramps.primary[100],
                }}
              >
                <Text
                  style={{
                    color: tokens.ramps.primary[700],
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                  }}
                >
                  {initialsFromName(t.author)}
                </Text>
              </View>
            )}
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '600',
                }}
              >
                {t.author}
              </Text>
              {t.role !== undefined ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {t.role}
                </Text>
              ) : null}
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
}
