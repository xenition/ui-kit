/**
 * The **V4 insurance line** (native) — the twin of
 * `insurance/v4-line.spec.tsx`. The coverage pass is the same pure module, so
 * the deductible, score, premium and allocation findings are pinned once and
 * hold on both sides.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import {
  allocationParts,
  deductibleParts,
  isAdverse,
  premiumParts,
  scoreParts,
} from '../../insurance/coverage-v4';
import { ClaimStatusTrackerV4 } from './ClaimStatusTrackerV4';

describe('coverage-v4', () => {
  it('announces a whole percent, not the float the caption disagreed with', () => {
    expect(deductibleParts(10000, 30000).percent).toBe(33);
  });

  it('treats a ceiling of nought as no deductible, not as one already met', () => {
    const none = deductibleParts(0, 0);
    expect(none.hasCeiling).toBe(false);
    expect(none.satisfied).toBe(false);
    expect(none.ratio).toBeUndefined();
  });

  it('keeps the money applied beyond the ceiling', () => {
    expect(deductibleParts(150000, 100000)).toMatchObject({
      met: 150000,
      over: 50000,
      satisfied: true,
      ratio: 1,
    });
  });

  it('reads a score against the caller own scale', () => {
    const credit = scoreParts(720, 300, 850);
    expect(credit.value).toBe(720);
    expect(credit.outOfRange).toBe(false);
    expect(scoreParts(95, 0, 50).outOfRange).toBe(true);
    expect(Number.isFinite(scoreParts(5, 10, 10).ratio)).toBe(true);
  });

  it('reports a total that contradicts its own lines', () => {
    expect(premiumParts([5000, 4000, 3000], 9900)).toMatchObject({
      derived: 12000,
      total: 9900,
      reconciles: false,
    });
  });

  it('reads beneficiary allocations as a set', () => {
    expect(allocationParts([50, 50, 50])).toMatchObject({
      total: 150,
      balanced: false,
      remainder: 50,
    });
  });

  it('knows which states owe the reader a reason', () => {
    expect(isAdverse('denied')).toBe(true);
    expect(isAdverse('lapsed')).toBe(true);
    expect(isAdverse('active')).toBe(false);
  });
});

describe('ClaimStatusTrackerV4 — the headline', () => {
  it('does not invent a denial reason it was never given', () => {
    const { queryByText } = renderThemed(<ClaimStatusTrackerV4 status="denied" />, SEED_LIGHT);
    expect(queryByText(/Contact your agent to appeal/)).toBeNull();
  });

  it('shows the reason it IS given', () => {
    const { getByText } = renderThemed(
      <ClaimStatusTrackerV4 status="denied" denialReason="Damage predates policy inception." />,
      SEED_LIGHT
    );
    expect(getByText(/Damage predates policy inception\./)).toBeTruthy();
  });
});
