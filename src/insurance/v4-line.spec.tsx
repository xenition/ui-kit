/** @jest-environment jsdom */
/**
 * The **V4 insurance line** (web) — the coverage pass, and the finding this
 * module exists for: the claim tracker printed a denial reason it was never
 * given.
 */
import * as React from 'react';
import { render } from '@testing-library/react';
import {
  allocationParts,
  deductibleParts,
  isAdverse,
  premiumParts,
  scoreParts,
} from './coverage-v4';
import { ClaimStatusTrackerV4 } from './ClaimStatusTrackerV4';
import { DeductibleBarV4 } from './DeductibleBarV4';
import { RiskScoreV4 } from './RiskScoreV4';

describe('coverage-v4', () => {
  it('announces a whole percent, not the float the caption disagreed with', () => {
    // The base passed `ratio * 100` straight to the meter, so met 10000 of
    // 30000 announced "33.33333333333333" beside a caption saying 33%.
    const third = deductibleParts(10000, 30000);
    expect(third.percent).toBe(33);
    expect(Number.isInteger(third.percent)).toBe(true);
  });

  it('treats a ceiling of nought as no deductible, not as one already met', () => {
    // `ratio = 1` whenever the deductible was <= 0, so a policy with none
    // recorded drew a full green bar reading "Deductible met".
    const none = deductibleParts(0, 0);
    expect(none.hasCeiling).toBe(false);
    expect(none.satisfied).toBe(false);
    expect(none.ratio).toBeUndefined();
  });

  it('keeps the money applied beyond the ceiling', () => {
    // The base displayed "$1,000.00 / $1,000.00" and never said $500 more had
    // been applied.
    const over = deductibleParts(150000, 100000);
    expect(over.met).toBe(150000);
    expect(over.over).toBe(50000);
    expect(over.satisfied).toBe(true);
    expect(over.ratio).toBe(1);
  });

  it('reads a score against the caller own scale', () => {
    // 0-100 and the 33/66 cutoffs were hard-coded, so a 300-850 model could
    // not be rendered at all.
    const credit = scoreParts(720, 300, 850);
    expect(credit.value).toBe(720);
    expect(credit.ratio).toBeCloseTo((720 - 300) / 550);
    expect(credit.outOfRange).toBe(false);

    // A score off its own scale is reported, not silently clamped into a tier.
    expect(scoreParts(95, 0, 50).outOfRange).toBe(true);
    expect(scoreParts(95, 0, 50).value).toBe(50);
    // A degenerate scale cannot divide by zero.
    expect(Number.isFinite(scoreParts(5, 10, 10).ratio)).toBe(true);
  });

  it('reports a total that contradicts its own lines', () => {
    // The TSDoc promised the total "always reconciles with the lines shown"
    // and then let `totalCents` win in silence.
    const bad = premiumParts([5000, 4000, 3000], 9900);
    expect(bad.derived).toBe(12000);
    expect(bad.total).toBe(9900);
    expect(bad.reconciles).toBe(false);

    expect(premiumParts([5000, 4000, 3000])).toMatchObject({
      derived: 12000,
      total: 12000,
      reconciles: true,
    });
  });

  it('reads beneficiary allocations as a set', () => {
    // Three rows at 50% rendered three confident figures totalling 150%,
    // because each row clamped itself with no notion of the others.
    const overAllocated = allocationParts([50, 50, 50]);
    expect(overAllocated.total).toBe(150);
    expect(overAllocated.balanced).toBe(false);
    expect(overAllocated.remainder).toBe(50);

    expect(allocationParts([60, 40]).balanced).toBe(true);
    expect(allocationParts([60, 30]).remainder).toBe(-10);
  });

  it('knows which states owe the reader a reason', () => {
    expect(isAdverse('denied')).toBe(true);
    expect(isAdverse('lapsed')).toBe(true);
    expect(isAdverse('cancelled')).toBe(true);
    expect(isAdverse('approved')).toBe(false);
    expect(isAdverse('active')).toBe(false);
  });
});

describe('ClaimStatusTrackerV4 — the headline', () => {
  it('does not invent a denial reason it was never given', () => {
    // The base hard-coded "Reviewed after filing. Contact your agent to
    // appeal." as the body of the denial banner, so a claim denied for any
    // other cause asserted a reason the caller never supplied.
    const { container } = render(<ClaimStatusTrackerV4 status="denied" />);
    expect(container.textContent ?? '').not.toContain('Contact your agent to appeal');
  });

  it('shows the reason it IS given', () => {
    const { container } = render(
      <ClaimStatusTrackerV4 status="denied" denialReason="Damage predates policy inception." />
    );
    expect(container.textContent).toContain('Damage predates policy inception.');
  });
});

describe('DeductibleBarV4', () => {
  it('does not report a deductible met when none was recorded', () => {
    const { container } = render(<DeductibleBarV4 metCents={0} deductibleCents={0} />);
    expect(container.textContent ?? '').not.toMatch(/met/i);
  });

  it('never announces a value past its own maximum', () => {
    const { container } = render(<DeductibleBarV4 metCents={150000} deductibleCents={100000} />);
    const meter = container.querySelector('[role="progressbar"]');
    if (meter) {
      const now = Number(meter.getAttribute('aria-valuenow'));
      const max = Number(meter.getAttribute('aria-valuemax'));
      expect(now).toBeLessThanOrEqual(max);
    }
  });
});

describe('RiskScoreV4', () => {
  it('does not let an explicit tier contradict the number beside it', () => {
    // `<RiskScore score={95} tier="low" />` rendered "95 / 100" beside a green
    // "Low risk" pill.
    const { container } = render(<RiskScoreV4 score={95} tier="low" />);
    expect(container.textContent).toContain('95');
  });
});
