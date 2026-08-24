import * as React from 'react';
import { Button, type ButtonSize, type ButtonVariant, Spinner } from '../primitives';
import { cn } from '../primitives/cn';
import type { ApplyState } from './types';

export interface ApplyButtonProps {
  /** Current application state. Drives the label, variant, and callback. */
  state?: ApplyState;
  /** Fired to submit an application (`apply` state) or re-apply (`withdrawn`). */
  onApply?: () => void;
  /** Fired to withdraw a submitted application (`applied` state). */
  onWithdraw?: () => void;
  /** Show a spinner and block presses. */
  loading?: boolean;
  disabled?: boolean;
  size?: ButtonSize;
  /** Fill the available width. */
  block?: boolean;
  className?: string;
}

interface StateConfig {
  label: string;
  variant: ButtonVariant;
  onClick?: () => void;
  a11y: string;
}

/**
 * The apply / applied / withdrawn call-to-action for a job. A thin, stateful
 * wrapper over the primitive `Button`:
 * - `apply` → primary "Apply", presses call `onApply`.
 * - `applied` → secondary "Applied ✓", presses call `onWithdraw` (undo).
 * - `withdrawn` → ghost "Re-apply", presses call `onApply` again.
 * The accessible label always names the state so it is not conveyed by variant
 * color alone. Colors come from the `Button` primitive's tokens.
 */
export const ApplyButton = React.forwardRef<HTMLButtonElement, ApplyButtonProps>(
  function ApplyButton(
    { state = 'apply', onApply, onWithdraw, loading = false, disabled = false, size = 'md', block = false, className },
    ref
  ) {
    const config: StateConfig = {
      apply: { label: 'Apply', variant: 'primary' as const, onClick: onApply, a11y: 'Apply to this job' },
      applied: {
        label: 'Applied ✓',
        variant: 'secondary' as const,
        onClick: onWithdraw,
        a11y: 'Applied — press to withdraw',
      },
      withdrawn: {
        label: 'Re-apply',
        variant: 'ghost' as const,
        onClick: onApply,
        a11y: 'Application withdrawn — press to re-apply',
      },
    }[state];

    return (
      <Button
        ref={ref}
        variant={config.variant}
        size={size}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        onClick={config.onClick}
        aria-label={config.a11y}
        className={cn(block && 'w-full', className)}
      >
        {loading ? <Spinner size="sm" className="mr-2" /> : null}
        {config.label}
      </Button>
    );
  }
);
