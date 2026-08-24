/**
 * Alternate finance designs (v2 / v3) — the drop-in redesigns of the four
 * most-used native finance blocks. Each variant keeps the base component's exact
 * props, so these specs prove they (a) mount, (b) stay token-pure under BOTH
 * seeds (no hardcoded hex — every color traces to a compiled token), and (c)
 * remain interactive where the base was.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { TransactionRowV2 } from './TransactionRowV2';
import { TransactionRowV3 } from './TransactionRowV3';
import { AccountCardV2 } from './AccountCardV2';
import { AccountCardV3 } from './AccountCardV3';
import { BalanceHeaderV2 } from './BalanceHeaderV2';
import { BalanceHeaderV3 } from './BalanceHeaderV3';
import { SavingsGoalCardV2 } from './SavingsGoalCardV2';
import { SavingsGoalCardV3 } from './SavingsGoalCardV3';

describe('TransactionRow alternates (native)', () => {
  it('V2 mounts as a card row and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TransactionRowV2
        title="Blue Bottle Coffee"
        subtitle="Dining"
        amountCents={640}
        direction="expense"
        icon="☕"
        date="Aug 2"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Blue Bottle Coffee')).toBeTruthy();
    expect(getByText('−$6.40')).toBeTruthy();
    fireEvent.press(getByLabelText('Blue Bottle Coffee'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 mounts as a dense line and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TransactionRowV3
        title="Payroll"
        subtitle="ACME Inc"
        amountCents={250000}
        direction="income"
        onPress={onPress}
      />,
      SEED_DARK
    );
    expect(getByText('Payroll')).toBeTruthy();
    expect(getByText('+$2,500.00')).toBeTruthy();
    fireEvent.press(getByLabelText('Payroll'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('AccountCard alternates (native)', () => {
  it('V2 renders a card face with name + balance', () => {
    const { getByText } = renderThemed(
      <AccountCardV2
        name="Everyday Checking"
        variant="checking"
        balanceCents={482355}
        accountNumber="1234 5678 9012 4242"
      />,
      SEED_LIGHT
    );
    expect(getByText('Everyday Checking')).toBeTruthy();
    expect(getByText('$4,823.55')).toBeTruthy();
    expect(getByText('•• 4242')).toBeTruthy();
  });

  it('V3 renders a dot list row and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <AccountCardV3
        name="Rainy Day"
        variant="savings"
        balanceCents={90000}
        onPress={onPress}
      />,
      SEED_DARK
    );
    expect(getByText('Rainy Day')).toBeTruthy();
    expect(getByText('$900.00')).toBeTruthy();
    fireEvent.press(getByLabelText('Rainy Day, Savings account'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('BalanceHeader alternates (native)', () => {
  it('V2 renders a centered hero with a change chip + sparkline', () => {
    const { getByText } = renderThemed(
      <BalanceHeaderV2
        balanceCents={482355}
        changeCents={1200}
        changePct={2.4}
        trend={[3, 5, 4, 8, 6, 9]}
      />,
      SEED_LIGHT
    );
    expect(getByText('$4,823.55')).toBeTruthy();
    expect(getByText(/\$12\.00 \(\+2\.4%\)/)).toBeTruthy();
  });

  it('V3 renders a compact figure with an inline change chip; honors loading', () => {
    const { getByText, getByLabelText } = renderThemed(
      <BalanceHeaderV3 balanceCents={482355} changeCents={-800} changePct={-1.1} />,
      SEED_DARK
    );
    expect(getByText('$4,823.55')).toBeTruthy();
    expect(getByText('-1.1%')).toBeTruthy();

    const loading = renderThemed(<BalanceHeaderV3 balanceCents={0} loading />, SEED_LIGHT);
    expect(loading.getByLabelText('Loading balance')).toBeTruthy();
  });
});

describe('SavingsGoalCard alternates (native)', () => {
  it('V2 renders a ring hero with saved/target', () => {
    const { getByText } = renderThemed(
      <SavingsGoalCardV2 title="Emergency fund" savedCents={300000} targetCents={1000000} />,
      SEED_LIGHT
    );
    expect(getByText('Emergency fund')).toBeTruthy();
    expect(getByText('$3,000.00')).toBeTruthy();
    expect(getByText(/\$7,000\.00 to go/)).toBeTruthy();
  });

  it('V3 renders a milestone bar and guards a zero target', () => {
    const { getByText, getByLabelText } = renderThemed(
      <SavingsGoalCardV3 title="Vacation" savedCents={5000} targetCents={20000} deadline="Dec" />,
      SEED_DARK
    );
    expect(getByText('Vacation')).toBeTruthy();
    expect(getByText('25%')).toBeTruthy();
    expect(getByLabelText('Vacation, 25% saved')).toBeTruthy();

    // Zero target must not divide-by-zero → 0%.
    const zero = renderThemed(
      <SavingsGoalCardV3 title="Empty" savedCents={1000} targetCents={0} />,
      SEED_LIGHT
    );
    expect(zero.getByText('0%')).toBeTruthy();
  });
});

describe('token purity — finance alternates (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <TransactionRowV2 title="Coffee" subtitle="Dining" amountCents={640} direction="expense" icon="☕" date="Aug 2" />
          <TransactionRowV3 title="Rent" subtitle="Home" amountCents={180000} direction="expense" date="Aug 1" />
          <AccountCardV2 name="Checking" variant="checking" balanceCents={482355} accountNumber="4242" />
          <AccountCardV2 name="Credit" variant="credit" balanceCents={-12000} />
          <AccountCardV3 name="Savings" variant="savings" balanceCents={90000} accountNumber="1111" />
          <BalanceHeaderV2 balanceCents={482355} changeCents={1200} changePct={2.4} trend={[3, 5, 4, 8, 6]} />
          <BalanceHeaderV3 balanceCents={482355} changeCents={-800} changePct={-1.1} />
          <SavingsGoalCardV2 title="Fund" savedCents={300000} targetCents={1000000} />
          <SavingsGoalCardV3 title="Trip" savedCents={5000} targetCents={20000} deadline="Dec" />
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
