import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { ButtonV4 } from '../primitives/ButtonV4';
import { SearchInputV4 } from '../primitives/SearchInputV4';
import { cn } from '../primitives/cn';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { JobFilterBarProps } from './JobFilterBar';
import { EMPLOYMENT_LABEL, EMPLOYMENT_TYPES } from './types';
import { cardStateVars, FOCUS_RING_CLASS, MIN_TAP_CLASS, TABULAR_CLASS } from './internal/tone-v4';

export interface JobFilterBarV4Props extends JobFilterBarProps {
  /** Placeholder in the search field. Default `'Search jobs, companies, skills…'`. */
  searchPlaceholder?: string;
  /** Render the result count. Default `'3 results'` / `'1 result'`. */
  formatResultCount?: (n: number) => string;
  /** Said instead of a count when nothing matched. Default `'No matching jobs'`. */
  emptyLabel?: string;
}

/**
 * **V4 job filter bar** — same props as {@link JobFilterBar} plus
 * `searchPlaceholder`, `formatResultCount` and `emptyLabel`.
 *
 * ## Five changes
 *
 * 1. **"Clear" stops being a red alarm.** The base built it out of
 *    `SkillTag variant="missing"` — the variant that means *this skill is
 *    required and you do not have it* — so the one control on the bar that
 *    undoes a mistake rendered as a solid danger-red chip labelled "! Clear",
 *    the loudest thing on the screen. It is a quiet outline action now, and
 *    the chips no longer borrow `matched`/`missing` to express selection
 *    either: a filter being on is not a fact about your résumé.
 * 2. **The chips are tappable.** They were `SkillTag`s at `py-[3px]` around a
 *    12px label — about 20 CSS pixels tall — and they are the most-tapped
 *    control in the whole module. They clear 44 now, which is also what makes
 *    them look like the rest of the V4 line's chips.
 * 3. **`resultCount={0}` is finally announced.** The base tested
 *    `typeof resultCount === 'number'` and rendered `'0 results'` — true, but
 *    silently, in `text-muted` at the end of a row nobody is looking at, and
 *    with no live region, so a screen-reader user who narrowed a filter to
 *    nothing got no feedback at all. Zero now says `emptyLabel` in a polite
 *    live region: the count changes because of something the user just did,
 *    and it is the answer to what they did.
 * 4. **The counts are translatable and correctly plural.** `${n} result${n
 *    === 1 ? '' : 's'}` was hard-coded in a component with no formatter prop,
 *    as was the search placeholder.
 * 5. **The chips press with a state layer** against the fill they actually
 *    wear, rather than `hover:opacity-90`, and the count line takes
 *    `muted-text` rather than the `muted` fill slot.
 */
export const JobFilterBarV4 = React.forwardRef<HTMLDivElement, JobFilterBarV4Props>(
  function JobFilterBarV4(
    {
      types = EMPLOYMENT_TYPES,
      active = [],
      onToggleType,
      query,
      onQueryChange,
      onClear,
      resultCount,
      searchPlaceholder = 'Search jobs, companies, skills…',
      formatResultCount,
      emptyLabel = 'No matching jobs',
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const activeSet = new Set(active);
    const showSearch = query != null || onQueryChange != null;

    const count =
      typeof resultCount === 'number' && Number.isFinite(resultCount)
        ? Math.max(0, Math.floor(resultCount))
        : undefined;
    const countText =
      count === undefined
        ? undefined
        : count === 0
          ? emptyLabel
          : (formatResultCount ?? ((n: number) => `${n} result${n === 1 ? '' : 's'}`))(count);

    return (
      <div
        ref={ref}
        data-xen-v4-job-filter-bar=""
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        {showSearch ? (
          <SearchInputV4
            value={query ?? ''}
            onChangeText={onQueryChange}
            placeholder={searchPlaceholder}
            accessibilityLabel="Search jobs"
          />
        ) : null}

        <div className="flex flex-wrap items-center gap-sm">
          <div
            role="group"
            aria-label="Filter by employment type"
            className="flex flex-1 flex-wrap items-center gap-xs"
          >
            {types.map((t) => {
              const on = activeSet.has(t);
              const skin = cn(
                'inline-flex shrink-0 items-center justify-center px-md',
                'rounded-[var(--xen-radius-full)] border text-xs',
                on
                  ? 'border-primary bg-primary font-semibold text-on-primary'
                  : 'border-border bg-card font-medium text-on-card'
              );

              // No handler means the bar is showing a filter, not offering
              // one. A focusable control that does nothing when pressed is
              // the defect `CompanyCard` shipped; a `disabled` one announces
              // "unavailable", which is not true either. So: not a control.
              if (onToggleType == null) {
                return (
                  <span key={t} className={cn(skin, 'py-xs')}>
                    {EMPLOYMENT_LABEL[t]}
                    {on ? <span className="sr-only">{', selected'}</span> : null}
                  </span>
                );
              }

              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onToggleType(t)}
                  data-xen-v4-state=""
                  style={cardStateVars(
                    on ? 'var(--xen-primary)' : 'var(--xen-card)',
                    on ? 'var(--xen-on-primary)' : 'var(--xen-on-card)'
                  )}
                  className={cn(skin, MIN_TAP_CLASS, FOCUS_RING_CLASS)}
                >
                  {EMPLOYMENT_LABEL[t]}
                </button>
              );
            })}

            {/*
              An escape hatch, not an alarm. `SkillTag variant="missing"` made
              it a solid danger chip with a "!" in front of it.
            */}
            {activeSet.size > 0 && onClear ? (
              <ButtonV4 variant="outline" size="sm" onClick={onClear} className={MIN_TAP_CLASS}>
                Clear
              </ButtonV4>
            ) : null}
          </div>

          {countText !== undefined ? (
            <span
              role="status"
              aria-live="polite"
              className={cn('whitespace-nowrap text-xs text-muted-text', TABULAR_CLASS)}
            >
              {countText}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);
