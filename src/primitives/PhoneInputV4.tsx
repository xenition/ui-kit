import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import {
  FIELD_V4_CSS,
  FIELD_V4_SHELL,
  FIELD_V4_STYLE_ID,
  fieldBorderClass,
  fieldRingVars,
} from './internal/field-v4';
import type { PhoneInputProps } from './PhoneInput';

export type { PhoneInputProps as PhoneInputV4Props };

/** Strip to digits, cap at 10, format as `(NNN) NNN-NNNN` progressively. */
function formatUsPhone(digits: string): string {
  const d = digits.replace(/\D/g, '').slice(0, 10);
  if (d.length === 0) return '';
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/**
 * **V4 phone field** — the same props as {@link PhoneInput}, a different design
 * line.
 *
 * The mask is the good idea the base already had: the field shows
 * `(555) 123-4567` while `onChangeText` reports only `5551234567`, so the
 * caller never has to strip punctuation it did not ask for. §31 asks for
 * familiar interactions, and a phone number that formats itself as you type is
 * the most familiar input mask there is. V4 keeps it exactly, `autoComplete`
 * and `inputMode` included.
 *
 * What changes:
 *
 * 1. **It is a field like the others.** `FIELD_V4_SHELL` — the same height,
 *    radius and padding `InputV4` and `SelectV4` take — so a phone number under
 *    an email field shares its edge (§13).
 * 2. **Tabular figures.** A masked number is read in groups, and equal-width
 *    figures keep the groups the same width as the digits change, so the number
 *    stops shuffling under the caret while it is being typed (§36.11) and a
 *    column of them scans (§33).
 * 3. **A real focus ring, and a divider that is a divider.** The halo rings the
 *    whole control on `:focus-within`, country code included, because the code
 *    is part of the control. The code is separated by a `border-border`
 *    hairline — the same one the field's own edge uses — so the two parts read
 *    as one control with two jobs (§9, spacing as structure).
 *
 * The country code is `text-muted-text`: it is context, not content, and the number
 * is the thing being read (§6). No gradient, no glass, no shadow — §16 asks
 * that forms stay minimal.
 */
export const PhoneInputV4 = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInputV4(
    {
      value = '',
      onChangeText,
      countryCode = '+1',
      placeholder = '(555) 123-4567',
      invalid = false,
      disabled = false,
      accessibilityLabel = 'Phone number',
      className,
    },
    ref
  ) {
    injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);

    const handle = (text: string): void => {
      onChangeText?.(text.replace(/\D/g, '').slice(0, 10));
    };

    return (
      <div
        data-xen-v4-shell=""
        className={cn(
          FIELD_V4_SHELL,
          fieldBorderClass(invalid),
          'flex items-center gap-sm',
          disabled && 'pointer-events-none opacity-[0.38]',
          className
        )}
        style={fieldRingVars(invalid)}
      >
        <span className="border-r border-border pr-sm text-base tabular-nums text-muted-text">
          {countryCode}
        </span>
        <input
          ref={ref}
          type="tel"
          inputMode="tel"
          aria-label={accessibilityLabel}
          aria-invalid={invalid || undefined}
          value={formatUsPhone(value)}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="tel"
          onChange={(e) => handle(e.target.value)}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-base text-on-surface',
            'tabular-nums placeholder:text-muted-text'
          )}
        />
      </div>
    );
  }
);
