import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';

export interface FeatureItem {
  /** Icon slot rendered in a tinted square (string is auto-colored). */
  icon?: React.ReactNode;
  title: string;
  /** Body copy under the title. */
  description?: string;
}

export interface FeatureGridProps {
  /** The features to render (mirrors the web `FeatureCard` children). */
  features: FeatureItem[];
  /** Max columns; native wraps into rows of this width (default 2 for phones). */
  columns?: 2 | 3 | 4;
  style?: StyleProp<ViewStyle>;
}

/**
 * Responsive grid of feature cards — the native mirror of the web `FeatureGrid`
 * + `FeatureCard`. The web version composes children; native takes a `features`
 * data array (idiomatic for RN lists). Cards wrap via flex `basis` rather than
 * CSS grid breakpoints, and the web hover-lift is dropped (no hover on touch).
 * Token-only.
 */
export function FeatureGrid({
  features,
  columns = 2,
  style,
}: FeatureGridProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const basis = `${100 / columns}%` as ViewStyle['flexBasis'];

  return (
    <View
      testID="xen-feature-grid"
      style={[
        { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg },
        style,
      ]}
    >
      {features.map((f, i) => (
        <View key={i} style={{ flexGrow: 1, flexBasis: basis, minWidth: 160 }}>
          <Card style={{ flex: 1, gap: tokens.spacing.sm }}>
            {f.icon !== undefined ? (
              <View
                style={{
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: tokens.radius.md,
                  backgroundColor: tokens.ramps.primary[100],
                }}
              >
                {typeof f.icon === 'string' ? (
                  <Text style={{ color: tokens.ramps.primary[700], fontWeight: '700' }}>
                    {f.icon}
                  </Text>
                ) : (
                  f.icon
                )}
              </View>
            ) : null}
            <Text
              style={{
                color: colors.onSurface,
                fontSize: tokens.typography.scale.lg,
                fontWeight: '600',
              }}
            >
              {f.title}
            </Text>
            {f.description ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {f.description}
              </Text>
            ) : null}
          </Card>
        </View>
      ))}
    </View>
  );
}
