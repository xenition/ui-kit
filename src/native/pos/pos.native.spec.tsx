import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { RegisterKeypad } from './RegisterKeypad';
import { CartLine } from './CartLine';
import { ReceiptView } from './ReceiptView';
import { PaymentMethodTile } from './PaymentMethodTile';
import { DiscountRow } from './DiscountRow';
import { CashDrawerRow } from './CashDrawerRow';
import { ProductGridTile } from './ProductGridTile';
import { SplitBillRow } from './SplitBillRow';
import { RefundRow } from './RefundRow';
import { ShiftReport } from './ShiftReport';
import { QuickChargeBar } from './QuickChargeBar';
import { OrderTicket } from './OrderTicket';

/** Assert every rendered hex traces to a compiled token for `seed`. */
const expectTokenPure = (root: Parameters<typeof renderedStyleHexes>[0], seed = SEED_LIGHT): void => {
  const allowed = tokenHexSet(seed);
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
};

describe('RegisterKeypad (native)', () => {
  it('appends a tapped digit through onChange + onKeyPress', () => {
    const onChange = jest.fn();
    const onKeyPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <RegisterKeypad value="12" onChange={onChange} onKeyPress={onKeyPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('7'));
    expect(onKeyPress).toHaveBeenCalledWith('7');
    expect(onChange).toHaveBeenCalledWith('127');
  });

  it('backspaces and adds a single decimal in amount mode', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <RegisterKeypad value="4.5" onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Backspace'));
    expect(onChange).toHaveBeenLastCalledWith('4.');
    // A second decimal is a no-op (already present).
    onChange.mockClear();
    fireEvent.press(getByLabelText('Decimal point'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders token-pure in dark mode', () => {
    const { root } = renderThemed(<RegisterKeypad value="9" variant="pin" />, SEED_DARK);
    expectTokenPure(root, SEED_DARK);
  });
});

describe('CartLine (native)', () => {
  it('shows the discounted line total and fires void', () => {
    const onVoid = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <CartLine
        name="Flat White"
        quantity={2}
        unitPriceCents={450}
        discountCents={100}
        onQuantityChange={() => undefined}
        onVoid={onVoid}
      />,
      SEED_LIGHT
    );
    // 2 × 450 − 100 = 800
    expect(getByText('$8.00')).toBeTruthy();
    fireEvent.press(getByLabelText('Void Flat White'));
    expect(onVoid).toHaveBeenCalledTimes(1);
  });

  it('drives quantity through the reused stepper', () => {
    const onQty = jest.fn();
    const { getByLabelText } = renderThemed(
      <CartLine name="Croissant" quantity={1} unitPriceCents={350} onQuantityChange={onQty} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Increase quantity'));
    expect(onQty).toHaveBeenCalledWith(2);
  });
});

describe('ReceiptView (native)', () => {
  it('renders totals, tenders, and derived change', () => {
    const { getByText } = renderThemed(
      <ReceiptView
        merchant="Corner Cafe"
        orderNumber="A-1042"
        items={[
          { name: 'Flat White', quantity: 2, amountCents: 900 },
          { name: 'Croissant', amountCents: 350 },
        ]}
        subtotalCents={1250}
        taxCents={100}
        totalCents={1350}
        tenders={[{ method: 'cash', amountCents: 2000 }]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Corner Cafe')).toBeTruthy();
    expect(getByText('$13.50')).toBeTruthy();
    // 2000 − 1350 = 650 change
    expect(getByText('$6.50')).toBeTruthy();
  });

  it('shows an empty state for a receipt with no items (empty cart)', () => {
    const { getByText } = renderThemed(
      <ReceiptView items={[]} totalCents={0} emptyLabel="Nothing rung up" />,
      SEED_DARK
    );
    expect(getByText('Nothing rung up')).toBeTruthy();
  });
});

describe('PaymentMethodTile (native)', () => {
  it('carries selection in accessibilityState and fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <PaymentMethodTile method="card" selected onPress={onPress} amountCents={1350} />,
      SEED_LIGHT
    );
    const tile = getByLabelText('Card');
    expect(tile.props.accessibilityState.selected).toBe(true);
    fireEvent.press(tile);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('DiscountRow (native)', () => {
  it('renders an add affordance and fires onAdd', () => {
    const onAdd = jest.fn();
    const { getByLabelText } = renderThemed(
      <DiscountRow active={false} onAdd={onAdd} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Add discount'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('shows the negative money impact and removes', () => {
    const onRemove = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DiscountRow label="Loyalty" type="percent" value={10} amountCents={135} onRemove={onRemove} />,
      SEED_LIGHT
    );
    expect(getByText('−$1.35')).toBeTruthy();
    fireEvent.press(getByLabelText('Remove Loyalty'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});

describe('CashDrawerRow (native)', () => {
  it('resolves an over/short variance pill from expected vs counted', () => {
    const { getByText } = renderThemed(
      <CashDrawerRow kind="variance" expectedCents={10000} amountCents={9750} />,
      SEED_LIGHT
    );
    expect(getByText('Short')).toBeTruthy();
    expect(getByText('−$2.50')).toBeTruthy();
  });
});

describe('ProductGridTile (native)', () => {
  it('renders initials fallback + price and disables when sold out', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <ProductGridTile name="Iced Latte" priceCents={520} soldOut onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('IL')).toBeTruthy();
    expect(getByText('$5.20')).toBeTruthy();
    const tile = getByLabelText('Iced Latte, $5.20, sold out');
    expect(tile.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(tile);
    expect(onPress).not.toHaveBeenCalled();
    expectTokenPure(tile, SEED_DARK);
  });
});

describe('SplitBillRow (native)', () => {
  it('flags paid and toggles settlement', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SplitBillRow label="Guest 1" amountCents={1200} paid onTogglePaid={onToggle} itemCount={3} />,
      SEED_LIGHT
    );
    expect(getByText('✓ Paid')).toBeTruthy();
    fireEvent.press(getByLabelText('Mark Guest 1 unpaid'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});

describe('RefundRow (native)', () => {
  it('checkbox selection toggles and reflects checked state', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <RefundRow
        name="Ceramic Mug"
        amountCents={2400}
        reason="damaged"
        status="requested"
        variant="selectable"
        selected
        onToggle={onToggle}
      />,
      SEED_LIGHT
    );
    const box = getByLabelText('Refund Ceramic Mug');
    expect(box.props.accessibilityState.checked).toBe(true);
    fireEvent.press(box);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});

describe('ShiftReport (native)', () => {
  it('derives net sales and shows a tender breakdown', () => {
    const { getByText } = renderThemed(
      <ShiftReport
        cashier="Sam"
        grossSalesCents={50000}
        refundsCents={2000}
        transactionCount={42}
        breakdown={[
          { method: 'cash', amountCents: 20000, count: 15 },
          { method: 'card', amountCents: 28000, count: 27 },
        ]}
      />,
      SEED_DARK
    );
    expect(getByText('$480.00')).toBeTruthy(); // net = 50000 − 2000
    expect(getByText('$500.00')).toBeTruthy(); // gross
    expect(getByText('Sam')).toBeTruthy();
  });

  it('shows an empty state for a shift with no sales', () => {
    const { getByText } = renderThemed(
      <ShiftReport grossSalesCents={0} emptyLabel="No sales yet" />,
      SEED_LIGHT
    );
    expect(getByText('No sales yet')).toBeTruthy();
  });
});

describe('QuickChargeBar (native)', () => {
  it('charges the total when the cart has items', () => {
    const onCharge = jest.fn();
    const { getByText } = renderThemed(
      <QuickChargeBar totalCents={1350} itemCount={3} onCharge={onCharge} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Charge $13.50'));
    expect(onCharge).toHaveBeenCalledTimes(1);
  });

  it('disables charging on an empty cart (empty cart)', () => {
    const onCharge = jest.fn();
    const { getByText, getByRole } = renderThemed(
      <QuickChargeBar totalCents={0} itemCount={0} onCharge={onCharge} emptyLabel="Cart empty" />,
      SEED_LIGHT
    );
    expect(getByText('Cart empty')).toBeTruthy();
    const button = getByRole('button');
    expect(button.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(button);
    expect(onCharge).not.toHaveBeenCalled();
  });
});

describe('OrderTicket (native)', () => {
  it('renders items with a status pill and bumps', () => {
    const onBump = jest.fn();
    const { getByText } = renderThemed(
      <OrderTicket
        orderNumber="55"
        destination="Table 4"
        status="preparing"
        items={[{ name: 'Burger', quantity: 2, modifiers: ['No pickle'] }]}
        onBump={onBump}
      />,
      SEED_DARK
    );
    expect(getByText('Preparing')).toBeTruthy();
    fireEvent.press(getByText('Ready'));
    expect(onBump).toHaveBeenCalledTimes(1);
  });

  it('shows an empty state for a ticket with no items', () => {
    const { getByText } = renderThemed(
      <OrderTicket orderNumber="56" items={[]} emptyLabel="No items yet" />,
      SEED_LIGHT
    );
    expect(getByText('No items yet')).toBeTruthy();
  });
});

describe('token purity (native pos, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <RegisterKeypad value="12.5" />
          <CartLine name="Mug" quantity={2} unitPriceCents={2400} onQuantityChange={() => undefined} onVoid={() => undefined} />
          <ReceiptView items={[{ name: 'Mug', amountCents: 2400 }]} totalCents={2400} tenders={[{ method: 'card', amountCents: 2400 }]} />
          <PaymentMethodTile method="cash" selected />
          <DiscountRow label="Comp" type="amount" value={200} amountCents={200} onRemove={() => undefined} />
          <CashDrawerRow kind="variance" expectedCents={10000} amountCents={10250} />
          <ProductGridTile name="Cold Brew" priceCents={480} tone="accent" />
          <SplitBillRow label="Guest 2" amountCents={1200} selected onTogglePaid={() => undefined} />
          <RefundRow name="Mug" amountCents={2400} reason="wrongItem" status="processed" variant="selectable" selected onToggle={() => undefined} />
          <ShiftReport grossSalesCents={50000} refundsCents={2000} expectedCashCents={10000} countedCashCents={9800} breakdown={[{ method: 'cash', amountCents: 20000 }]} />
          <QuickChargeBar totalCents={2400} itemCount={1} onCharge={() => undefined} />
          <OrderTicket orderNumber="1" status="ready" items={[{ name: 'Burger', note: 'Rush' }]} onBump={() => undefined} />
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
