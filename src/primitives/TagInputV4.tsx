import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from './internal/v4-state';
import { cn } from './cn';
import type { TagInputProps } from './TagInput';
import { PICKER_V4_CSS } from './internal/picker-v4';

export type { TagInputProps as TagInputV4Props };

/**
 * The wrapper's own class list.
 *
 * It mirrors `FIELD_CLASS`'s metrics — the same minimum height, padding scale
 * and `md` radius `InputV4` uses — but sets its own flex directives, because a
 * tag field wraps to as many rows as the tags need and `cn()` is a plain join
 * with no conflict resolution.
 */
const WRAP_CLASS = [
  'flex w-full flex-wrap items-center gap-xs bg-surface text-on-surface',
  'min-h-[var(--xen-space-2xl)] px-md py-xs text-base',
  'border rounded-[var(--xen-radius-md)]',
].join(' ');

/**
 * **V4 tag input** — the web twin of `TagInputV4`, the same props as
 * {@link TagInput}, a different design line.
 *
 * ## The duplicate was the bug
 *
 * Type a tag you already have and the base clears the field and does nothing
 * else. From the outside that is indistinguishable from the app dropping your
 * input: you typed something, it vanished, no tag appeared. §38 is explicit
 * that an error state has to help you recover, and the recovery here is simply
 * being told what happened.
 *
 * So V4 **keeps what you typed** and says `“React” is already added` under the
 * field, in a polite live region. Nothing is lost, the reason is on screen, and
 * the message clears itself the moment you change the text. `dedupe={false}`
 * still turns the whole rule off.
 *
 * ## The remove ✕ was the other one
 *
 * A chip's ✕ is necessarily small — it lives inside a 32px chip — and the base
 * gives it no padding at all, so roughly a 16px target sitting next to other
 * chips' ✕s. `data-xen-v4-hit` centres an invisible `--xen-space-2xl`
 * pseudo-element on it: out of flow, costing no layout, the web's `hitSlop`.
 *
 * ## The rest
 *
 * The wrapper wears `InputV4`'s metrics and the same `box-shadow` halo, armed
 * on `:focus-within`. Chips are `accent`/`on-accent`, a pair the compiler
 * contrast-checks, at `text-sm` rather than `text-xs`: a tag is a thing you
 * have to be able to read, not a decoration.
 */
export function TagInputV4({
  value = [],
  onChange,
  placeholder = 'Add a tag…',
  dedupe = true,
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Add a tag',
  className,
}: TagInputProps): React.ReactElement {
  injectStyleOnce('xen-v4-picker-styles', PICKER_V4_CSS);
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  const [draft, setDraft] = React.useState('');
  // What went wrong last time, in words. Cleared by the next keystroke.
  const [notice, setNotice] = React.useState<string | null>(null);
  const noticeId = React.useId();

  const add = (): void => {
    const t = draft.trim();
    if (!t) return;
    if (dedupe && value.some((v) => v.toLowerCase() === t.toLowerCase())) {
      // The draft is NOT cleared: losing what someone typed to tell them
      // nothing is the failure §38 is about.
      setNotice(`“${t}” is already added`);
      return;
    }
    onChange?.([...value, t]);
    setDraft('');
    setNotice(null);
  };

  const removeAt = (index: number): void => {
    onChange?.(value.filter((_, i) => i !== index));
    setNotice(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      add();
    } else if (e.key === 'Backspace' && draft.length === 0 && value.length > 0) {
      removeAt(value.length - 1);
    }
  };

  return (
    <div className={cn('grid gap-sm', className)}>
      <div
        data-xen-v4-field={invalid ? 'invalid' : ''}
        className={cn(WRAP_CLASS, disabled && 'pointer-events-none opacity-[0.38]')}
        style={
          {
            '--xen-v4-ring-color': invalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
          } as React.CSSProperties
        }
      >
        {value.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className={cn(
              'flex items-center gap-xs rounded-[var(--xen-radius-full)] px-sm',
              'h-[var(--xen-space-xl)] bg-accent text-sm text-on-accent'
            )}
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              disabled={disabled}
              onClick={() => removeAt(i)}
              // The glyph stays chip-sized; only the touch area reaches the
              // floor, so the chip does not grow to accommodate it.
              data-xen-v4-hit=""
              data-xen-v4-state=""
              className="rounded-[var(--xen-radius-full)] text-xs text-on-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-accent"
            >
              ✕
            </button>
          </span>
        ))}

        <input
          aria-label={accessibilityLabel}
          aria-invalid={invalid || undefined}
          aria-describedby={notice !== null ? noticeId : undefined}
          value={draft}
          disabled={disabled}
          onChange={(e) => {
            setDraft(e.target.value);
            setNotice(null);
          }}
          onKeyDown={onKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          className={cn(
            'h-[var(--xen-space-xl)] min-w-[var(--xen-space-2xl)] flex-grow',
            'bg-transparent text-base text-on-surface placeholder:text-muted-text focus:outline-none'
          )}
        />
      </div>

      {notice !== null ? (
        <p id={noticeId} role="status" className="text-sm text-muted-text">
          {notice}
        </p>
      ) : null}
    </div>
  );
}
