import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { FeatureGridProps, FeatureItem } from './FeatureGrid';

/** Drop-in for {@link FeatureGridProps} — same props, the V4 "showcase" design. */
export type FeatureGridV4Props = FeatureGridProps;

/**
 * FeatureCard — **V4** "showcase" design (native mirror of the web V4). One
 * `FeatureItem` as an elevated rounded card: an icon in a soft-primary well, an
 * extra-bold tight-tracked title, and muted body copy. NOT a gradient surface —
 * a clean elevated card on the page ground. Token-only colors, no literals.
 */
function FeatureCardV4({ item }: { item: FeatureItem }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={{
        flex: 1,
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
      }}
    >
      {item.icon !== undefined ? (
        <View
          style={{
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.primary, 0.1),
          }}
        >
          {typeof item.icon === 'string' ? (
            <Text style={{ color: colors.primary, fontWeight: '700' }}>{item.icon}</Text>
          ) : (
            item.icon
          )}
        </View>
      ) : null}
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.lg,
          fontWeight: '800',
          letterSpacing: -0.3,
        }}
      >
        {item.title}
      </Text>
      {item.description ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }}>
          {item.description}
        </Text>
      ) : null}
    </View>
  );
}

/**
 * FeatureGrid — **V4** "showcase" design (native mirror of the web V4). A
 * content section: a wrapping grid of elevated `FeatureCardV4`s. Mirrors the web
 * V4; native takes the base's `features` data array and wraps via flex `basis`
 * rather than CSS breakpoints (`columns` sets the row width, default 2 for
 * phones), and hover-lift is dropped (no hover on touch). Same props/behavior as
 * {@link FeatureGridProps}. Token-only colors, no literals.
 */
export function FeatureGridV4({
  features,
  columns = 2,
  style,
}: FeatureGridV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const basis = `${100 / columns}%` as ViewStyle['flexBasis'];

  return (
    <View
      testID="xen-feature-grid"
      style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg }, style]}
    >
      {features.map((f, i) => (
        <View key={i} style={{ flexGrow: 1, flexBasis: basis, minWidth: 160 }}>
          <FeatureCardV4 item={f} />
        </View>
      ))}
    </View>
  );
}
