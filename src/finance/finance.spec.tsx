/** @jest-environment jsdom */
/**
 * Web finance components (jsdom, plain expect): each renders, binds to a
 * `--xen-*` token class (never a literal color), and honors its interaction
 * contract — including the empty `StatementList` and the `TransferForm` submit
 * gate. Money stays integer cents through `MoneyAmount`.
 */
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { MoneyAmount } from './MoneyAmount';
import { TransactionRow } from './TransactionRow';
import { BudgetBar } from './BudgetBar';
import { CreditCardView } from './CreditCardView';
import { StatementList, type StatementEntry } from './StatementList';
import { TransferForm } from './TransferForm';
import { ExchangeRateRow } from './ExchangeRateRow';
import { PaymentMethodRow } from './PaymentMethodRow';
import { maskCardNumber } from './internal/mask';

describe('finance (web)', () => {
  it('MoneyAmount formats integer cents with no drift and tones income success', () => {
    const { getByText } = render(<MoneyAmount cents={2500} tone="income" />);
    const el = getByText('$25.00');
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toContain('text-success');
  });

  it('MoneyAmount shows a leading minus for negatives and tones them danger', () => {
    const { getByText } = render(<MoneyAmount cents={-499} />);
    expect(getByText('−$4.99').className).toContain('text-danger');
  });

  it('TransactionRow renders title/amount and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <TransactionRow
        title="Blue Bottle Coffee"
        subtitle="Dining"
        amountCents={640}
        direction="expense"
        icon="☕"
        onClick={onClick}
      />
    );
    expect(getByText('Blue Bottle Coffee')).toBeTruthy();
    // Expense → signDisplay always → leading minus.
    expect(getByText('−$6.40')).toBeTruthy();
    getByText('Blue Bottle Coffee').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('BudgetBar reads spent/limit and tones the over-budget remainder danger', () => {
    const { getByText } = render(<BudgetBar label="Groceries" spentCents={52000} limitCents={40000} />);
    expect(getByText('$520.00 / $400.00')).toBeTruthy();
    expect(getByText('Over budget')).toBeTruthy();
    expect(getByText('$120.00').className).toContain('text-danger');
  });

  it('CreditCardView masks the number, upcases the holder, uses a token gradient', () => {
    const { getByText, getByRole } = render(
      <CreditCardView holder="Ada Lovelace" number="4111111111114242" expiry="08/28" brand="visa" />
    );
    expect(getByText(maskCardNumber('4111111111114242'))).toBeTruthy();
    expect(getByText('•••• •••• •••• 4242')).toBeTruthy();
    expect(getByText('ADA LOVELACE')).toBeTruthy();
    expect(getByText('VISA')).toBeTruthy();
    // Gradient is painted from token ramp vars, not a literal hex.
    expect(getByRole('img').className).toContain('from-[var(--xen-primary)]');
  });

  it('StatementList renders an EmptyState when there are no transactions', () => {
    const { getByText, queryByText } = render(<StatementList items={[]} emptyTitle="No activity yet" />);
    expect(getByText('No activity yet')).toBeTruthy();
    expect(queryByText('Payroll')).toBeNull();
  });

  it('StatementList renders each entry and fires onSelectItem with entry + index', () => {
    const onSelect = jest.fn();
    const entries: StatementEntry[] = [
      { id: '1', title: 'Payroll', amountCents: 250000, direction: 'income' },
      { id: '2', title: 'Rent', amountCents: 180000, direction: 'expense' },
    ];
    const { getByText } = render(
      <StatementList items={entries} header="August" onSelectItem={onSelect} />
    );
    expect(getByText('August')).toBeTruthy();
    getByText('Rent').click();
    expect(onSelect).toHaveBeenCalledWith(entries[1], 1);
  });

  it('TransferForm blocks submit until valid, then fires with the value bag', () => {
    const onSubmit = jest.fn();
    const accounts = [
      { id: 'a', label: 'Checking' },
      { id: 'b', label: 'Savings' },
    ];
    // Invalid: nothing chosen → the disabled submit is a no-op.
    const invalid = render(<TransferForm accounts={accounts} onSubmit={onSubmit} />);
    invalid.getByText('Transfer').click();
    expect(onSubmit).not.toHaveBeenCalled();
    invalid.unmount();

    // Fully valid controlled state → submit fires with integer cents.
    const valid = render(
      <TransferForm accounts={accounts} fromAccountId="a" toAccountId="b" amountCents={5000} onSubmit={onSubmit} />
    );
    valid.getByText('Transfer').click();
    expect(onSubmit).toHaveBeenCalledWith({
      fromAccountId: 'a',
      toAccountId: 'b',
      amountCents: 5000,
      note: '',
    });
    valid.unmount();
  });

  it('ExchangeRateRow formats the rate and tones a positive change success', () => {
    const { getByText } = render(
      <ExchangeRateRow baseCurrency="USD" quoteCurrency="EUR" rate={0.9231} changePct={0.42} />
    );
    expect(getByText('0.9231')).toBeTruthy();
    expect(getByText(/\+0\.42%/).className).toContain('text-success');
  });

  it('PaymentMethodRow marks selection with a primary ring and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText } = render(
      <PaymentMethodRow label="Visa" last4="4242" selected onClick={onClick} />
    );
    expect(getByLabelText('Selected')).toBeTruthy();
    getByText('Visa').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards a ref to the MoneyAmount span root', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<MoneyAmount cents={100} ref={ref} />);
    expect(ref.current?.tagName).toBe('SPAN');
  });
});
