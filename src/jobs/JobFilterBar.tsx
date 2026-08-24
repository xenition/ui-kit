import * as React from 'react';
import { SearchInput } from '../primitives';
import { cn } from '../primitives/cn';
import type { EmploymentType } from './types';
import { EMPLOYMENT_LABEL, EMPLOYMENT_TYPES } from './types';
import { SkillTag } from './SkillTag';

export interface JobFilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which employment-type chips to show. Defaults to all four. */
  types?: readonly EmploymentType[];
  /** Currently active types. */
  active?: EmploymentType[];
  /** Fired when a type chip is toggled. */
  onToggleType?: (type: EmploymentType) => void;
  /** Search query (controlled); shows a search field when provided. */
  query?: string;
  /** Fired as the search query changes. */
  onQueryChange?: (query: string) => void;
  /** Fired when the "Clear" chip is pressed (shown when any filter is active). */
  onClear?: () => void;
  /** Optional result-count hint rendered to the right. */
  resultCount?: number;
}

/**
 * A filter bar for a job list: an optional search field plus a wrapping row of
 * employment-type chips (`SkillTag`s) that toggle on/off, and a "Clear" chip
 * once anything is active. Controlled — the app owns `active` and `query` and
 * reacts to the callbacks. Selected chips carry a token outline + a ✓ marker
 * (not color alone). Tokens only.
 */
export const JobFilterBar = React.forwardRef<HTMLDivElement, JobFilterBarProps>(
  function JobFilterBar(
    { types = EMPLOYMENT_TYPES, active = [], onToggleType, query, onQueryChange, onClear, resultCount, className, ...rest },
    ref
  ) {
    const activeSet = new Set(active);
    const showSearch = query != null || onQueryChange != null;

    return (
      <div ref={ref} data-xen-job-filter-bar="" className={cn('flex flex-col gap-sm', className)} {...rest}>
        {showSearch ? (
          <SearchInput
            value={query ?? ''}
            onChangeText={onQueryChange}
            placeholder="Search jobs, companies, skills…"
            accessibilityLabel="Search jobs"
          />
        ) : null}

        <div className="flex items-center gap-sm">
          <div role="group" aria-label="Filter by employment type" className="flex flex-1 flex-wrap items-center gap-xs">
            {types.map((t) => {
              const on = activeSet.has(t);
              return (
                <SkillTag
                  key={t}
                  label={EMPLOYMENT_LABEL[t]}
                  variant={on ? 'matched' : 'default'}
                  selected={on}
                  onClick={onToggleType ? () => onToggleType(t) : undefined}
                />
              );
            })}
            {activeSet.size > 0 && onClear ? (
              <SkillTag label="Clear" variant="missing" onClick={onClear} />
            ) : null}
          </div>

          {typeof resultCount === 'number' ? (
            <span className="whitespace-nowrap text-xs text-muted">
              {`${resultCount} result${resultCount === 1 ? '' : 's'}`}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);
