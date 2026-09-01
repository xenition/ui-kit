import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { metaLine } from '../primitives/internal/tone-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type {
  DocumentRequestProps,
  DocumentRequestStatus,
  DocumentType,
} from './DocumentRequest';
import { formatMoney } from './internal/format';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  isAdverse,
  labelledId,
  spokenLine,
  tintGround,
  tintInkClass,
  type ToneV4,
} from './internal/civic-v4';

export interface DocumentRequestV4Props extends DocumentRequestProps {
  /** Why the request was refused. Rendered and announced when the status is adverse. */
  reason?: string;
  /** Override the seven document words — `'Birth certificate'`, `'Transcript'`, … */
  typeLabels?: Partial<Record<DocumentType, string>>;
  /** Override the five status words — `'Requested'`, `'Denied'`, … */
  statusLabels?: Partial<Record<DocumentRequestStatus, string>>;
  /** How "Pay fee" names itself once armed. Default `'Confirm payment'`. */
  confirmPayLabel?: string;
}

const TYPE_V4: Record<DocumentType, { label: string; glyph: string }> = {
  'birth-certificate': { label: 'Birth certificate', glyph: '👶' },
  'marriage-certificate': { label: 'Marriage certificate', glyph: '💍' },
  'death-certificate': { label: 'Death certificate', glyph: '🕊️' },
  'property-deed': { label: 'Property deed', glyph: '🏠' },
  'court-record': { label: 'Court record', glyph: '⚖️' },
  transcript: { label: 'Transcript', glyph: '🎓' },
  other: { label: 'Document', glyph: '📄' },
};

/**
 * Status → word, glyph and tone.
 *
 * `requested` and `mailed` are `neutral`: they are stages of a fulfilment, and
 * a brand-coloured pill beside a green Ready reads as a second outcome.
 */
const STATUS_V4: Record<DocumentRequestStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  requested: { label: 'Requested', glyph: '📨', tone: IDENTITY_TONE },
  processing: { label: 'Processing', glyph: '⋯', tone: 'warn' },
  ready: { label: 'Ready', glyph: '✓', tone: 'success' },
  mailed: { label: 'Mailed', glyph: '📮', tone: IDENTITY_TONE },
  denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
};

/**
 * **V4 document request** — the web twin of the native `DocumentRequestV4`,
 * same props as {@link DocumentRequest} plus `reason`, `typeLabels`,
 * `statusLabels` and `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **A denied request says why, and announces.** `denied` is one of the
 *    module's five rejection states and none of the five interfaces had a field
 *    for the reason. `reason` renders under the header when {@link isAdverse}
 *    is true and reaches a polite live region one commit after mount — a live
 *    region announces *changes*, so text present at first paint never speaks.
 * 2. **Paying a fee takes a confirming press.** "Pay fee" was one tap on a
 *    ~32px target, with no confirm, no pending state and no undo. It arms
 *    first, renames itself, and disarms on blur.
 * 3. **The request number is labelled**, so a reader hears what "DOC-9931"
 *    identifies rather than four digits, and the fee, the paid flag and the
 *    date read as one caption rather than two spans at opposite ends of a row.
 * 4. **A document type is identity.** The leading disc was `bg-primary-50`, a
 *    ramp step that mirrors under `[data-theme="dark"]` and paints a near-white
 *    plate on a dark card, with its glyph in the `primary` **fill** used as
 *    ink. It takes the neutral identity tint and the contrast-corrected ink.
 * 5. **Both actions clear 44.** `size="sm"` is about 32px, and neither `Button`
 *    primitive sets a minimum height — so every action in this module was under
 *    the tap floor.
 */
export const DocumentRequestV4 = React.forwardRef<HTMLDivElement, DocumentRequestV4Props>(
  function DocumentRequestV4(
    {
      docType,
      title,
      requestNumber,
      status = 'requested',
      feeCents,
      paid = false,
      currency = 'USD',
      formatMoney: format = formatMoney,
      date,
      onPay,
      onDownload,
      reason,
      typeLabels,
      statusLabels,
      confirmPayLabel = 'Confirm payment',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const [armed, setArmed] = React.useState(false);

    const dt = TYPE_V4[docType] ?? TYPE_V4.other;
    const typeWord = typeLabels?.[docType] ?? dt.label;
    const sd = STATUS_V4[status] ?? STATUS_V4.requested;
    const word = statusLabels?.[status] ?? sd.label;
    const reference = labelledId('Request', requestNumber);
    const adverse = isAdverse(status);
    const why = adverse ? reason : undefined;

    const fee = feeCents != null ? Math.max(0, Math.trunc(feeCents)) : undefined;
    const feeText =
      fee != null
        ? `Fee: ${fee === 0 ? 'Free' : format(fee, currency)}${paid && fee > 0 ? ' · paid' : ''}`
        : undefined;
    const caption = metaLine([reference, feeText, date]);

    const showPay = onPay != null && !paid && fee != null && fee > 0;
    const showDownload = onDownload != null && status === 'ready';
    const payWord = armed ? confirmPayLabel : 'Pay fee';

    const announcement = spokenLine([title ?? typeWord, word, why]);
    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
      setAnnounced(adverse ? announcement : '');
    }, [adverse, announcement]);

    return (
      <CardV4 ref={ref} variant={CARD_V4} className={className} {...rest}>
        <span role="status" aria-live="polite" className="sr-only">
          {announced}
        </span>

        <div className="flex items-center gap-md">
          <span
            aria-hidden
            className="flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]"
            style={{ background: tintGround(IDENTITY_TONE) }}
          >
            <IconV4 glyph={dt.glyph} size="xl" className={tintInkClass(IDENTITY_TONE)} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <p className="truncate text-base font-bold text-on-surface">{title ?? typeWord}</p>
            {caption !== '' ? <p className="text-xs text-muted-text">{caption}</p> : null}
          </div>
          <BadgeV4 tone={sd.tone} {...BADGE_V4}>
            {`${sd.glyph} ${word}`}
          </BadgeV4>
        </div>

        {why != null ? (
          <p className={cn('mt-sm text-sm font-medium', tintInkClass(sd.tone))}>{why}</p>
        ) : null}

        {showPay || showDownload ? (
          <div className="mt-md flex flex-wrap justify-end gap-sm">
            {showPay ? (
              <ButtonV4
                size="md"
                variant="outline"
                onClick={() => {
                  // Money leaving an account has no undo, so the first press
                  // only arms.
                  if (!armed) {
                    setArmed(true);
                    return;
                  }
                  setArmed(false);
                  onPay?.();
                }}
                // Walking away from an armed payment disarms it.
                onBlur={() => setArmed(false)}
              >
                {payWord}
              </ButtonV4>
            ) : null}
            {showDownload ? (
              <ButtonV4
                size="md"
                aria-label={spokenLine(['Download', title ?? typeWord])}
                onClick={onDownload}
              >
                Download
              </ButtonV4>
            ) : null}
          </div>
        ) : null}
      </CardV4>
    );
  }
);
