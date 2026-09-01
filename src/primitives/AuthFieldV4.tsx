import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { IconV4 } from './IconV4';
import { TextV4 } from './TextV4';
import {
  FIELD_V4_CSS,
  FIELD_V4_SHELL,
  FIELD_V4_STYLE_ID,
  fieldBorderClass,
  fieldRingVars,
} from './internal/field-v4';
import { V4_DISABLED_SOFT_CLASS } from './internal/v4-state';
import type { AuthFieldProps } from './AuthCard';

/*
  §10.1 permits a named 44 with a comment: it is the platform floor for an
  *incidental* tap target — the password eye, the clear ✕ — and it is geometry,
  not theme. There is no "tap target" token and inventing one would push a
  platform constant into the brand seed.

  Written out as a whole Tailwind literal rather than assembled from the number,
  because Tailwind's content scanner reads source text. `min-h-11` / `min-w-11`
  are 2.75rem — the same 44 the auth family already spells this way.

  The field's own height is NOT here: it comes from `FIELD_V4_SHELL`, which is
  the whole point of the shared module.
*/
const TAP_TARGET = 'min-h-11 min-w-11';

/** The inline eye/clear buttons: same box, same ring recipe, same state layer. */
const INLINE_ACTION = cn(
  'flex shrink-0 items-center justify-center',
  'rounded-[var(--xen-radius-full)] focus-visible:outline-none',
  TAP_TARGET
);

export interface AuthFieldV4Props extends AuthFieldProps {
  /**
   * Adds the trailing clear `✕` once there is something to clear (§6's
   * "trailing affordance **where it earns one**" — a ✕ over an empty field is
   * the hole §10.6 forbids, so it is not drawn until the field has text).
   */
  clearable?: boolean;
  /** Announced label for the clear affordance. Default `'Clear'`. */
  clearLabel?: string;
  /** Fires after the field has been emptied by the clear affordance. */
  onClear?: () => void;
}

/**
 * **V4 auth input** — the web twin of the native `AuthFieldV4`, the same props
 * as the auth family's {@link AuthField} plus an optional clear affordance.
 *
 * Four things separate it from the base:
 *
 * 1. **It is a field like every other V4 field.** Height, radius, horizontal
 *    padding, border colour and ring all come from `internal/field-v4` —
 *    `spacing['2xl']` tall on `radius.md`, which the Addendum settled as the
 *    line's answer over §6's written 56/`radius.lg`. Nothing is picked here, so
 *    a sign-in field stacked above an `InputV4` or a `SelectV4` shares an edge
 *    and a `sharp` seed squares all three together.
 * 2. **A real focus ring, not a border swap.** The shell carries
 *    `data-xen-v4-shell`, so focusing anywhere inside it — the text, the eye,
 *    the ✕ — raises the border to `ring` *and* paints a translucent halo around
 *    the whole control. Drawn with `box-shadow`, so arming it costs no layout
 *    and focus never nudges the form (§36.11).
 * 3. **An error state that says something.** `error` turns the border and the
 *    ring `danger` **and** prints the message underneath in `dangerText`,
 *    wired to the input by `aria-describedby`. A red border alone is invisible
 *    to a colour-blind user, which is why the Addendum lets a field-shaped V4
 *    keep `error` at the cost of strict prop parity — and why the message is
 *    the state, not a decoration on it.
 * 4. **Affordances a thumb can actually hit.** The eye and the ✕ are 44 boxes
 *    with their own focus ring, instead of a bare glyph.
 *
 * Everything else is the base's contract, unchanged: a muted leading icon, a
 * `muted` placeholder that is never a faked label (§6), `hint` below when there
 * is no error, `trailing` for a caller's own affordance. No gradient, no glass,
 * no shadow — §16 asks that forms stay minimal, and a sign-in field is not a
 * hero.
 */
export const AuthFieldV4 = React.forwardRef<HTMLInputElement, AuthFieldV4Props>(
  function AuthFieldV4(
    {
      label,
      icon,
      error,
      hint,
      secure = false,
      trailing,
      disabled = false,
      onChangeText,
      onChange,
      inputType = 'text',
      className,
      showLabel = 'Show password',
      hideLabel = 'Hide password',
      clearable = false,
      clearLabel = 'Clear',
      onClear,
      id,
      value,
      defaultValue,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);

    const reactId = React.useId();
    const inputId = id ?? `${reactId}-field`;
    const messageId = `${reactId}-message`;

    const [visible, setVisible] = React.useState(false);

    // The error message IS the invalid state; one flag is how the border, the
    // ring and the copy can never disagree.
    const invalid = Boolean(error);

    // Whether the field has anything in it — the only thing the ✕ depends on.
    // Seeded from whichever of the controlled/uncontrolled values was given,
    // and re-synced when a controlled caller changes it from outside.
    const [filled, setFilled] = React.useState(() => String(value ?? defaultValue ?? '') !== '');
    React.useEffect(() => {
      if (value !== undefined) setFilled(String(value) !== '');
    }, [value]);

    const innerRef = React.useRef<HTMLInputElement | null>(null);
    const attachRef = React.useCallback(
      (node: HTMLInputElement | null): void => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setFilled(event.target.value !== '');
      onChangeText?.(event.target.value);
      onChange?.(event);
    };

    const handleClear = (): void => {
      const el = innerRef.current;
      if (el !== null) {
        /*
          Write through the prototype's own value setter, then replay a real
          `input` event. That is what makes clearing indistinguishable from the
          user emptying the field by hand: React's value tracker sees the
          change, so `onChange` — and every form library bound to it — fires
          exactly once, for a controlled and an uncontrolled caller alike.
          Calling `onChangeText('')` directly would fire it for neither.
        */
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;
        setter?.call(el, '');
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.focus();
      }
      setFilled(false);
      onClear?.();
    };

    const showClear = clearable && filled && !disabled;
    // One message slot: the error when there is one, the hint otherwise. Both
    // describe the input, so both get the same id and the input points at it.
    const message = invalid ? error : hint;

    return (
      <div className={cn('flex w-full flex-col gap-sm', className)}>
        {label ? (
          <label htmlFor={inputId} className="w-fit">
            <TextV4 size="sm" weight="medium">
              {label}
            </TextV4>
          </label>
        ) : null}

        <div
          data-xen-v4-shell=""
          className={cn(
            FIELD_V4_SHELL,
            fieldBorderClass(invalid),
            'flex items-center gap-sm',
            disabled && V4_DISABLED_SOFT_CLASS
          )}
          style={fieldRingVars(invalid)}
        >
          {icon ? <IconV4 name={icon} size="base" color="muted" /> : null}

          <input
            ref={attachRef}
            id={inputId}
            type={secure && !visible ? 'password' : secure ? 'text' : inputType}
            aria-invalid={invalid || undefined}
            aria-describedby={message ? messageId : undefined}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            className={cn(
              'min-w-0 flex-1 bg-transparent text-base text-on-surface',
              // §6: the placeholder is `muted`, and it is never standing in for
              // the label above.
              'placeholder:text-muted focus:outline-none'
            )}
            {...rest}
          />

          {secure ? (
            <button
              type="button"
              data-xen-v4-inline-action=""
              aria-label={visible ? hideLabel : showLabel}
              aria-pressed={visible}
              disabled={disabled}
              onClick={() => setVisible((v) => !v)}
              className={INLINE_ACTION}
            >
              <IconV4
                name={visible ? 'eye-off' : 'eye'}
                size="base"
                color={visible ? 'primary' : 'muted'}
              />
            </button>
          ) : null}

          {showClear ? (
            <button
              type="button"
              data-xen-v4-inline-action=""
              aria-label={clearLabel}
              onClick={handleClear}
              className={INLINE_ACTION}
            >
              <IconV4 name="close" size="sm" color="muted" />
            </button>
          ) : null}

          {trailing}
        </div>

        {invalid ? (
          <TextV4 id={messageId} size="sm" tone="dangerText" role="alert">
            {error}
          </TextV4>
        ) : hint ? (
          <TextV4 id={messageId} size="sm" tone="muted">
            {hint}
          </TextV4>
        ) : null}
      </div>
    );
  }
);
