import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, Button, type BadgeTone } from '../primitives';
import { formatMoney, withAlpha, type MoneyFormatter } from './internal/format';

/** Type of public document being requested. */
export type DocumentType =
  | 'birth-certificate'
  | 'marriage-certificate'
  | 'death-certificate'
  | 'property-deed'
  | 'court-record'
  | 'transcript'
  | 'other';

const DOC_TYPE: Record<DocumentType, { label: string; glyph: string }> = {
  'birth-certificate': { label: 'Birth certificate', glyph: '👶' },
  'marriage-certificate': { label: 'Marriage certificate', glyph: '💍' },
  'death-certificate': { label: 'Death certificate', glyph: '🕊️' },
  'property-deed': { label: 'Property deed', glyph: '🏠' },
  'court-record': { label: 'Court record', glyph: '⚖️' },
  transcript: { label: 'Transcript', glyph: '🎓' },
  other: { label: 'Document', glyph: '📄' },
};

/** Fulfilment status of a document request. */
export type DocumentRequestStatus = 'requested' | 'processing' | 'ready' | 'mailed' | 'denied';

const STATUS: Record<DocumentRequestStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  requested: { label: 'Requested', glyph: '📨', tone: 'primary' },
  processing: { label: 'Processing', glyph: '⋯', tone: 'warn' },
  ready: { label: 'Ready', glyph: '✓', tone: 'success' },
  mailed: { label: 'Mailed', glyph: '📮', tone: 'accent' },
  denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
};

export interface DocumentRequestProps {
  /** Type of document — drives the leading glyph + default label. */
  docType: DocumentType;
  /** Request title override (defaults to the document type label). */
  title?: string;
  /** Request reference number (e.g. "DOC-9931"). */
  requestNumber?: string;
  /** Fulfilment status (default `requested`). */
  status?: DocumentRequestStatus;
  /** Processing / copy fee in integer **cents** (0 = free). */
  feeCents?: number;
  /** Whether the fee has been paid (gates the pay action). */
  paid?: boolean;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Localized date the request was filed / updated. */
  date?: string;
  /** Fires "Pay fee" (shown only when an unpaid fee exists). */
  onPay?: () => void;
  /** Fires "Download" (shown only when status is `ready`). */
  onDownload?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A request for a public / vital record: a tinted document glyph, a status pill
 * conveyed by **text + glyph + color** (never color alone), an optional
 * integer-cents fee funnelled through `formatMoney`, and context-gated Pay /
 * Download actions. Every color traces to a `SemanticColors` slot or a
 * token-derived tint — no literals.
 */
export function DocumentRequest({
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
  style,
}: DocumentRequestProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const dt = DOC_TYPE[docType] ?? DOC_TYPE.other;
  const sd = STATUS[status] ?? STATUS.requested;
  const fee = feeCents != null ? Math.max(0, Math.trunc(feeCents)) : undefined;
  const showPay = onPay != null && !paid && fee != null && fee > 0;
  const showDownload = onDownload != null && status === 'ready';

  return (
    <Card variant="elevated" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, 0.12),
          }}
        >
          <Icon glyph={dt.glyph} size="xl" accessibilityLabel={dt.label} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {title ?? dt.label}
          </Text>
          {requestNumber != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{requestNumber}</Text>
          ) : null}
        </View>
        <Badge tone={sd.tone} variant="soft" size="sm">
          {`${sd.glyph} ${sd.label}`}
        </Badge>
      </View>

      {fee != null || date != null ? (
        <View
          style={{
            marginTop: tokens.spacing.sm,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {fee != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              Fee: {fee === 0 ? 'Free' : format(fee, currency)}
              {paid && fee > 0 ? ' · paid' : ''}
            </Text>
          ) : (
            <View />
          )}
          {date != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{date}</Text>
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
            <Button size="sm" variant="outline" onPress={onPay}>
              Pay fee
            </Button>
          ) : null}
          {showDownload ? (
            <Button size="sm" onPress={onDownload}>
              Download
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
