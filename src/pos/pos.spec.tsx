/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import {
  RegisterKeypad,
  CartLine,
  ReceiptView,
  PaymentMethodTile,
  DiscountRow,
  QuickChargeBar,
  OrderTicket,
  StatusPill,
  PAYMENT_METHOD_META,
} from './index';

describe('@xenition/ui/pos (web)', () => {
  it('StatusPill renders a glyph + word and a token-class fill', () => {
    const { getByText, container } = render(
      <StatusPill meta={PAYMENT_METHOD_META.card} variant="soft" />
    );
    // Word half of the glyph+word contract.
    expect(getByText('Card')).toBeTruthy();
    const pill = container.querySelector('[data-xen-status-pill]') as HTMLElement;
    expect(pill).toBeTruthy();
    // Token class, never a literal color.
    expect(pill.className).toContain('text-primary');
  });

  it('RegisterKeypad taps a digit → onChange + onKeyPress, keys are real buttons', () => {
    const onChange = jest.fn();
    const onKeyPress = jest.fn();
    const { getByRole } = render(
      <RegisterKeypad value="" onChange={onChange} onKeyPress={onKeyPress} />
    );
    const one = getByRole('button', { name: '1' });
    expect(one.tagName).toBe('BUTTON');
    expect(one.className).toContain('bg-surface');
    fireEvent.click(one);
    expect(onChange).toHaveBeenCalledWith('1');
    expect(onKeyPress).toHaveBeenCalledWith('1');
  });

  it('CartLine shows the line total in stable 2-decimal cents', () => {
    const { getByText } = render(
      <CartLine name="Latte" quantity={2} unitPriceCents={450} />
    );
    expect(getByText('Latte')).toBeTruthy();
    // 2 × $4.50 = $9.00
    expect(getByText('$9.00')).toBeTruthy();
  });

  it('DiscountRow (inactive) fires onAdd from the Add-discount button', () => {
    const onAdd = jest.fn();
    const { getByRole } = render(<DiscountRow onAdd={onAdd} />);
    const add = getByRole('button', { name: 'Add discount' });
    fireEvent.click(add);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('PaymentMethodTile is a real button; selected announces aria-pressed + ✓', () => {
    const onClick = jest.fn();
    const { getByRole, getByText } = render(
      <PaymentMethodTile method="card" selected onClick={onClick} amountCents={1999} />
    );
    const tile = getByRole('button', { name: 'Card' });
    expect(tile.getAttribute('aria-pressed')).toBe('true');
    expect(getByText('✓')).toBeTruthy();
    fireEvent.click(tile);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('QuickChargeBar with an EMPTY cart disables Charge and shows the hint', () => {
    const onCharge = jest.fn();
    const { getByRole, getByText } = render(
      <QuickChargeBar totalCents={0} itemCount={0} onCharge={onCharge} />
    );
    expect(getByText('Cart empty')).toBeTruthy();
    const charge = getByRole('button', { name: 'Charge' });
    expect(charge.hasAttribute('disabled')).toBe(true);
    fireEvent.click(charge);
    expect(onCharge).not.toHaveBeenCalled();
  });

  it('QuickChargeBar charges when the cart has items', () => {
    const onCharge = jest.fn();
    const { getByRole, container } = render(
      <QuickChargeBar totalCents={2500} itemCount={2} onCharge={onCharge} />
    );
    // Bar chrome uses token classes only.
    const bar = container.querySelector('[data-xen-quick-charge-bar]') as HTMLElement;
    expect(bar.className).toContain('bg-surface');
    const charge = getByRole('button', { name: 'Charge $25.00' });
    fireEvent.click(charge);
    expect(onCharge).toHaveBeenCalledTimes(1);
  });

  it('ReceiptView with no items renders the empty state', () => {
    const { getByText } = render(<ReceiptView items={[]} totalCents={0} />);
    expect(getByText('No items on this receipt')).toBeTruthy();
  });

  it('OrderTicket with no items renders the empty state', () => {
    const { getByText } = render(<OrderTicket orderNumber="42" items={[]} />);
    expect(getByText('No items on this ticket')).toBeTruthy();
  });
});
