import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { initialsFromName, type TestimonialsProps, type TestimonialItem } from './Testimonials';

/** Drop-in for {@link TestimonialsProps} — same props, the V4 "showcase" design. */
export type TestimonialsV4Props = TestimonialsProps;

/** Drop-in for the base `TestimonialItem` — same props, the V4 "showcase" design. */
export type TestimonialV4Props = TestimonialItem;

/**
 * Testimonial — **V4** "showcase" design (native mirror of the web V4). A clean,
 * elevated quote card: the `quote` over a caption of an avatar (or initials
 * derived from `author`), an extra-bold name, and a muted role line. NOT a
 * gradient surface. Same props as the base `TestimonialItem`. Token-only.
 */
export function TestimonialV4({ quote, author, role, avatar }: TestimonialV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={{
        gap: tokens.spacing.md,
        padding: tokens.spacing.lg,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
      }}
    >
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          lineHeight: tokens.typography.scale.sm * 1.6,
        }}
      >
        {quote}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {avatar !== undefined ? (
          avatar
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
              backgroundColor: withAlpha(colors.primary, 0.1),
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
              }}
            >
              {initialsFromName(author)}
            </Text>
          </View>
        )}
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '800',
              letterSpacing: -0.3,
            }}
          >
            {author}
          </Text>
          {role !== undefined ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{role}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

/**
 * Testimonials — **V4** "showcase" design (native mirror of the web V4). A
 * content section: a stack of elevated `TestimonialV4` quote cards. Mirrors the
 * web V4; native takes the base's `items` data array (the web `marquee` mode is
 * dropped, as on the base). Same props/behavior as {@link TestimonialsProps}.
 * Token-only colors, no literals.
 */
export function TestimonialsV4({ items, style }: TestimonialsV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View testID="xen-testimonials" style={[{ gap: tokens.spacing.lg }, style]}>
      {items.map((t, i) => (
        <TestimonialV4 key={i} {...t} />
      ))}
    </View>
  );
}
