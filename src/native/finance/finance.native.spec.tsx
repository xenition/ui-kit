import * as React from 'react';
import { StyleSheet } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { MoneyAmount } from './MoneyAmount';
import { TransactionRow } from './TransactionRow';
import { AccountCard } from './AccountCard';
import { BalanceHeader } from './BalanceHeader';
import { BudgetBar } from './BudgetBar';
import { CreditCardView } from './CreditCardView';
import { StatementList, type StatementEntry } from './StatementList';
import { SavingsGoalCard } from './SavingsGoalCard';
import { TransferForm, type TransferValues } from './TransferForm';
import { ExchangeRateRow } from './ExchangeRateRow';
import { maskCardNumber } from './internal/mask';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('MoneyAmount (native)', () => {
  it('formats integer cents to two decimals with no drift', () => {
    const { getByText } = renderThemed(<MoneyAmount cents={123456789} />, SEED_LIGHT);
    // +$1,234,567.89 — signDisplay defaults to auto (no + for positives).
    expect(getByText('$1,234,567.89')).toBeTruthy();
  });

  it('tones income as success and expense as danger, using the AA *Text slots', () => {
    // FILL-AS-TEXT: money is TEXT, so it reads successText / dangerText.
    const income = renderThemed(<MoneyAmount cents={2500} tone="income" />, SEED_LIGHT);
    expect(flatten(income.getByText('$25.00').props.style).color).toBe(lightColors.successText);

    const expense = renderThemed(
      <MoneyAmount cents={-2500} tone="expense" signDisplay="never" />,
      SEED_LIGHT
    );
    expect(flatten(expense.getByText('$25.00').props.style).color).toBe(lightColors.dangerText);
  });

  it('shows a leading minus for negative amounts by default', () => {
    const { getByText } = renderThemed(<MoneyAmount cents={-499} />, SEED_LIGHT);
    expect(getByText('−$4.99')).toBeTruthy();
  });
});

describe('TransactionRow (native)', () => {
  it('renders title/amount and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TransactionRow
        title="Blue Bottle Coffee"
        subtitle="Dining"
        amountCents={640}
        direction="expense"
        icon="☕"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Blue Bottle Coffee')).toBeTruthy();
    // Expense → signDisplay always → leading minus.
    expect(getByText('−$6.40')).toBeTruthy();
    fireEvent.press(getByLabelText('Blue Bottle Coffee'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('AccountCard (native)', () => {
  it('renders name, masked number, and balance per variant', () => {
    const { getByText } = renderThemed(
      <AccountCard
        name="Everyday Checking"
        variant="checking"
        balanceCents={482355}
        accountNumber="1234 5678 9012 4242"
      />,
      SEED_DARK
    );
    expect(getByText('Everyday Checking')).toBeTruthy();
    expect(getByText('•• 4242')).toBeTruthy();
    expect(getByText('$4,823.55')).toBeTruthy();
  });
});

describe('BudgetBar (native)', () => {
  it('reads spent/limit and tones the over-budget remainder as danger', () => {
    const { getByText } = renderThemed(
      <BudgetBar label="Groceries" spentCents={52000} limitCents={40000} />,
      SEED_LIGHT
    );
    expect(getByText('$520.00 / $400.00')).toBeTruthy();
    expect(getByText('Over budget')).toBeTruthy();
    // Over-budget remainder ($120.00) rendered in the danger *Text token.
    expect(flatten(getByText('$120.00').props.style).color).toBe(lightColors.dangerText);
  });

  it('guards a zero limit without dividing by zero', () => {
    const { getByText } = renderThemed(
      <BudgetBar label="Uncategorized" spentCents={1000} limitCents={0} />,
      SEED_LIGHT
    );
    expect(getByText('$10.00 / $0.00')).toBeTruthy();
  });
});

describe('CreditCardView (native)', () => {
  it('masks the number to the last four and shows the holder', () => {
    const { getByText } = renderThemed(
      <CreditCardView holder="Ada Lovelace" number="4111111111114242" expiry="08/28" brand="visa" />,
      SEED_LIGHT
    );
    expect(getByText(maskCardNumber('4111111111114242'))).toBeTruthy();
    expect(getByText('•••• •••• •••• 4242')).toBeTruthy();
    expect(getByText('ADA LOVELACE')).toBeTruthy();
    expect(getByText('VISA')).toBeTruthy();
  });
});

describe('SavingsGoalCard (native)', () => {
  it('renders title, saved/target, and a to-go figure', () => {
    const { getByText } = renderThemed(
      <SavingsGoalCard title="Emergency fund" savedCents={300000} targetCents={1000000} />,
      SEED_LIGHT
    );
    expect(getByText('Emergency fund')).toBeTruthy();
    expect(getByText('$3,000.00')).toBeTruthy();
    expect(getByText('/ $10,000.00')).toBeTruthy();
    expect(getByText(/\$7,000\.00 to go/)).toBeTruthy();
  });
});

describe('ExchangeRateRow (native)', () => {
  it('formats the rate and tones a positive change as success', () => {
    const { getByText } = renderThemed(
      <ExchangeRateRow baseCurrency="USD" quoteCurrency="EUR" rate={0.9231} changePct={0.42} />,
      SEED_LIGHT
    );
    expect(getByText('0.9231')).toBeTruthy();
    const change = getByText(/\+0\.42%/);
    // FILL-AS-TEXT: the change chip is TEXT → successText.
    expect(flatten(change.props.style).color).toBe(lightColors.successText);
  });
});

describe('TransferForm (native)', () => {
  it('emits cents on amount change and blocks submit until valid', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const accounts = [
      { id: 'a', label: 'Checking' },
      { id: 'b', label: 'Savings' },
    ];
    // Invalid state: no accounts chosen → submit is a no-op.
    const invalid = renderThemed(
      <TransferForm accounts={accounts} onChange={onChange} onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.press(invalid.getByText('Transfer'));
    expect(onSubmit).not.toHaveBeenCalled();

    // Amount edit reports integer cents (12.34 → 1234).
    fireEvent.changeText(invalid.getByLabelText('Transfer amount'), '12.34');
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ amountCents: 1234 } satisfies Partial<TransferValues>)
    );

    // Fully valid controlled state → submit fires with the value bag.
    const valid = renderThemed(
      <TransferForm
        accounts={accounts}
        fromAccountId="a"
        toAccountId="b"
        amountCents={5000}
        onSubmit={onSubmit}
      />,
      SEED_LIGHT
    );
    fireEvent.press(valid.getByText('Transfer'));
    expect(onSubmit).toHaveBeenCalledWith({
      fromAccountId: 'a',
      toAccountId: 'b',
      amountCents: 5000,
      note: '',
    });
  });
});

describe('StatementList (native)', () => {
  const entries: StatementEntry[] = [
    { id: '1', title: 'Payroll', amountCents: 250000, direction: 'income', date: 'Aug 1' },
    { id: '2', title: 'Rent', amountCents: 180000, direction: 'expense', date: 'Aug 2' },
    { id: '3', title: 'Refund', amountCents: 1299, direction: 'income', date: 'Aug 3' },
  ];

  it('renders each entry as a pressable row', () => {
    const onSelect = jest.fn();
    const { getByText } = renderThemed(
      <StatementList items={entries} header="August" onSelectItem={onSelect} />,
      SEED_LIGHT
    );
    expect(getByText('Payroll')).toBeTruthy();
    expect(getByText('Rent')).toBeTruthy();
    fireEvent.press(getByText('Refund'));
    expect(onSelect).toHaveBeenCalledWith(entries[2], 2);
  });

  it('renders an EmptyState when there are no transactions', () => {
    const { getByText, queryByText } = renderThemed(
      <StatementList items={[]} emptyTitle="No activity yet" />,
      SEED_DARK
    );
    expect(getByText('No activity yet')).toBeTruthy();
    expect(queryByText('Payroll')).toBeNull();
  });
});

describe('appearance diversity (native finance)', () => {
  it('mounts non-classic appearance presets on cards and rows', () => {
    // elevated (shadow, no border) + one more (filled) must both render.
    const { getByText } = renderThemed(
      <>
        <AccountCard name="Wallet A" variant="checking" balanceCents={482355} appearance="elevated" />
        <TransactionRow title="Coffee" amountCents={640} direction="expense" icon="☕" appearance="filled" />
        <SavingsGoalCard title="Fund" savedCents={300000} targetCents={1000000} appearance="outline" />
      </>,
      SEED_LIGHT
    );
    expect(getByText('Wallet A')).toBeTruthy();
    expect(getByText('Coffee')).toBeTruthy();
    expect(getByText('Fund')).toBeTruthy();
  });

  it('keeps the default (classic) appearance byte-identical — no added surface layer', () => {
    // A classic bare row must not gain a background/border it never had.
    const { getByText } = renderThemed(
      <TransactionRow title="Rent" amountCents={180000} direction="expense" />,
      SEED_LIGHT
    );
    const rowStyle = flatten(getByText('Rent').parent?.parent?.props.style);
    expect(rowStyle.backgroundColor).toBeUndefined();
    expect(rowStyle.borderWidth).toBeUndefined();
  });
});

describe('motion (native finance)', () => {
  it('mounts a press-scale pressable row and a mount-enter list without error', () => {
    const onPress = jest.fn();
    const press = renderThemed(
      <TransactionRow title="Tap me" amountCents={100} onPress={onPress} />,
      SEED_LIGHT
    );
    // Pressable is wrapped in an Animated.View; the row still fires its callback.
    fireEvent.press(press.getByText('Tap me'));
    expect(onPress).toHaveBeenCalledTimes(1);

    // BalanceHeader (hero) + StatementList rows both mount via useEnter.
    const enter = renderThemed(
      <>
        <BalanceHeader balanceCents={482355} changeCents={1200} changePct={2.4} />
        <StatementList
          items={[{ id: '1', title: 'Payroll', amountCents: 250000, direction: 'income' }]}
        />
      </>,
      SEED_LIGHT
    );
    expect(enter.getByText('Payroll')).toBeTruthy();
    expect(enter.getByText('$4,823.55')).toBeTruthy();
  });
});

describe('token purity (native finance, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <MoneyAmount cents={-2500} tone="expense" />
          <TransactionRow title="Coffee" amountCents={640} direction="expense" icon="☕" />
          <AccountCard name="Checking" variant="checking" balanceCents={482355} />
          <BudgetBar label="Groceries" spentCents={52000} limitCents={40000} />
          <CreditCardView holder="Ada" number="4111111111114242" variant="accent" />
          <SavingsGoalCard title="Fund" savedCents={300000} targetCents={1000000} />
          <ExchangeRateRow baseCurrency="USD" quoteCurrency="EUR" rate={0.92} changePct={-0.3} />
          <StatementList items={[]} />
          {/* Non-classic appearance presets must also stay token-pure. */}
          <AccountCard name="Savings" variant="savings" balanceCents={90000} appearance="elevated" />
          <TransactionRow title="Rent" amountCents={180000} direction="expense" appearance="filled" />
          <SavingsGoalCard title="Trip" savedCents={5000} targetCents={20000} appearance="outline" />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
