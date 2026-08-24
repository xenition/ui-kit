/**
 * Alternate utility / bill-pay designs (v2 / v3) — the drop-in redesigns of the
 * four most-used native utilities blocks. Each variant keeps the base
 * component's exact props, so these specs prove they (a) mount, (b) stay
 * token-pure under BOTH seeds (no hardcoded hex — every color traces to a
 * compiled token), and (c) remain interactive where the base was (pay).
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
import { BillCardV2 } from './BillCardV2';
import { BillCardV3 } from './BillCardV3';
import { UsageMeterV2 } from './UsageMeterV2';
import { UsageMeterV3 } from './UsageMeterV3';
import { PaymentRowV2 } from './PaymentRowV2';
import { PaymentRowV3 } from './PaymentRowV3';
import { ServiceStatusV2 } from './ServiceStatusV2';
import { ServiceStatusV3 } from './ServiceStatusV3';

describe('BillCard alternates (native)', () => {
  it('V2 mounts as a hero card, shows status by glyph+text, and fires pay', () => {
    const onPay = jest.fn();
    const { getByText } = renderThemed(
      <BillCardV2
        kind="electric"
        provider="City Power & Light"
        accountNumber="ACCT-4821"
        amountCents={12900}
        dueDate="Aug 15"
        status="overdue"
        onPay={onPay}
      />,
      SEED_LIGHT
    );
    expect(getByText('City Power & Light')).toBeTruthy();
    expect(getByText('$129.00')).toBeTruthy();
    expect(getByText('⚠️ Overdue')).toBeTruthy();
    fireEvent.press(getByText('Pay now · $129.00'));
    expect(onPay).toHaveBeenCalledTimes(1);
  });

  it('V3 mounts as a dense line and fires pay', () => {
    const onPay = jest.fn();
    const { getByText } = renderThemed(
      <BillCardV3
        kind="water"
        provider="Metro Water"
        accountNumber="W-1"
        amountCents={4500}
        dueDate="Sep 1"
        status="due"
        onPay={onPay}
      />,
      SEED_DARK
    );
    expect(getByText('Metro Water')).toBeTruthy();
    expect(getByText('$45.00')).toBeTruthy();
    fireEvent.press(getByText('Pay'));
    expect(onPay).toHaveBeenCalledTimes(1);
  });

  it('V2 hides the pay button once paid', () => {
    const { queryByText, getByText } = renderThemed(
      <BillCardV2 kind="gas" provider="Gas Co" accountNumber="G-1" amountCents={8900} status="paid" onPay={() => {}} />,
      SEED_LIGHT
    );
    expect(getByText('✓ Paid')).toBeTruthy();
    expect(queryByText(/Pay now/)).toBeNull();
  });
});

describe('UsageMeter alternates (native)', () => {
  it('V2 renders a gauge ring with usage of allowance', () => {
    const { getByText } = renderThemed(
      <UsageMeterV2 kind="electric" used={900} allowance={1000} period="This month" />,
      SEED_LIGHT
    );
    expect(getByText('Electric')).toBeTruthy();
    expect(getByText('90% of allowance')).toBeTruthy();
  });

  it('V2 guards a zero allowance (no divide-by-zero)', () => {
    const { getByText } = renderThemed(
      <UsageMeterV2 kind="gas" used={40} allowance={0} />,
      SEED_DARK
    );
    expect(getByText('No allowance set')).toBeTruthy();
  });

  it('V3 renders a slim bar with an escalated percent + loading state', () => {
    const { getByText } = renderThemed(
      <UsageMeterV3 kind="electric" used={1200} allowance={1000} period="This month" />,
      SEED_LIGHT
    );
    expect(getByText('120%')).toBeTruthy();
    expect(getByText('1200 kWh of 1000 kWh')).toBeTruthy();

    const loading = renderThemed(<UsageMeterV3 kind="water" used={5} allowance={10} loading />, SEED_LIGHT);
    expect(loading.getByLabelText('Loading usage')).toBeTruthy();
  });
});

describe('PaymentRow alternates (native)', () => {
  it('V2 renders a method card and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PaymentRowV2 amountCents={12900} date="Aug 1" status="paid" method="Visa ···4242" reference="CONF-9" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Visa ···4242')).toBeTruthy();
    expect(getByText('$129.00')).toBeTruthy();
    fireEvent.press(getByLabelText(/Payment \$129\.00/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line with state by glyph+text', () => {
    const { getByText } = renderThemed(
      <PaymentRowV3 amountCents={5000} date="Jul 1" status="failed" method="Bank ···1881" />,
      SEED_DARK
    );
    expect(getByText('Bank ···1881')).toBeTruthy();
    expect(getByText('$50.00')).toBeTruthy();
  });
});

describe('ServiceStatus alternates (native)', () => {
  it('V2 renders a big banner conveying an outage by glyph + label', () => {
    const { getByText } = renderThemed(
      <ServiceStatusV2 kind="electric" state="outage" location="123 Main St" detail="Crews en route" updated="4:00 PM" />,
      SEED_DARK
    );
    expect(getByText('⚠️ Outage')).toBeTruthy();
    expect(getByText('Crews en route')).toBeTruthy();
  });

  it('V3 renders a compact inline chip', () => {
    const { getByText } = renderThemed(
      <ServiceStatusV3 kind="water" state="active" location="1 Elm St" />,
      SEED_LIGHT
    );
    expect(getByText('Water')).toBeTruthy();
    expect(getByText('✓ Active')).toBeTruthy();
  });
});

describe('token purity — utilities alternates (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <BillCardV2 kind="electric" provider="Power Co" accountNumber="A-1" amountCents={12900} dueDate="Aug 15" status="overdue" onPay={() => {}} onPress={() => {}} />
          <BillCardV3 kind="gas" provider="Gas Co" accountNumber="G-1" amountCents={8900} dueDate="Sep 1" status="due" onPay={() => {}} onPress={() => {}} />
          <BillCardV3 kind="water" provider="Water Co" accountNumber="W-1" amountCents={4500} status="paid" />
          <UsageMeterV2 kind="electric" used={900} allowance={1000} period="This month" />
          <UsageMeterV2 kind="solar" used={30} allowance={0} />
          <UsageMeterV3 kind="internet" used={1200} allowance={1000} period="This month" />
          <UsageMeterV3 kind="waste" used={12} allowance={0} />
          <PaymentRowV2 amountCents={12900} date="Aug 1" status="paid" method="Visa ···4242" reference="CONF-9" onPress={() => {}} />
          <PaymentRowV2 amountCents={5000} date="Jul 1" status="failed" method="Bank ···1881" />
          <PaymentRowV3 amountCents={5000} date="Jul 1" status="refunded" method="Bank ···1881" reference="R-2" onPress={() => {}} />
          <ServiceStatusV2 kind="electric" state="outage" location="123 Main St" detail="Crews en route" updated="4:00 PM" />
          <ServiceStatusV2 kind="internet" state="active" />
          <ServiceStatusV3 kind="water" state="maintenance" location="1 Elm St" updated="now" />
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
