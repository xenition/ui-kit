import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { metaLine } from '../primitives/internal/tone-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { RegistrationStatus, VotingInfoCardProps } from './VotingInfoCard';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  spokenLine,
  tintGround,
  tintInkClass,
  type ToneV4,
} from './internal/civic-v4';

export interface VotingInfoCardV4Props extends VotingInfoCardProps {
  /** Override the four registration words — `'Registered'`, `'Not registered'`, … */
  statusLabels?: Partial<Record<RegistrationStatus, string>>;
  /** What the upcoming election is called. Default `'Next election'`. */
  electionLabel?: string;
}

const REG_V4: Record<RegistrationStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  registered: { label: 'Registered', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  'not-registered': { label: 'Not registered', glyph: '!', tone: 'danger' },
  inactive: { label: 'Inactive', glyph: '✕', tone: 'neutral' },
};

/**
 * **V4 voting info** — the web twin of the native `VotingInfoCardV4`, same
 * props as {@link VotingInfoCard} plus `statusLabels` and `electionLabel`.
 *
 * ## Four changes
 *
 * 1. **The election date has a relationship to its label.** "Next election" and
 *    the date were two sibling `<span>`s with nothing tying them together, so a
 *    reader met a bare date with no idea what it was the date *of* — on the one
 *    card whose entire purpose is a deadline. The card's three facts are
 *    term/definition pairs now, which is what they always were.
 * 2. **Being registered for a mail ballot is not a brand event.** It is a
 *    factual attribute, like the party label on `RepresentativeCard`, and takes
 *    the neutral identity chip; the four registration states keep their tones,
 *    because those genuinely are statuses.
 * 3. **The words are props.** "Next election", "Polling place", the four
 *    registration labels and both action labels were hard-coded English on a
 *    civic surface that has to ship in every language the jurisdiction serves.
 * 4. **Both actions clear 44**, and the leading disc stops drawing its glyph in
 *    the `success` / `danger` **fill** on a 10% tint of that same fill — a
 *    contrast pairing nobody ever measured — taking the tone's
 *    contrast-corrected ink instead.
 */
export const VotingInfoCardV4 = React.forwardRef<HTMLDivElement, VotingInfoCardV4Props>(
  function VotingInfoCardV4(
    {
      registration,
      electionDate,
      electionName,
      pollingPlace,
      pollingAddress,
      mailBallot = false,
      onRegister,
      onFindPolling,
      statusLabels,
      electionLabel = 'Next election',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const reg = REG_V4[registration] ?? REG_V4['not-registered'];
    const word = statusLabels?.[registration] ?? reg.label;
    const isRegistered = registration === 'registered';
    const election = metaLine([electionName, electionDate]);
    const registerWord = isRegistered ? 'Update registration' : 'Register to vote';

    return (
      <CardV4 ref={ref} variant={CARD_V4} className={className} {...rest}>
        <div className="flex items-center gap-md">
          <span
            aria-hidden
            className="flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]"
            style={{ background: tintGround(reg.tone) }}
          >
            <IconV4 glyph="🗳️" size="xl" className={tintInkClass(reg.tone)} />
          </span>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-xs">
            <p className="text-base font-bold text-on-surface">Voter status</p>
            <BadgeV4 tone={reg.tone} {...BADGE_V4}>
              {`${reg.glyph} ${word}`}
            </BadgeV4>
          </div>
          {mailBallot ? (
            <BadgeV4 tone={IDENTITY_TONE} {...BADGE_V4}>
              📮 Mail ballot
            </BadgeV4>
          ) : null}
        </div>

        {/* Term and definition, not two spans that happen to be adjacent. */}
        {election !== '' || pollingPlace != null ? (
          <dl className="mt-md flex flex-col gap-sm border-t border-border pt-md">
            {election !== '' ? (
              <div className="flex flex-col gap-xs">
                <dt className="text-xs text-muted-text">{electionLabel}</dt>
                <dd className="text-sm font-semibold text-on-surface">{election}</dd>
              </div>
            ) : null}
            {pollingPlace != null ? (
              <div className="flex flex-col gap-xs">
                <dt className="text-xs text-muted-text">Polling place</dt>
                <dd className="text-sm text-on-surface">
                  <span aria-hidden="true">📍</span> {pollingPlace}
                  {pollingAddress != null ? (
                    <span className="block text-xs text-muted-text">{pollingAddress}</span>
                  ) : null}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {onRegister != null || onFindPolling != null ? (
          <div className={cn('mt-md flex flex-wrap justify-end gap-sm')}>
            {onFindPolling != null ? (
              <ButtonV4
                size="md"
                variant="outline"
                aria-label={spokenLine(['Find polling place', pollingPlace])}
                onClick={onFindPolling}
              >
                Find polling place
              </ButtonV4>
            ) : null}
            {onRegister != null ? (
              <ButtonV4
                size="md"
                aria-label={spokenLine([registerWord, word])}
                onClick={onRegister}
              >
                {registerWord}
              </ButtonV4>
            ) : null}
          </div>
        ) : null}
      </CardV4>
    );
  }
);
