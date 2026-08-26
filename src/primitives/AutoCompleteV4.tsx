import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import type { AutoCompleteOption, AutoCompleteProps } from './AutoComplete';
import { cn } from './cn';
import { FIELD_CLASS, PICKER_V4_CSS, useDepth } from './internal/picker-v4';
import { useDismiss } from './useDismiss';

export type { AutoCompleteProps as AutoCompleteV4Props, AutoCompleteOption };

/**
 * Split a label around the first case-insensitive occurrence of `query`.
 * Returns `[before, match, after]`, with `match` empty when there is no hit.
 */
function splitMatch(label: string, query: string): [string, string, string] {
  const q = query.trim();
  if (!q) return [label, '', ''];
  const at = label.toLowerCase().indexOf(q.toLowerCase());
  if (at < 0) return [label, '', ''];
  return [label.slice(0, at), label.slice(at, at + q.length), label.slice(at + q.length)];
}

/**
 * **V4 autocomplete** — the web twin of `AutoCompleteV4`, the same props as
 * {@link AutoComplete}, a different design line.
 *
 * ## Four things that make a suggestion list feel confident
 *
 * 1. **Rows at the tap-target floor.** `--xen-space-2xl`, where the base is
 *    `py-sm` around a line of text. In a list where every neighbour is a wrong
 *    answer, the floor matters more than anywhere else in the kit.
 * 2. **The match, marked.** The part of each label that matched what you typed
 *    is bolded — the answer to "why is this in the list", and what lets the eye
 *    confirm a row without reading it (§33 — optimise for scanning; §32 —
 *    recognition over recall).
 * 3. **A list that says when it is empty.** The base hides itself when nothing
 *    matches, which is indistinguishable from being broken. V4 keeps the panel
 *    and says so, quoting the query back (§37 — make system status visible;
 *    §15 — an empty state should tell the user where they are).
 * 4. **A keyboard that works.** The base is `role="combobox"` with
 *    `aria-autocomplete="list"` and no key handling at all: the contract says
 *    "arrow through these" and nothing happens. ↑/↓ move the active option,
 *    Enter takes it, Escape closes — and `aria-activedescendant` points at the
 *    live row, so a screen reader is told which one it is. Familiar
 *    interactions (§31) only count when they actually work.
 *
 * ## The field and the panel
 *
 * The field is `InputV4`'s: same minimum height, same `md` radius, and the same
 * `box-shadow` halo armed on `:focus-within`. The panel floats on
 * `--xen-elevation-card` with its hairline kept, and takes glass only when the
 * seed asked for `depth: 'glass'`. Hover is a `color-mix` against
 * `--xen-surface`, never `hover:bg-neutral-100`, which is a light-oriented ramp
 * step in both schemes.
 */
export function AutoCompleteV4({
  options,
  value = '',
  onChange,
  onSelect,
  placeholder = 'Type to search…',
  maxResults = 6,
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Autocomplete',
  className,
}: AutoCompleteProps): React.ReactElement {
  injectStyleOnce('xen-v4-picker-styles', PICKER_V4_CSS);
  const glass = useDepth() === 'glass';
  const [focused, setFocused] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const ref = useDismiss<HTMLDivElement>(focused, () => setFocused(false));
  const listId = React.useId();

  const query = value.trim();
  const matches = React.useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, maxResults);
  }, [options, query, maxResults]);

  // The panel opens as soon as there is something to say — including that
  // there is nothing to say.
  const showPanel = focused && query.length > 0;

  // A new query means a new list; the highlight goes back to the top rather
  // than pointing at whatever happens to be in that slot now.
  React.useEffect(() => setActive(0), [query]);

  const choose = (opt: AutoCompleteOption): void => {
    onChange?.(opt.label);
    onSelect?.(opt);
    setFocused(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!showPanel || matches.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % matches.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + matches.length) % matches.length);
    } else if (e.key === 'Enter') {
      const opt = matches[active];
      if (opt) {
        e.preventDefault();
        choose(opt);
      }
    } else if (e.key === 'Escape') {
      setFocused(false);
    }
  };

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <div
        data-xen-v4-field={invalid ? 'invalid' : ''}
        className={cn(FIELD_CLASS, disabled && 'pointer-events-none opacity-[0.38]')}
        style={
          {
            '--xen-v4-ring-color': invalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
          } as React.CSSProperties
        }
      >
        <input
          role="combobox"
          aria-label={accessibilityLabel}
          aria-expanded={showPanel}
          aria-controls={showPanel ? listId : undefined}
          aria-activedescendant={
            showPanel && matches.length > 0 ? `${listId}-${active}` : undefined
          }
          aria-autocomplete="list"
          aria-invalid={invalid || undefined}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-base text-on-surface placeholder:text-muted-text focus:outline-none"
        />
      </div>

      {showPanel ? (
        <div
          data-xen-v4-pop="card"
          data-glass={glass ? 'true' : undefined}
          className="absolute z-50 mt-xs w-full overflow-hidden"
        >
          {matches.length === 0 ? (
            <p role="status" className="px-md py-md text-sm text-muted-text">
              {`No matches for “${query}”`}
            </p>
          ) : (
            <div
              role="listbox"
              id={listId}
              aria-label="Suggestions"
              className="max-h-[calc(var(--xen-space-2xl)_*_5)] overflow-auto"
            >
              {matches.map((opt, i) => {
                const [before, hit, after] = splitMatch(opt.label, query);
                return (
                  <div
                    key={opt.value}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    data-xen-v4-hover=""
                    // The keyboard's active row takes the same wash the
                    // pointer's hover does, so the two never disagree.
                    data-xen-v4-active={i === active ? 'true' : 'false'}
                    // Mousedown, so the input's blur does not close the list first.
                    onMouseDown={(e) => {
                      e.preventDefault();
                      choose(opt);
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      'flex min-h-[var(--xen-space-2xl)] cursor-pointer items-center px-md',
                      'text-base text-on-surface'
                    )}
                  >
                    <span className="truncate">
                      {before}
                      {/* The reason this row is here, made visible. */}
                      <strong className="font-bold">{hit}</strong>
                      {after}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
