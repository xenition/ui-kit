/** @jest-environment jsdom */
/**
 * Alternate finance designs (v2 / v3) for the web (React DOM) — the drop-in
 * redesigns of the four most-used finance blocks. Each variant keeps the base
 * component's exact props, so these specs prove they (a) mount, (b) stay
 * token-pure (no literal hex in any inline style — every color traces to a
 * `--xen-*` token class), and (c) honor their key interaction / state contract.
 */
import { fireEvent, render } from '@testing-library/react';
import { AccountCardV2 } from './AccountCardV2';
import { AccountCardV3 } from './AccountCardV3';
import { BalanceHeaderV2 } from './BalanceHeaderV2';
import { BalanceHeaderV3 } from './BalanceHeaderV3';
import { SavingsGoalCardV2 } from './SavingsGoalCardV2';
import { SavingsGoalCardV3 } from './SavingsGoalCardV3';
import { TransactionRowV2 } from './TransactionRowV2';
import { TransactionRowV3 } from './TransactionRowV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('AccountCard alternates (web)', () => {
  it('V2 renders as a filled card face and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <AccountCardV2 name="Everyday Checking" variant="checking" balanceCents={128000} accountNumber="4242" onClick={onClick} />
    );
    expect(getByText('Everyday Checking')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Everyday Checking, Checking account'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders as a minimal row and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <AccountCardV3 name="Vault Savings" variant="savings" balanceCents={500000} onClick={onClick} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Vault Savings'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('BalanceHeader alternates (web)', () => {
  it('V2 renders the hero figure, change chip, and sparkline token-pure', () => {
    const { getByText, container } = render(
      <BalanceHeaderV2 balanceCents={1234500} changeCents={4200} changePct={3.5} trend={[1, 2, 3, 2, 4]} />
    );
    expect(getByText('$12,345.00')).toBeTruthy();
    expect(getByText(/\+3\.5%/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('V3 shows a loading skeleton, then a compact figure', () => {
    const loading = render(<BalanceHeaderV3 balanceCents={999} loading />);
    expect(loading.getByLabelText('Loading balance')).toBeTruthy();
    loading.unmount();

    const { getByText, container } = render(<BalanceHeaderV3 balanceCents={456700} changeCents={-1000} />);
    expect(getByText('$4,567.00')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('SavingsGoalCard alternates (web)', () => {
  it('V2 renders a hero ring with title and to-go figure', () => {
    const { getByText, container } = render(
      <SavingsGoalCardV2 title="Emergency fund" savedCents={300000} targetCents={1000000} deadline="Dec" />
    );
    expect(getByText('Emergency fund')).toBeTruthy();
    expect(getByText(/to go/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('V3 renders a milestone bar with a percent and progressbar role', () => {
    const { getByText, getByRole, container } = render(
      <SavingsGoalCardV3 title="New car" savedCents={250000} targetCents={1000000} color="primary" />
    );
    expect(getByText('25%')).toBeTruthy();
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('25');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('TransactionRow alternates (web)', () => {
  it('V2 renders a card row with a signed amount and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <TransactionRowV2 title="Blue Bottle Coffee" subtitle="Dining" amountCents={640} direction="expense" icon="☕" date="Aug 2" onClick={onClick} />
    );
    expect(getByText('−$6.40')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Blue Bottle Coffee'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line, joining subtitle and date, and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <TransactionRowV3 title="Payroll" subtitle="Salary" amountCents={250000} direction="income" date="Aug 1" onClick={onClick} />
    );
    expect(getByText('Salary · Aug 1')).toBeTruthy();
    expect(getByText('+$2,500.00')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Payroll'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
