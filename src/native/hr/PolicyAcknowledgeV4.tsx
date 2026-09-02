import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { CheckboxV4 } from '../primitives/CheckboxV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { StatusPillV4 } from './StatusPillV4';
import { POLICY_STATUS_V4, metaLine, spokenLine } from './internal/tone-v4';
import type { PolicyStatus } from './internal';
import type { PolicyAcknowledgeProps } from './PolicyAcknowledge';

export interface PolicyAcknowledgeV4Props extends PolicyAcknowledgeProps {
  /** When the acknowledgement is due, pre-formatted. */
  dueDate?: string;
  /** Name of the acknowledge action. Default `'Acknowledge'`. */
  acknowledgeLabel?: string;
  /** Build the effective-date line. Default `` `Effective ${date}` ``. */
  formatEffective?: (date: string) => string;
  /** Build the due line. Default `` `Due ${date}` ``. */
  formatDue?: (date: string) => string;
}

/**
 * **V4 policy acknowledgement** — same props as {@link PolicyAcknowledge} plus
 * `dueDate`, `acknowledgeLabel`, `formatEffective` and `formatDue`, and with
 * `acknowledged` finally honoured as a controlled input.
 *
 * ## Five changes
 *
 * 1. **A rejected acknowledgement can be cleared.** Consent lived in an
 *    uncontrolled `useState` that nothing outside the component could reach, so
 *    a caller whose server refused the acknowledgement — a stale version, a
 *    signature that failed to record — had no way to untick the box. The user
 *    saw a ticked consent and a policy that was still outstanding. Passing
 *    `acknowledged={false}` now clears the tick.
 * 2. **An overdue policy says when it was due.** `overdue` was one of six
 *    adverse statuses in the module with nowhere to say why, and for this one
 *    the reason is a date the component was never given.
 * 3. **The consent box is a target.** A 20pt checkbox with no wrapper is under
 *    half the 44pt floor, and it is the control that gates the whole card.
 * 4. **The confirmation line is inked with ink.** `colors.success` is a
 *    **fill** slot used as a text colour — measured as low as 1.32:1 in the
 *    audit that produced the `*Text` tokens.
 * 5. **The copy is props.** "Acknowledge", "Effective" and the "Due" line were
 *    hard-coded English on a legal consent, and the card now announces the
 *    whole thing — title, version, effective date, due date and status —
 *    instead of leaving five loose text nodes for the reader to assemble.
 *
 * The acknowledge button is `variant="primary"` on both twins, which is what
 * the native base rendered by default and what the web base asked for by name.
 *
 * **Renders nothing without a `title`.**
 */
export function PolicyAcknowledgeV4({
  title,
  version,
  effectiveDate,
  summary,
  status,
  acknowledged = false,
  acknowledgedDate,
  consentLabel = 'I have read and agree to this policy',
  variant = 'default',
  dueDate,
  acknowledgeLabel = 'Acknowledge',
  formatEffective,
  formatDue,
  onToggle,
  onAcknowledge,
  testID,
  style,
}: PolicyAcknowledgeV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [consented, setConsented] = React.useState(false);

  /*
    `acknowledged` is a controlled input now. When a caller drops it back to
    false — the server refused the signature, the policy was re-issued — the
    tick has to go with it, or the user is looking at consent they did not
    successfully give.
  */
  React.useEffect(() => {
    if (!acknowledged) setConsented(false);
  }, [acknowledged]);

  if (!title) return null;

  const compact = variant === 'compact';
  const derived: PolicyStatus = status ?? (acknowledged ? 'acknowledged' : 'pending');
  const statusMeta = POLICY_STATUS_V4[derived];
  const tap = minTap(tokens.spacing);

  const effective = effectiveDate
    ? (formatEffective ?? ((d: string) => `Effective ${d}`))(effectiveDate)
    : null;
  const due = dueDate ? (formatDue ?? ((d: string) => `Due ${d}`))(dueDate) : null;
  const caption = metaLine([version, effective, due]);

  const confirmation = acknowledged
    ? `✓ ${statusMeta.label}${acknowledgedDate ? ` on ${acknowledgedDate}` : ''}`
    : null;

  /*
    The card has no activation of its own, so there is nothing to carry the
    status word for the pill. It speaks for itself and the heading leaves it
    out, rather than both saying it.
  */
  const spoken = spokenLine([title, version, effective, due, confirmation]);

  const handleToggle = (next: boolean): void => {
    setConsented(next);
    onToggle?.(next);
  };

  return (
    <CardV4
      variant="outlined"
      padding={compact ? 'sm' : 'md'}
      testID={testID}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        <View accessible accessibilityLabel={spoken} style={{ flex: 1, gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={2}>
            {title}
          </TextV4>
          {caption ? (
            <TextV4 size="xs" tone="mutedText">
              {caption}
            </TextV4>
          ) : null}
        </View>
        <StatusPillV4 meta={statusMeta} size="sm" />
      </View>

      {!compact && summary ? (
        <TextV4 size="sm" tone="mutedText" numberOfLines={4}>
          {summary}
        </TextV4>
      ) : null}

      {confirmation ? (
        <TextV4 size="xs" weight="semibold" style={{ color: colors.successText }}>
          {confirmation}
        </TextV4>
      ) : (
        <View style={{ gap: tokens.spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            {/* The gate on the whole card, at a size a thumb can hit. */}
            <View
              style={{ width: tap, height: tap, alignItems: 'center', justifyContent: 'center' }}
            >
              <CheckboxV4
                checked={consented}
                onCheckedChange={handleToggle}
                accessibilityLabel={consentLabel}
              />
            </View>
            <TextV4
              size="xs"
              tone="onCard"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{ flex: 1 }}
            >
              {consentLabel}
            </TextV4>
          </View>
          <ButtonV4
            size="sm"
            variant="primary"
            disabled={!consented}
            onPress={onAcknowledge}
            accessibilityLabel={`${acknowledgeLabel}: ${title}`}
            style={{ minHeight: tap }}
          >
            {acknowledgeLabel}
          </ButtonV4>
        </View>
      )}
    </CardV4>
  );
}
