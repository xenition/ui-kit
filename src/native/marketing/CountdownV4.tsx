import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { CountdownProps } from './Countdown';

/** Drop-in for {@link CountdownProps} — same props, the V4 "showcase" design. */
export type CountdownV4Props = CountdownProps;

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const DEFAULT_LABELS = { days: 'Days', hours: 'Hours', minutes: 'Mins', seconds: 'Secs' };

/** Remaining time between now and `target`, clamped at zero. */
function computeParts(target: number): TimeParts {
  const diff = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff === 0,
  };
}

const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * Countdown — **V4** "showcase" design (native mirror of the web V4). Four big
 * extra-bold **tabular-nums** digit tiles (days/hrs/min/sec) seated in
 * **soft-primary wells** (`withAlpha(colors.primary, 0.06)`) with muted
 * uppercase labels — refined and high-impact without a brand gradient. The 1s
 * `setInterval` and `onComplete` fire-once behavior are preserved exactly from
 * the base (the digits are information, not decorative motion, so they keep
 * ticking under reduced motion). Same props/behavior as {@link CountdownProps};
 * token-only colors via `useXenitionTheme()`, dark-mode safe.
 */
export function CountdownV4({
  to,
  onComplete,
  labels = DEFAULT_LABELS,
  style,
}: CountdownV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const target = React.useMemo(() => new Date(to).getTime(), [to]);
  const [parts, setParts] = React.useState<TimeParts>(() => computeParts(target));
  const firedRef = React.useRef(false);

  React.useEffect(() => {
    firedRef.current = false;
    setParts(computeParts(target));

    const id = setInterval(() => {
      const next = computeParts(target);
      setParts(next);
      if (next.done && !firedRef.current) {
        firedRef.current = true;
        onComplete?.();
        clearInterval(id);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [target, onComplete]);

  const well = withAlpha(colors.primary, 0.06);

  const boxes: { value: number; label: string }[] = [
    { value: parts.days, label: labels.days },
    { value: parts.hours, label: labels.hours },
    { value: parts.minutes, label: labels.minutes },
    { value: parts.seconds, label: labels.seconds },
  ];

  return (
    <View
      testID="xen-countdown"
      accessibilityRole="text"
      style={[{ flexDirection: 'row', gap: tokens.spacing.md }, style]}
    >
      {boxes.map((box) => (
        <View
          key={box.label}
          style={{
            minWidth: 64,
            alignItems: 'center',
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: well,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.md,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: tokens.typography.scale['3xl'],
              fontWeight: '800',
              fontVariant: ['tabular-nums'],
            }}
          >
            {pad(box.value)}
          </Text>
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '500',
              textTransform: 'uppercase',
            }}
          >
            {box.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
