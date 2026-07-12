import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';

export interface BentoCardData {
  /** Icon slot rendered in a ramp-gradient-ish tinted tile (string is auto-colored). */
  icon?: React.ReactNode;
  /** Small stat chip in the top-right corner (e.g. "38ms p99"). */
  metric?: React.ReactNode;
  /** Card title. */
  title?: React.ReactNode;
  /** Body copy under the title. */
  body?: React.ReactNode;
  /** Micro-visual slot below the body (a mini chart, an image, …). */
  visual?: React.ReactNode;
  /** Small emphasized footer line pinned to the bottom. */
  detail?: React.ReactNode;
}

export interface BentoCardProps extends BentoCardData {
  style?: StyleProp<ViewStyle>;
}

export interface BentoGridProps {
  /**
   * The bento cells to render (mirrors the web `BentoCard` children). Provide
   * either this data array or `BentoCard` children — the array wins if both are
   * given.
   */
  cards?: BentoCardData[];
  /**
   * `BentoCard` children, for callers that prefer composition over the `cards`
   * array. Ignored when `cards` is provided.
   */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * One bento cell — the native mirror of the web `BentoCard`: an icon tile +
 * metric chip header, a title, body copy, an optional micro-visual slot, and a
 * pinned detail line. The web hover glow + radial "energy wash" are hover-only
 * effects with no touch analogue and are dropped; the ramp-gradient icon tile
 * degrades to a flat token-tinted square. All slots optional. Token-only.
 */
export function BentoCard({
  icon,
  metric,
  title,
  body,
  visual,
  detail,
  style,
}: BentoCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
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
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {icon !== undefined || metric !== undefined ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {icon !== undefined ? (
            <View
              style={{
                height: 44,
                width: 44,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                backgroundColor: tokens.ramps.primary[600],
              }}
            >
              {typeof icon === 'string' ? (
                <Text style={{ color: colors.onPrimary, fontWeight: '700' }}>{icon}</Text>
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
                borderWidth: 1,
                borderColor: tokens.ramps.accent[300],
                backgroundColor: tokens.ramps.accent[50],
              }}
            >
              {typeof metric === 'string' ? (
                <Text
                  style={{
                    color: colors.accent,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                  }}
                >
                  {metric}
                </Text>
              ) : (
                metric
              )}
            </View>
          ) : null}
        </View>
      ) : null}

      {title !== undefined ? (
        typeof title === 'string' ? (
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.xl,
              fontWeight: '700',
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
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {body}
          </Text>
        ) : (
          body
        )
      ) : null}

      {visual !== undefined ? <View>{visual}</View> : null}

      {detail !== undefined ? (
        <View style={{ marginTop: 'auto' }}>
          {typeof detail === 'string' ? (
            <Text
              style={{
                color: colors.primary,
                fontSize: tokens.typography.scale.xs,
                fontWeight: '500',
              }}
            >
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
 * Bento feature grid — the native mirror of the web `BentoGrid` + `BentoCard`.
 *
 * The web version is an asymmetric 6-column CSS grid where cards declare their
 * own column/row spans and overlap into the classic bento rhythm. React Native
 * has no CSS grid and phones are single-column, so native **drops the spans and
 * overlap entirely** and renders the cards as a simple stacked (wrapping) list
 * — the same simplification `FeatureGrid` makes. The web hover glow/energy wash
 * are hover-only and are dropped. Cards fade + rise once on mount (skipped when
 * the OS "Reduce Motion" toggle is on). Token-only.
 */
export function BentoGrid({ cards, children, style }: BentoGridProps): React.ReactElement {
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

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  });

  return (
    <Animated.View
      testID="xen-bento-grid"
      style={[
        {
          gap: tokens.spacing.md,
          opacity: anim,
          transform: [{ translateY }],
        },
        style,
      ]}
    >
      {cards !== undefined
        ? cards.map((c, i) => <BentoCard key={i} {...c} />)
        : children}
    </Animated.View>
  );
}
