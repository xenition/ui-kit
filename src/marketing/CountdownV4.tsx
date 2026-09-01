import * as React from 'react';
import { cn } from '../primitives/cn';
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
 * Countdown — **V4** "showcase" design (web parity of the native V4). Four big
 * extra-bold **tabular-nums** digit tiles (days/hrs/min/sec) seated in
 * **soft-primary wells** with muted uppercase labels — refined and high-impact
 * without a brand gradient. The 1s interval and `onComplete` fire-once behavior
 * are preserved exactly from the base; only the skin changes. Same
 * props/behavior as {@link CountdownProps}; every color is a `--xen-*` token
 * (`bg-primary-50`, `text-primary`, `text-muted`) — no literals.
 */
export const CountdownV4 = React.forwardRef<HTMLDivElement, CountdownV4Props>(function CountdownV4(
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
      className={cn('flex items-stretch gap-[var(--xen-space-md)]', className)}
      {...rest}
    >
      {boxes.map((box) => (
        <div
          key={box.label}
          data-xen-countdown-box=""
          className={cn(
            'flex min-w-[4rem] flex-col items-center gap-[var(--xen-space-xs)]',
            'rounded-[var(--xen-radius-lg)] border border-border bg-primary-50 shadow-sm',
            'px-[var(--xen-space-md)] py-[var(--xen-space-md)]'
          )}
        >
          <span className="font-heading text-3xl font-extrabold tabular-nums leading-none text-primary">
            {pad(box.value)}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-muted">{box.label}</span>
        </div>
      ))}
    </div>
  );
});
