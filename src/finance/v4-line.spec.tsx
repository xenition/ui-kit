/** @jest-environment jsdom */
/**
 * The **V4 finance line** (web) — the money pass, and the finding this module
 * exists for: a credit card illegible in both schemes.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { lineTotal, meterParts, ratePrecision, signParts } from './money-v4';
import { BudgetBarV4 } from './BudgetBarV4';
import { PaymentMethodRowV4 } from './PaymentMethodRowV4';
import { TransferFormV4 } from './TransferFormV4';

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

describe('TransferFormV4', () => {
  it('works uncontrolled — the base could never enable its own submit', () => {
    // Every value prop is optional with a default, the component held no
    // state, and onChange is optional: the selects never changed, the amount
    // field never accepted a number, and canSubmit — which requires
    // amountCents > 0 — could never become true.
    const accounts = [
      { id: 'a', label: 'Current' },
      { id: 'b', label: 'Savings' },
    ];
    const { getByLabelText } = render(
      <TransferFormV4 accounts={accounts} onSubmit={jest.fn()} />
    );
    const amount = getByLabelText(/amount/i) as HTMLInputElement;
    fireEvent.change(amount, { target: { value: '12.50' } });
    expect(amount.value).toContain('12.5');
  });
});

describe('BudgetBarV4', () => {
  it('reports the true percent while the bar stays in its track', () => {
    const { getByRole } = render(<BudgetBarV4 label="Groceries" spentCents={30000} limitCents={10000} />);
    const meter = getByRole('progressbar');
    expect(meter.getAttribute('aria-valuenow')).toBe('100');
    expect(meter.getAttribute('aria-valuetext') ?? meter.getAttribute('aria-label') ?? '').toContain('300');
  });
});

describe('PaymentMethodRowV4', () => {
  it('renders the brand it accepts', () => {
    // `brand` was destructured into a dead binding, so a Visa row and an Amex
    // row were the same glyph.
    const { container } = render(
      <PaymentMethodRowV4 label="Personal" kind="card" brand="visa" last4="4242" />
    );
    expect(container.textContent).toMatch(/visa/i);
  });

  it('masks through the module\'s own masker', () => {
    // The base concatenated, so last4="4242 1234" printed verbatim.
    const { container } = render(
      <PaymentMethodRowV4 label="Personal" kind="card" last4="4242 1234" />
    );
    expect(container.textContent).toContain('1234');
    expect(container.textContent).not.toContain('4242 1234');
  });
});
