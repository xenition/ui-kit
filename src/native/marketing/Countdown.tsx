import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface CountdownProps {
  /** Target date/time to count down to. */
  to: Date | string;
  /** Fired once when the countdown reaches zero. */
  onComplete?: () => void;
  /** Labels for the four boxes. */
  labels?: { days: string; hours: string; minutes: string; seconds: string };
  style?: StyleProp<ViewStyle>;
}

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
 * Counts down to a target date/time in days/hours/mins/secs boxes — the native
 * mirror of the web `Countdown`. A 1s `setInterval` ticks the display and is
 * cleaned up on unmount. The time text is information (not motion), so the
 * interval still runs under reduced motion — only decorative animation would be
 * gated. Token-only — box surface/border/text all trace to theme tokens.
 */
export function Countdown({
  to,
  onComplete,
  labels = DEFAULT_LABELS,
  style,
}: CountdownProps): React.ReactElement {
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
      style={[{ flexDirection: 'row', gap: tokens.spacing.sm }, style]}
    >
      {boxes.map((box) => (
        <View
          key={box.label}
          style={{
            minWidth: 56,
            alignItems: 'center',
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.md,
          }}
        >
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale['2xl'],
              fontWeight: '700',
            }}
          >
            {pad(box.value)}
          </Text>
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
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
