/**
 * The **V4 finance line** (native) — the twin of `finance/v4-line.spec.tsx`.
 * The money pass is the same pure module, so the sign, precision and meter
 * findings are pinned once and hold on both sides.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { lineTotal, meterParts, ratePrecision, signParts } from '../../finance/money-v4';
import { BudgetBarV4 } from './BudgetBarV4';
import { MoneyAmountV4 } from './MoneyAmountV4';

describe('money-v4', () => {
  it('lets a forced tone win over the sign', () => {
    // The base derived the announced direction from the sign while the colour
    // came from `tone`, so a caller passing an unsigned magnitude with
    // tone="expense" — which is what that prop is for — got a red amount
    // announced as "credit $12.00".
    expect(signParts(1200, 'expense').direction).toBe('debit');
    expect(signParts(1200, 'expense').tone).toBe('danger');
    expect(signParts(-1200, 'income').direction).toBe('credit');
  });

  it('gives a neutral figure no direction at all', () => {
    // An account balance, an invoice total and a category spend are not
    // credits. An earlier draft of this helper let them fall through to the
    // sign, so a positive balance announced as "credit $412.00".
    expect(signParts(41200, 'neutral')).toMatchObject({ direction: 'zero', word: '', tone: 'neutral' });
    expect(signParts(41200, 'muted').direction).toBe('zero');
  });

  it('does not call zero a gain', () => {
    expect(signParts(0).direction).toBe('zero');
    expect(signParts(0).tone).toBe('neutral');
    expect(signParts(0).sign).toBe('');
  });

  it('carries a glyph and a word, so direction is never hue alone', () => {
    expect(signParts(-1).sign).toBe('−');
    expect(signParts(1).sign).toBe('+');
    expect(signParts(-1).word).toBe('debit');
  });

  it('keeps a fractional line total honest', () => {
    // The base truncated the unit price and left the quantity alone, so
    // 333 x 3.5 produced 1165.5 — floored to $11.65 — while the breakdown
    // line above it printed the honest "3.5 x $3.33".
    expect(lineTotal(333, 3.5)).toBe(1166);
    expect(lineTotal(333.9, 2)).toBe(666);
    expect(lineTotal(100, 0)).toBe(0);
  });

  it('reports the clamped ratio and the true percent separately', () => {
    // The base clamped the bar and left the announced percentage uncapped, so
    // at 300% spent one element reported aria-valuenow="100" beside a name
    // saying "300% of budget used". Both numbers are real; they are not the
    // same number.
    const over = meterParts(30000, 10000);
    expect(over.ratio).toBe(1);
    expect(over.percent).toBe(300);
    expect(over.over).toBe(true);

    expect(meterParts(5000, 10000)).toMatchObject({ ratio: 0.5, percent: 50, over: false });
    // No budget is not a full bar.
    expect(meterParts(5000, 0)).toMatchObject({ ratio: 0, percent: 0, over: false });
  });

  it('keeps a rate precision inside what toFixed will accept', () => {
    // The base clamped at the bottom and not the top, so anything above 100
    // threw a RangeError.
    expect(ratePrecision(4)).toBe(4);
    expect(ratePrecision(999)).toBe(20);
    expect(ratePrecision(-3)).toBe(0);
    expect(ratePrecision(Number.NaN)).toBe(2);
  });
});

describe('MoneyAmountV4 / BudgetBarV4', () => {
  it('announces a forced tone rather than the sign', () => {
    const { getByLabelText } = renderThemed(
      <MoneyAmountV4 cents={1200} tone="expense" />,
      SEED_LIGHT
    );
    expect(getByLabelText(/debit/i)).toBeTruthy();
  });

  it('does not announce a balance as a credit', () => {
    const { queryByLabelText } = renderThemed(
      <MoneyAmountV4 cents={41200} tone="neutral" />,
      SEED_LIGHT
    );
    expect(queryByLabelText(/credit/i)).toBeNull();
  });

  it('renders a budget bar', () => {
    const { getByText } = renderThemed(
      <BudgetBarV4 label="Groceries" spentCents={5000} limitCents={10000} />,
      SEED_LIGHT
    );
    expect(getByText('Groceries')).toBeTruthy();
  });
});
