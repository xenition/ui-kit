import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  isAdverse,
  labelledId,
  spokenLine,
  tintGround,
  tintInk,
  type ToneV4,
} from './internal/civic-v4';
import { formatMoney } from './internal/format';
import type {
  DocumentRequestProps,
  DocumentRequestStatus,
  DocumentType,
} from './DocumentRequest';

export interface DocumentRequestV4Props extends DocumentRequestProps {
  /** Why the request was refused. Rendered when the status is adverse. */
  reason?: string;
  /** Override the seven document words (`'Birth certificate'`, `'Court record'`, …). */
  typeLabels?: Partial<Record<DocumentType, string>>;
  /** Override the five status words (`'Processing'`, `'Denied'`, …). */
  statusLabels?: Partial<Record<DocumentRequestStatus, string>>;
  /** What the pay button says once it is armed. Default `'Confirm payment'`. */
  confirmPayLabel?: string;
}

/** What the request number identifies. */
const REQUEST_LABEL = 'Request';

const TYPE_V4: Record<DocumentType, { label: string; glyph: string }> = {
  'birth-certificate': { label: 'Birth certificate', glyph: '👶' },
  'marriage-certificate': { label: 'Marriage certificate', glyph: '💍' },
  'death-certificate': { label: 'Death certificate', glyph: '🕊️' },
  'property-deed': { label: 'Property deed', glyph: '🏠' },
  'court-record': { label: 'Court record', glyph: '⚖️' },
  transcript: { label: 'Transcript', glyph: '🎓' },
  other: { label: 'Document', glyph: '📄' },
};

const STATUS_V4: Record<DocumentRequestStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  requested: { label: 'Requested', glyph: '📨', tone: IDENTITY_TONE },
  processing: { label: 'Processing', glyph: '⋯', tone: 'warn' },
  ready: { label: 'Ready', glyph: '✓', tone: 'success' },
  mailed: { label: 'Mailed', glyph: '📮', tone: IDENTITY_TONE },
  denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
};

/**
 * **V4 document request** — same props as {@link DocumentRequest} plus
 * `reason`, `typeLabels`, `statusLabels` and `confirmPayLabel`.
 *
 * ## Five changes
 *
 * 1. **A denied request says why.** A refused death certificate said "Denied"
 *    and offered no field for the reason, on a card whose whole purpose is to
 *    report what happened to the request. `isAdverse()` gates the `reason`,
 *    and the line is an assertive live region.
 * 2. **Paying takes a confirming press.** "Pay fee" was one tap on a ~34pt
 *    target, with no confirm and no way back; the first press arms the button
 *    and shows `confirmPayLabel`, the second pays.
 * 3. **The request number is labelled** — it rendered as a bare "DOC-9931" —
 *    and the card is one announced object carrying the type, the status, the
 *    fee and the date rather than seven loose text nodes.
 * 4. **Both actions clear 44**, where `size="sm"` renders about 34 and neither
 *    `Button` primitive sets a floor, and the document disc's tint is
 *    composited opaquely instead of washed over whatever is behind it — a
 *    translucent tint is a different colour on every surface it lands on.
 * 5. **A stage in the queue is not an outcome.** `requested` was `primary` and
 *    `mailed` was `accent`, and the document type disc was `primary` too — a
 *    brand colour describing what kind of certificate it is. All three are
 *    `IDENTITY_TONE`, leaving `ready` and `denied` as the only two tones on
 *    the card that mean anything happened.
 */
export function DocumentRequestV4({
  docType,
  title,
  requestNumber,
  status = 'requested',
  feeCents,
  paid = false,
  currency = 'USD',
  formatMoney: format = formatMoney,
  date,
  reason,
  typeLabels,
  statusLabels,
  confirmPayLabel = 'Confirm payment',
  onPay,
  onDownload,
  style,
}: DocumentRequestV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const [armed, setArmed] = React.useState(false);

  const dt = TYPE_V4[docType] ?? TYPE_V4.other;
  const typeWord = typeLabels?.[docType] ?? dt.label;
  const sd = STATUS_V4[status] ?? STATUS_V4.requested;
  const statusWord = statusLabels?.[status] ?? sd.label;
  const adverse = isAdverse(status);
  const showReason = adverse && Boolean(reason);
  const idLine = labelledId(REQUEST_LABEL, requestNumber);

  const fee = feeCents != null ? Math.max(0, Math.trunc(feeCents)) : undefined;
  const showPay = onPay != null && !paid && fee != null && fee > 0;
  const showDownload = onDownload != null && status === 'ready';
  const feeLine =
    fee != null
      ? `Fee: ${fee === 0 ? 'Free' : format(fee, currency)}${paid && fee > 0 ? ' · paid' : ''}`
      : undefined;

  const tap = minTap(tokens.spacing);
  const disc = tokens.spacing['2xl'];

  const spoken = spokenLine([
    title ?? typeWord,
    typeWord,
    idLine,
    statusWord,
    feeLine,
    date,
    showReason ? reason : null,
  ]);

  return (
    <CardV4 variant={CARD_V4} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          accessible
          accessibilityLabel={spoken}
          style={{
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
          }}
        >
          <View
            style={{
              width: disc,
              height: disc,
              borderRadius: tokens.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: tintGround(theme, IDENTITY_TONE),
            }}
          >
            {/* Decorative: the document type is written in the card's name. */}
            <IconV4 glyph={dt.glyph} size="xl" />
          </View>
          <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
            <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
              {title ?? typeWord}
            </TextV4>
            {idLine ? (
              <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
                {idLine}
              </TextV4>
            ) : null}
          </View>
        </View>
        <BadgeV4 tone={sd.tone} {...BADGE_V4}>
          {`${sd.glyph} ${statusWord}`}
        </BadgeV4>
      </View>

      {showReason ? (
        <TextV4
          size="sm"
          accessibilityLiveRegion="assertive"
          style={{ marginTop: tokens.spacing.sm, color: tintInk(theme, sd.tone) }}
        >
          {reason}
        </TextV4>
      ) : null}

      {feeLine != null || date ? (
        <View
          style={{
            marginTop: tokens.spacing.sm,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
          }}
        >
          {feeLine != null ? (
            <TextV4 size="xs" tone="mutedText">
              {feeLine}
            </TextV4>
          ) : (
            <View />
          )}
          {date ? (
            <TextV4 size="xs" tone="mutedText">
              {date}
            </TextV4>
          ) : null}
        </View>
      ) : null}

      {showPay || showDownload ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            justifyContent: 'flex-end',
          }}
        >
          {showPay ? (
            <ButtonV4
              size="md"
              variant="outline"
              accessibilityLabel={armed ? confirmPayLabel : 'Pay fee'}
              onPress={() => {
                // A payment is irreversible and the card offers no way back
                // from a mis-tap on a ~34pt target.
                if (!armed) {
                  setArmed(true);
                  return;
                }
                setArmed(false);
                onPay?.();
              }}
              style={{ minHeight: tap }}
            >
              {armed ? confirmPayLabel : 'Pay fee'}
            </ButtonV4>
          ) : null}
          {showDownload ? (
            <ButtonV4 size="md" onPress={onDownload} style={{ minHeight: tap }}>
              Download
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </CardV4>
  );
}
