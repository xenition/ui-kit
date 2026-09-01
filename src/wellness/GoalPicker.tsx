import * as React from 'react';
import { cn } from '../primitives/cn';

export interface WellnessGoal {
  id: string;
  label: string;
  glyph?: string;
}

export interface GoalPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  goals: WellnessGoal[];
  selected: string[];
  onToggle: (id: string) => void;
  title?: string;
}

/**
 * GoalPicker — a wrap of selectable goal chips. Unselected chips are clean
 * (surface + border, on-surface text); color arrives only on the chosen ones,
 * which flip to the primary fill with on-primary text and a `✓`. Selection is
 * announced (`aria-pressed`) and marked with the check, so it never rests on
 * color alone. Token-only colors.
 */
export const GoalPicker = React.forwardRef<HTMLDivElement, GoalPickerProps>(function GoalPicker(
  { goals, selected, onToggle, title, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-md)]', className)} {...rest}>
      {title ? <p className="text-base font-bold text-on-surface">{title}</p> : null}

      <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
        {goals.map((goal) => {
          const isSelected = selected.includes(goal.id);
          return (
            <button
              key={goal.id}
              type="button"
              role="button"
              aria-pressed={isSelected}
              aria-label={goal.label}
              onClick={() => onToggle(goal.id)}
              className={cn(
                'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                isSelected
                  ? 'border-primary bg-primary font-bold text-on-primary'
                  : 'border-border bg-surface font-semibold text-on-surface'
              )}
            >
              {goal.glyph ? (
                <span aria-hidden="true">{goal.glyph}</span>
              ) : null}
              <span>{goal.label}</span>
              {isSelected ? (
                <span aria-hidden="true" className="font-bold text-on-primary">
                  ✓
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
});
