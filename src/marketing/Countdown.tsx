import * as React from 'react';
import { cn } from '../primitives/cn';

export interface CountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Target date/time to count down to. */
  to: Date | string;
  /** Fired once when the countdown reaches zero. */
  onComplete?: () => void;
  /** Labels for the four boxes. */
  labels?: { days: string; hours: string; minutes: string; seconds: string };
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

/** Counts down to a target date/time in days/hours/mins/secs boxes; cleans up its interval on unmount. */
export const Countdown = React.forwardRef<HTMLDivElement, CountdownProps>(function Countdown(
  { to, onComplete, labels = DEFAULT_LABELS, className, ...rest },
  ref
) {
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
    <div
      ref={ref}
      data-xen-countdown=""
      role="timer"
      aria-live="polite"
      className={cn('flex items-stretch gap-[var(--xen-space-sm)]', className)}
      {...rest}
    >
      {boxes.map((box) => (
        <div
          key={box.label}
          data-xen-countdown-box=""
          className="flex min-w-[3.5rem] flex-col items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-md)] text-on-surface"
        >
          <span className="font-heading text-2xl font-bold tabular-nums">{pad(box.value)}</span>
          <span className="text-xs uppercase tracking-wide text-muted">{box.label}</span>
        </div>
      ))}
    </div>
  );
});
