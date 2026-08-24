import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface StatItem {
  /** Final value the counter reaches (web calls this `to`). */
  value: number;
  /** Alias for `value` to match the web `Stat` prop name. */
  to?: number;
  /** Label under the number. */
  label: string;
  /** Rendered before the number (e.g. `$`). */
  prefix?: string;
  /** Rendered after the number (e.g. `+`, `%`). */
  suffix?: string;
  /** Count duration in ms (default 1200). */
  duration?: number;
  /** Formats the animated value (default: locale integer). */
  format?: (value: number) => string;
}

export interface StatBarProps {
  /** The statistics to render (mirrors the web `Stat` children). */
  stats: StatItem[];
  style?: StyleProp<ViewStyle>;
}

const defaultFormat = (n: number): string => Math.round(n).toLocaleString();

/**
 * One statistic with a count-up number and a label — the native mirror of the
 * web `Stat`. The web `AnimatedCounter` starts when scrolled into view; native
 * has no IntersectionObserver, so the count-up runs once on mount via
 * `Animated.timing` (simplification). Token-only.
 */
export function Stat({
  value,
  to,
  label,
  prefix,
  suffix,
  duration = 1200,
  format = defaultFormat,
}: StatItem): React.ReactElement {
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
    // Stop the animation AND drop the listener on unmount so no frame timer
    // fires after the component (or a test's jest env) is gone.
    return () => {
      animation.stop();
      anim.removeListener(id);
    };
  }, [anim, target, duration]);

  return (
    <View
      testID="xen-stat"
      style={{ alignItems: 'center', gap: tokens.spacing.xs }}
    >
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale['3xl'],
          fontWeight: '700',
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
 * Horizontal row of `Stat`s — the native mirror of the web `StatBar`. The web
 * version composes children; native takes a `stats` data array and wraps them
 * in a centered flex row. Token-only.
 */
export function StatBar({ stats, style }: StatBarProps): React.ReactElement {
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
        <Stat key={i} {...s} />
      ))}
    </View>
  );
}
