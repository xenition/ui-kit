import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  FIELD_V4_CSS,
  FIELD_V4_STYLE_ID,
  fieldRingVars,
} from '../primitives/internal/field-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { AttachmentChipV4 } from './AttachmentChipV4';
import { canSendMail, TONE_INK } from './internal/mail-v4';
import type { ComposeBarProps } from './ComposeBar';

export interface ComposeBarV4Props extends ComposeBarProps {
  /** Copy on the attach control. Default `'Add attachment'`. */
  attachLabel?: string;
  /** Copy on the send control. Default `'Send'`. */
  sendLabel?: string;
  /** How many lines the body may grow to before it scrolls. Default `5`. */
  maxLines?: number;
}

/** 44 on both axes for a glyph control, composed from the spacing scale. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';

/**
 * The To / Subject fields: an underline rule in `input`, not `border`.
 *
 * `border` is the hairline slot — the rule *between* two things. `input` is the
 * slot the theme ships for the edge of a control someone types into, and it is
 * the one that stays visible when the two are tuned apart.
 */
const FIELD_CLASS = [
  'w-full border-b border-input bg-surface px-md py-sm',
  'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
  'text-base text-on-surface placeholder:text-muted-text',
  'disabled:pointer-events-none disabled:opacity-[0.38]',
].join(' ');

/**
 * **V4 compose bar** — same props as {@link ComposeBar} plus `attachLabel`,
 * `sendLabel` and `maxLines`.
 *
 * ## Four changes
 *
 * 1. **Send stops firing with no recipient.** `canSend` tested the body and
 *    the attachments and never tested `to`, so one character of body — or a
 *    single staged file — enabled Send and `onSend({ to: '', … })` went out.
 *    The test is now `canSendMail`, shared with the native twin so the two bars
 *    cannot disagree about what a sendable draft is.
 * 2. **The body actually grows here.** Both docblocks advertised a growing
 *    field and only native had one; the web bar was a one-row `Textarea` with a
 *    `max-h` on it, so a four-line reply was typed through a one-line slot.
 *    It now grows to `maxLines` and scrolls after that.
 * 3. **The attach control clears 44** — it was a glyph with no box beside a
 *    44 send button, and it is the control a user reaches for while holding
 *    the phone one-handed.
 * 4. **Press is a state layer, disabled is 0.38, and the fields are outlined
 *    in `input`** — the bar dimmed its own controls on hover at exactly the
 *    band M3 spends on unavailable.
 */
export const ComposeBarV4 = React.forwardRef<HTMLDivElement, ComposeBarV4Props>(
  function ComposeBarV4(
    {
      to,
      onChangeTo,
      subject,
      onChangeSubject,
      body = '',
      onChangeBody,
      onSend,
      onAttach,
      attachments,
      onRemoveAttachment,
      placeholder = 'Write a message',
      sending = false,
      disabled = false,
      attachLabel = 'Add attachment',
      sendLabel = 'Send',
      maxLines = 5,
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);

    const bodyRef = React.useRef<HTMLTextAreaElement | null>(null);

    // The field's height is a measurement, not a class: how tall the text
    // actually is, capped at `maxLines` of the line-height it happens to have.
    React.useLayoutEffect(() => {
      const el = bodyRef.current;
      if (el == null) return;
      el.style.height = 'auto';
      if (el.scrollHeight === 0) return; // No layout (SSR shim, jsdom) — leave it alone.
      const cs = window.getComputedStyle(el);
      const line = Number.parseFloat(cs.lineHeight);
      const frame =
        Number.parseFloat(cs.paddingTop) +
        Number.parseFloat(cs.paddingBottom) +
        Number.parseFloat(cs.borderTopWidth) +
        Number.parseFloat(cs.borderBottomWidth);
      const cap =
        Number.isFinite(line) && Number.isFinite(frame)
          ? line * Math.max(1, maxLines) + frame
          : Number.POSITIVE_INFINITY;
      const next = Math.min(el.scrollHeight, cap);
      el.style.height = `${next}px`;
      el.style.overflowY = el.scrollHeight > cap ? 'auto' : 'hidden';
    }, [body, maxLines]);

    const staged = attachments ?? [];
    const hasAttachments = staged.length > 0;
    const canSend = canSendMail({ to, body, hasAttachments, disabled, sending });

    const submit = (): void => {
      if (!canSend) return;
      onSend?.({ to, subject, body });
    };

    return (
      <div ref={ref} className={cn('border-t border-border bg-surface pb-sm', className)}>
        {to !== undefined ? (
          <input
            aria-label="To"
            type="email"
            autoCapitalize="none"
            disabled={disabled}
            value={to}
            onChange={(e) => onChangeTo?.(e.target.value)}
            placeholder="To"
            data-xen-v4-field=""
            style={fieldRingVars(false)}
            className={FIELD_CLASS}
          />
        ) : null}
        {subject !== undefined ? (
          <input
            aria-label="Subject"
            disabled={disabled}
            value={subject}
            onChange={(e) => onChangeSubject?.(e.target.value)}
            placeholder="Subject"
            data-xen-v4-field=""
            style={fieldRingVars(false)}
            className={FIELD_CLASS}
          />
        ) : null}

        {hasAttachments ? (
          <div className="flex flex-wrap gap-xs p-sm">
            {staged.map((attachment) => (
              <AttachmentChipV4
                key={attachment.id}
                name={attachment.name}
                kind={attachment.kind ?? 'file'}
                size={attachment.size}
                onRemove={onRemoveAttachment ? () => onRemoveAttachment(attachment.id) : undefined}
              />
            ))}
          </div>
        ) : null}

        <div className="flex items-end gap-sm px-md pt-sm">
          <button
            type="button"
            aria-label={attachLabel}
            disabled={disabled}
            onClick={onAttach}
            data-xen-v4-state=""
            style={
              stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties
            }
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-full',
              MIN_TAP_CLASS,
              TAP_SQUARE,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              V4_DISABLED_CLASS
            )}
          >
            <span aria-hidden="true" className={cn('text-base leading-none', TONE_INK.muted)}>
              📎
            </span>
          </button>

          <textarea
            ref={bodyRef}
            aria-label="Message body"
            rows={1}
            disabled={disabled}
            value={body}
            onChange={(e) => onChangeBody?.(e.target.value)}
            placeholder={placeholder}
            data-xen-v4-field=""
            style={fieldRingVars(false)}
            className={cn(
              'min-w-0 flex-1 resize-none bg-surface px-md py-sm',
              'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
              'rounded-[var(--xen-radius-lg)] border border-input',
              'text-base leading-relaxed text-on-surface placeholder:text-muted-text',
              'disabled:pointer-events-none disabled:opacity-[0.38]'
            )}
          />

          <button
            type="button"
            aria-label={sendLabel}
            aria-busy={sending || undefined}
            disabled={!canSend}
            onClick={submit}
            data-xen-v4-state=""
            style={
              stateGroundVars('var(--xen-primary)', 'var(--xen-on-primary)') as React.CSSProperties
            }
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-full bg-primary text-on-primary',
              MIN_TAP_CLASS,
              TAP_SQUARE,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              V4_DISABLED_CLASS
            )}
          >
            <span aria-hidden="true" className="text-base leading-none">
              {sending ? '…' : '➤'}
            </span>
          </button>
        </div>
      </div>
    );
  }
);
