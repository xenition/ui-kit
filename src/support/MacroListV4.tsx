import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { activateOnKey } from './internal';
import type { MacroListProps } from './MacroList';

/** Drop-in for {@link MacroListProps} — same props, the V4 "calm console" design. */
export type MacroListV4Props = MacroListProps;

/**
 * MacroList — **V4** "calm console" design (web parity of the native V4). A tidy
 * list of macro rows, each a ≥44px `menuitem` with a leading soft-tint glyph disc
 * (one accent = primary), the macro name + optional description, and an
 * action-count run hint. Hover/focus paints a soft-primary tint; `disabled`
 * macros dim and stop responding. Activating reports the macro via `onApply`
 * (click + keyboard). Same props/behavior as {@link MacroListProps}; all colors
 * from `--xen-*` token classes (no literal hex). Dark-mode safe.
 */
export const MacroListV4 = React.forwardRef<HTMLDivElement, MacroListV4Props>(function MacroListV4(
  { macros, onApply, loading = false, emptyText = 'No macros available.', className, ...rest },
  ref
) {
  if (loading) {
    return (
      <div
        ref={ref}
        aria-label="Loading macros"
        aria-busy="true"
        className={cn('flex animate-pulse flex-col gap-2', className)}
        {...rest}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3">
            <span className="h-9 w-9 shrink-0 rounded-full bg-on-surface/10" />
            <span className="h-3 flex-1 rounded bg-on-surface/10" />
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
    <div ref={ref} role="menu" className={cn('flex flex-col gap-2', className)} {...rest}>
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
            onKeyDown={!isDisabled && onApply ? activateOnKey(() => onApply(macro)) : undefined}
            className={cn(
              'flex min-h-[44px] w-full items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 text-left shadow-sm',
              isDisabled
                ? 'opacity-50'
                : 'cursor-pointer hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
            )}
          >
            {/* Leading glyph disc — soft-primary tint, the calm-console signature. */}
            <span
              aria-hidden="true"
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base',
                isDisabled ? 'bg-muted/10 text-muted' : 'bg-primary/10 text-primary'
              )}
            >
              {macro.glyph ?? '⚡'}
            </span>
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
