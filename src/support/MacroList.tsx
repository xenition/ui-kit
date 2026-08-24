import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce';

export interface Macro {
  /** Stable id, returned to `onApply`. */
  id: string;
  /** Macro name (e.g. "Close + notify"). */
  name: string;
  /** Optional one-line description of what it does. */
  description?: string;
  /** Optional count of actions the macro runs. */
  actionCount?: number;
  /** Optional glyph/emoji leading the row. */
  glyph?: string;
  /** Mark unavailable (rendered dimmed, non-tappable). */
  disabled?: boolean;
}

export interface MacroListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The macros to list. */
  macros: Macro[];
  /** Fires with the macro when a row is activated. */
  onApply?: (macro: Macro) => void;
  /** Loading state (renders placeholder rows). */
  loading?: boolean;
  /** Text shown when the list is empty. */
  emptyText?: string;
}

/**
 * A list of agent macros (bundled actions that mutate a ticket) rendered as a
 * `menu` of native `<button>` `menuitem`s (click + keyboard for free). Each row
 * shows a glyph, name, optional description, and an action-count hint; activating
 * reports the macro via `onApply`. Handles `loading` (placeholder rows) and empty
 * (`EmptyState`) states, and disables `disabled` macros. Indexing is guarded and
 * colors come from token classes only.
 */
export const MacroList = React.forwardRef<HTMLDivElement, MacroListProps>(function MacroList(
  { macros, onApply, loading = false, emptyText = 'No macros available.', className, ...rest },
  ref
) {
  if (loading) {
    return (
      <div ref={ref} aria-label="Loading macros" aria-busy="true" className={cn('animate-pulse', className)} {...rest}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 border-b border-border p-3">
            <span className="h-6 w-6 rounded-md bg-neutral-100" />
            <span className="h-3 flex-1 rounded bg-neutral-100" />
          </div>
        ))}
      </div>
    );
  }

  if (macros.length === 0) {
    return (
      <div ref={ref} className={className} {...rest}>
        <EmptyState title={emptyText} className="border-0" />
      </div>
    );
  }

  return (
    <div ref={ref} role="menu" className={className} {...rest}>
      {macros.map((macro) => {
        const isDisabled = macro.disabled === true;
        const count =
          typeof macro.actionCount === 'number' && macro.actionCount > 0 ? macro.actionCount : undefined;
        return (
          <button
            key={macro.id}
            type="button"
            role="menuitem"
            aria-disabled={isDisabled}
            aria-label={`Apply macro ${macro.name}`}
            disabled={isDisabled || !onApply}
            onClick={onApply ? () => onApply(macro) : undefined}
            className={cn(
              'flex w-full items-center gap-3 border-b border-border p-3 text-left',
              isDisabled
                ? 'opacity-50'
                : 'hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            )}
          >
            <Icon glyph={macro.glyph ?? '⚡'} size="lg" color={isDisabled ? 'muted' : 'primary'} />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className={cn('truncate text-base font-semibold', isDisabled ? 'text-muted' : 'text-on-surface')}>
                {macro.name}
              </span>
              {macro.description ? (
                <span className="truncate text-xs text-muted">{macro.description}</span>
              ) : null}
            </span>
            {count !== undefined ? (
              <span className="shrink-0 text-xs text-muted">
                {count} action{count === 1 ? '' : 's'}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
});
