import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';

/**
 * A soft-primary quick-pick chip descriptor. When `active` the chip reads as a
 * filled soft-primary; otherwise it is a calm outlined affordance. Every color
 * traces to an `--xen-*` token class — no literals.
 */
export interface QuickAddChip {
  /** Visible chip label (e.g. a priority, a due date, a project name). */
  label: string;
  /** Optional leading glyph rendered before the label (decorative). */
  glyph?: string;
  /** Whether the chip currently reads as chosen (solid soft-primary). */
  active?: boolean;
}

export interface QuickAddTaskProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current composer text (controlled). */
  value: string;
  /**
   * Fires with the next text on every keystroke — the primary controlled
   * change handler (native-parity name). Prefer this over {@link onChange}.
   */
  onChangeText: (text: string) => void;
  /**
   * Web-idiomatic change handler, fired alongside {@link onChangeText} with the
   * raw input event. Optional convenience for form libraries.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Placeholder shown when the field is empty. Defaults to `'Add a task…'`. */
  placeholder?: string;
  /** Fires when the task is submitted (Add button or Enter) with the trimmed text. */
  onAdd?: (text: string) => void;
  /** When set, the Add button shows a busy state and submission is blocked. */
  adding?: boolean;
  /** Accessible label for the text field. Defaults to `'Add a task'`. */
  label?: string;
  /** Label for the primary Add button. Defaults to `'Add'`. */
  addLabel?: string;
  /** Leading composer glyph (the calm ⊕/checkbox affordance). Defaults to `'⊕'`. */
  glyph?: string;
  /** Priority quick-pick chip; omit to hide it. */
  priority?: QuickAddChip;
  /** Fires when the priority chip is pressed. */
  onPriority?: () => void;
  /** Due-date quick-pick chip; omit to hide it. */
  dueLabel?: QuickAddChip;
  /** Fires when the due-date chip is pressed. */
  onDue?: () => void;
  /** Project quick-pick chip; omit to hide it. */
  projectLabel?: QuickAddChip;
  /** Fires when the project chip is pressed. */
  onProject?: () => void;
}

/** A single soft-primary quick-pick chip. Active = filled soft-primary; idle = outlined. */
function Chip({
  chip,
  onPress,
}: {
  chip: QuickAddChip;
  onPress?: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      aria-pressed={chip.active ?? false}
      onClick={onPress}
      disabled={!onPress}
      className={cn(
        'inline-flex min-h-[32px] items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold transition-colors',
        'disabled:cursor-default',
        chip.active
          ? 'bg-primary/[0.14] text-primary-text'
          : 'border border-border bg-surface text-muted-text hover:bg-primary/[0.08]'
      )}
    >
      {chip.glyph ? <span aria-hidden>{chip.glyph}</span> : null}
      {chip.label}
    </button>
  );
}

/**
 * QuickAddTask — **V4** "flow" quick-add composer (web parity of the native
 * twin). A calm, rounded, elevated surface: a leading ⊕ glyph seated in a
 * **soft-primary disc**, a big legible controlled text input, a row of
 * soft-primary quick-pick chips (priority / due / project), and one **primary**
 * Add button (≥44px, disabled while empty or `adding`). Controlled — the caller
 * owns `value` and is handed the next text via `onChangeText`; `onAdd` fires on
 * the button or Enter with the trimmed value. Presentational only. All colors
 * from `--xen-*` token classes — no literals.
 */
export const QuickAddTask = React.forwardRef<HTMLDivElement, QuickAddTaskProps>(function QuickAddTask(
  {
    value,
    onChangeText,
    onChange,
    placeholder = 'Add a task…',
    onAdd,
    adding = false,
    label = 'Add a task',
    addLabel = 'Add',
    glyph = '⊕',
    priority,
    onPriority,
    dueLabel,
    onDue,
    projectLabel,
    onProject,
    className,
    ...rest
  },
  ref
) {
  const trimmed = value.trim();
  const canAdd = trimmed.length > 0 && !adding;
  const hasChips = Boolean(priority || dueLabel || projectLabel);

  const submit = (): void => {
    if (canAdd) onAdd?.(trimmed);
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-card p-3 shadow-sm',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/[0.14] text-xl text-primary-text"
        >
          {glyph}
        </span>

        <input
          type="text"
          role="textbox"
          aria-label={label}
          value={value}
          placeholder={placeholder}
          disabled={adding}
          onChange={(e) => {
            onChangeText(e.currentTarget.value);
            onChange?.(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              submit();
            }
          }}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-base font-medium text-on-card outline-none',
            'placeholder:text-muted disabled:opacity-50'
          )}
        />

        <Button
          type="button"
          onClick={submit}
          disabled={!canAdd}
          aria-label={addLabel}
          className="min-h-[44px] min-w-[44px]"
        >
          {addLabel}
        </Button>
      </div>

      {hasChips ? (
        <div className="flex flex-wrap items-center gap-2 pl-14">
          {priority ? <Chip chip={priority} onPress={onPriority} /> : null}
          {dueLabel ? <Chip chip={dueLabel} onPress={onDue} /> : null}
          {projectLabel ? <Chip chip={projectLabel} onPress={onProject} /> : null}
        </div>
      ) : null}
    </div>
  );
});
