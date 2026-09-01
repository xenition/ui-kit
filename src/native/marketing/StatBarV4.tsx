import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { StatBarProps, StatItem } from './StatBar';

/** Drop-in for {@link StatBarProps} — same props, the V4 "showcase" design. */
export type StatBarV4Props = StatBarProps;

/** Drop-in for {@link StatItem} — same props, the V4 "showcase" design. */
export type StatV4Props = StatItem;

const defaultFormat = (n: number): string => Math.round(n).toLocaleString();

/**
 * Stat — **V4** "showcase" design (native mirror of the web V4). One statistic:
 * a big extra-bold **tabular-nums** numeral that counts up over a muted label.
 * NOT a gradient surface — clean numerals on the page ground. As on the base,
 * native has no IntersectionObserver, so the count-up runs once on mount via
 * `Animated.timing`. Same props/behavior as the base `StatItem`. Token-only.
 */
export function StatV4({
  value,
  to,
  label,
  prefix,
  suffix,
  duration = 1200,
  format = defaultFormat,
}: StatV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const target = to ?? value;
  const anim = React.useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    const id = anim.addListener(({ value: v }) => setDisplay(v));
    const animation = Animated.timing(anim, {
      toValue: target,
      duration,
      useNativeDriver: false,
    });
    animation.start();
    return () => {
      animation.stop();
      anim.removeListener(id);
    };
  }, [anim, target, duration]);

  return (
    <View testID="xen-stat" style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale['3xl'],
          fontWeight: '800',
          letterSpacing: -0.5,
          fontVariant: ['tabular-nums'],
        }}
      >
        {prefix ?? ''}
        {format(display)}
        {suffix ?? ''}
      </Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
    </View>
  );
}

/**
 * StatBar — **V4** "showcase" design (native mirror of the web V4). A content
 * section: a centered, wrapping row of `StatV4`s. Mirrors the web V4; native
 * takes the base's `stats` data array. Same props/behavior as
 * {@link StatBarProps}. Token-only colors, no literals.
 */
export function StatBarV4({ stats, style }: StatBarV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      testID="xen-statbar"
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: tokens.spacing['2xl'],
        },
        style,
      ]}
    >
      {stats.map((s, i) => (
        <StatV4 key={i} {...s} />
      ))}
    </View>
  );
}
