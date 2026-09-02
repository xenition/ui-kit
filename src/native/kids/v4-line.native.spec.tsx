/**
 * The **V4 kids line** (native) — the twin of `kids/v4-line.spec.tsx`. The
 * family pass is the same pure module, so the clamped-measurement and
 * award-gesture findings are pinned once and hold on both sides.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { meterParts, needsExplanation, nextAward, starParts } from '../../kids/family-v4';
import { ScreenTimeBarV4 } from './ScreenTimeBarV4';

describe('family-v4', () => {
  it('never rewrites the measurement to fit the limit', () => {
    const over = meterParts(180, 120);
    expect(over.value).toBe(180);
    expect(over.over).toBe(60);
    expect(over.reached).toBe(true);
    expect(over.ratio).toBe(1);
    expect(over.percent).toBe(100);
  });

  it('keeps a broken reading distinct from a real nought', () => {
    expect(meterParts(-30, 120).value).toBe(-30);
    expect(meterParts(-30, 120).ratio).toBe(0);
    expect(meterParts(Number.NaN, 120).valid).toBe(false);
  });

  it('treats no limit as no limit, and still keeps the reading', () => {
    const unset = meterParts(240, 0);
    expect(unset.hasLimit).toBe(false);
    expect(unset.ratio).toBeUndefined();
    expect(unset.value).toBe(240);
    expect(unset.valid).toBe(true);
  });

  it('reads an ordinary allowance', () => {
    expect(meterParts(90, 120)).toMatchObject({
      value: 90,
      limit: 120,
      ratio: 0.75,
      percent: 75,
      remaining: 30,
      reached: false,
      hasLimit: true,
    });
  });

  it('never takes a star away on an award', () => {
    // A parent at five of five who tapped once more silently dropped the child
    // to ONE star, with no undo.
    expect(nextAward(5, 5)).toBeUndefined();
    expect(nextAward(4, 5)).toBe(5);
    expect(nextAward(0, 0)).toBeUndefined();
  });

  it('reports an out-of-range star count instead of laundering it', () => {
    expect(starParts(9, 5)).toMatchObject({ filled: 5, outOfRange: true });
    expect(starParts(3, 5)).toMatchObject({ filled: 3, outOfRange: false });
  });

  it('knows which states owe a neutral explanation', () => {
    expect(needsExplanation('skipped')).toBe(true);
    expect(needsExplanation('done')).toBe(false);
  });
});

describe('ScreenTimeBarV4 — the headline', () => {
  it('never announces a value past its own maximum', () => {
    const { getAllByRole } = renderThemed(
      <ScreenTimeBarV4 used={180} limit={120} />,
      SEED_LIGHT
    );
    const meters = getAllByRole('progressbar');
    expect(meters.length).toBeGreaterThan(0);
    const value = meters[0]?.props.accessibilityValue;
    expect(value).toBeDefined();
    expect(value.now).toBeLessThanOrEqual(value.max);
  });
});
