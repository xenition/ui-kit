import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { StepsV4 } from '../primitives/StepsV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  CARD_V4,
  isAdverse,
  labelledId,
  placeholderGround,
  spokenLine,
  statusSentence,
  tintGround,
  tintInk,
  toneFill,
} from './internal/civic-v4';
import { PERMIT_STAGES, PERMIT_STATUS, permitStatus } from './internal/status';
import type { PermitStatusProps } from './PermitStatus';

export interface PermitStatusV4Props extends PermitStatusProps {
  /** Why the permit was refused. Rendered and announced when the status is adverse. */
  reason?: string;
  /** Override the status word (`'Under review'`, `'Denied'`, …). */
  statusLabel?: string;
  /** Build the position sentence. Default `` `${label}, step ${step} of ${total}` ``. */
  formatStep?: (label: string, step: number, total: number) => string;
  /** What the permit number identifies. Default `'Permit'`. */
  referenceLabel?: string;
}

/**
 * The sentence the base hard-coded under "Permit denied", kept as the default
 * so a caller with no `reason` sees exactly what it saw before.
 */
const DENIAL_FALLBACK = 'Review the notice and re-apply or appeal.';

/**
 * **V4 permit tracker** — same props as {@link PermitStatus} plus `reason`,
 * `statusLabel`, `formatStep` and `referenceLabel`.
 *
 * ## Five changes
 *
 * 1. **The status always renders.** `<PermitStatus status="review" title="…" />`
 *    produced a card in which the words "Under review" appeared **nowhere**:
 *    the only human-readable status line was gated on `updatedDate`, an
 *    optional prop. `statusSentence()` renders it whether or not a date was
 *    passed, and carries the position with it — "Under review, step 2 of 4".
 * 2. **The tracker says which step is yours.** The base `Steps` conveyed
 *    position entirely by colour: the active marker and a pending one both
 *    render a bare digit and differ only by border and text colour, with no
 *    `accessibilityState` anywhere. `StepsV4` already announces "Step 2 of 4,
 *    current" and draws the completed run as a filled rail, so a red-green
 *    deficient reader and a blind one both get the answer.
 * 3. **A denial says why, and announces.** The banner carried a fixed
 *    consolation sentence with no way to say what the notice said, under
 *    `accessibilityRole="alert"` — which on React Native sets no announcement
 *    behaviour at all without `accessibilityLiveRegion`. It is one assertive
 *    live region now, naming the status and the `reason` together.
 * 4. **The permit number is labelled.** A reader heard "BLD-2026-0417" with no
 *    idea what it identified; it is `referenceLabel` + the number now, and the
 *    denial headline takes the contrast-corrected ink rather than the `danger`
 *    fill drawn as text on a tint of itself.
 * 5. **The dead branch is gone.** `denied ? 1 : …` picked a step for a status
 *    that never reaches `Steps`, and the loading block is the shared opaque
 *    skeleton rather than a translucent wash of a ramp step.
 */
export function PermitStatusV4({
  status,
  permitNumber,
  title,
  updatedDate,
  loading = false,
  reason,
  statusLabel,
  formatStep,
  referenceLabel = 'Permit',
  style,
}: PermitStatusV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const sd = permitStatus(status);
  const statusWord = statusLabel ?? sd.label;
  const adverse = isAdverse(status);
  const idLine = labelledId(referenceLabel, permitNumber);

  const steps = PERMIT_STAGES.map((stage) => ({ title: PERMIT_STATUS[stage].label }));
  const current = Math.min(sd.step, steps.length - 1);

  // Off the happy path there is no step to be at, so the sentence is the word
  // alone rather than "Denied, step 3 of 4" — which would be a position the
  // tracker never draws.
  const sentence = adverse
    ? statusWord
    : statusSentence(statusWord, sd.step, steps.length, formatStep);

  const detail = reason ?? DENIAL_FALLBACK;

  return (
    <CardV4 variant={CARD_V4} style={style}>
      {title || idLine ? (
        <View style={{ marginBottom: tokens.spacing.md, gap: tokens.spacing.xs / 2 }}>
          {title ? (
            <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
              {title}
            </TextV4>
          ) : null}
          {idLine ? (
            <TextV4 size="xs" tone="mutedText">
              {idLine}
            </TextV4>
          ) : null}
        </View>
      ) : null}

      {loading ? (
        <View
          accessibilityRole="progressbar"
          accessibilityLabel="Loading permit status"
          style={{
            height: minTap(tokens.spacing),
            borderRadius: tokens.radius.md,
            backgroundColor: placeholderGround(theme),
          }}
        />
      ) : adverse ? (
        <View
          // `alert` alone does nothing on React Native. The live region is what
          // makes a refusal reach a reader who is not looking at the card.
          accessible
          accessibilityRole="alert"
          accessibilityLiveRegion="assertive"
          accessibilityLabel={spokenLine([idLine, statusWord, detail])}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: tokens.spacing.sm,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: toneFill(theme, 'danger'),
            backgroundColor: tintGround(theme, 'danger'),
          }}
        >
          <IconV4 glyph={sd.glyph} style={{ color: tintInk(theme, 'danger') }} />
          <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
            {/* `dangerText`, not `danger`: this is a headline drawn on a tint
                of the very slot the base inked it with. */}
            <TextV4 size="base" weight="bold" style={{ color: tintInk(theme, 'danger') }}>
              {statusWord}
            </TextV4>
            <TextV4 size="xs" tone="onSurface">
              {detail}
            </TextV4>
          </View>
        </View>
      ) : (
        <StepsV4 steps={steps} current={current} />
      )}

      {!loading ? (
        <TextV4 size="xs" tone="mutedText" style={{ marginTop: tokens.spacing.md }}>
          {metaLine([`${sd.glyph} ${sentence}`, updatedDate ? `updated ${updatedDate}` : null])}
        </TextV4>
      ) : null}
    </CardV4>
  );
}
