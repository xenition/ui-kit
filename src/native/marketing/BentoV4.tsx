import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import type { BentoCardProps, BentoGridProps, BentoCardData } from './Bento';

/** Drop-in for {@link BentoCardProps} — same props, the V4 "showcase" design. */
export type BentoCardV4Props = BentoCardProps;

/** Drop-in for {@link BentoGridProps} — same props, the V4 "showcase" design. */
export type BentoGridV4Props = BentoGridProps;

/** Soft-primary media-well glyph placeholder used when a card has no `visual`. */
function MediaGlyph({ color }: { color: string }): React.ReactElement {
  return (
    <View
      style={{
        height: 28,
        width: 28,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: color,
      }}
    />
  );
}

/**
 * BentoCard — **V4** "showcase" design (native mirror of the web V4). One bento
 * cell as an image-forward, elevated rounded showcase card: a floating
 * soft-primary media well carrying the `visual` (or a glyph placeholder when
 * empty), a soft-primary metric chip, an extra-bold tight-tracked title, muted
 * body copy, and a pinned detail line. NOT a gradient surface — a clean elevated
 * card (`colors.card` + border + soft shadow). Same props/behavior as the base
 * {@link BentoCardProps}; token-only colors, no literals.
 */
export function BentoCardV4({
  icon,
  metric,
  title,
  body,
  visual,
  detail,
  style,
}: BentoCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const softPrimary = withAlpha(colors.primary, 0.1);

  return (
    <View
      testID="xen-bento-card"
      style={[
        {
          flex: 1,
          overflow: 'hidden',
          gap: tokens.spacing.sm,
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
        },
        style,
      ]}
    >
      {icon !== undefined || metric !== undefined ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {icon !== undefined ? (
            <View
              style={{
                height: 44,
                width: 44,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                backgroundColor: withAlpha(colors.primary, 0.12),
              }}
            >
              {typeof icon === 'string' ? (
                <Text style={{ color: colors.primary, fontWeight: '700' }}>{icon}</Text>
              ) : (
                icon
              )}
            </View>
          ) : (
            <View />
          )}
          {metric !== undefined ? (
            <View
              style={{
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                borderRadius: 9999,
                backgroundColor: withAlpha(colors.primary, 0.12),
              }}
            >
              {typeof metric === 'string' ? (
                <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                  {metric}
                </Text>
              ) : (
                metric
              )}
            </View>
          ) : null}
        </View>
      ) : null}

      {/* Floating media well — carries the visual, or a soft-primary glyph placeholder. */}
      <View
        style={{
          minHeight: 96,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: tokens.radius.md,
          backgroundColor: softPrimary,
        }}
      >
        {visual !== undefined ? visual : <MediaGlyph color={colors.primary} />}
      </View>

      {title !== undefined ? (
        typeof title === 'string' ? (
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.xl,
              fontWeight: '800',
              letterSpacing: -0.3,
            }}
          >
            {title}
          </Text>
        ) : (
          title
        )
      ) : null}

      {body !== undefined ? (
        typeof body === 'string' ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.sm,
              lineHeight: tokens.typography.scale.sm * 1.5,
            }}
          >
            {body}
          </Text>
        ) : (
          body
        )
      ) : null}

      {detail !== undefined ? (
        <View style={{ marginTop: 'auto' }}>
          {typeof detail === 'string' ? (
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
              {detail}
            </Text>
          ) : (
            detail
          )}
        </View>
      ) : null}
    </View>
  );
}

/**
 * BentoGrid — **V4** "showcase" design (native mirror of the web V4). A stacked
 * (wrapping) list of elevated `BentoCardV4`s. As with the base native `BentoGrid`,
 * the web's asymmetric span/overlap geometry has no phone analogue and is dropped
 * — cards render as a simple stack. Cards fade + rise once on mount (skipped under
 * the OS "Reduce Motion" toggle). Accepts the base's `cards` data array or
 * `BentoCardV4` children (array wins). Same props/behavior as the base
 * {@link BentoGridProps}; token-only colors, no literals.
 */
export function BentoGridV4({ cards, children, style }: BentoGridV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const reduced = useReducedMotion();
  const anim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (reduced) {
      anim.setValue(1);
      return;
    }
    const animation = Animated.timing(anim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [anim, reduced]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });

  return (
    <Animated.View
      testID="xen-bento-grid"
      style={[{ gap: tokens.spacing.md, opacity: anim, transform: [{ translateY }] }, style]}
    >
      {cards !== undefined
        ? cards.map((c: BentoCardData, i) => <BentoCardV4 key={i} {...c} />)
        : children}
    </Animated.View>
  );
}
