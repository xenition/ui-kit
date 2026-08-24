/** @jest-environment jsdom */
/**
 * Web utilities (energy / bill-pay) blocks: render smoke for every base + V2 +
 * V3 component, token-purity (no hex literal in any inline style), and the key
 * behavioral contracts — interactive-card click + keyboard, row selection, the
 * AutoPay switch, the over-allowance escalation, and the outage banner. Plain
 * jsdom render (no provider — colors are token classes), mirroring the
 * primitives' spec style.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';

import { BillCard } from './BillCard';
import { BillCardV2 } from './BillCardV2';
import { BillCardV3 } from './BillCardV3';
import { UsageMeter } from './UsageMeter';
import { UsageMeterV2 } from './UsageMeterV2';
import { UsageMeterV3 } from './UsageMeterV3';
import { PaymentRow } from './PaymentRow';
import { PaymentRowV2 } from './PaymentRowV2';
import { PaymentRowV3 } from './PaymentRowV3';
import { ServiceStatus } from './ServiceStatus';
import { ServiceStatusV2 } from './ServiceStatusV2';
import { ServiceStatusV3 } from './ServiceStatusV3';
import { MeterReading } from './MeterReading';
import { OutageAlert } from './OutageAlert';
import { RatePlanCard } from './RatePlanCard';
import { AutoPayRow } from './AutoPayRow';
import { ConsumptionChart, type ConsumptionPoint } from './ConsumptionChart';
import { BudgetBillRow } from './BudgetBillRow';
import { ServiceRequestRow } from './ServiceRequestRow';
import { EnergyTip } from './EnergyTip';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** All inline `style` attributes joined — used for the token-purity assertion. */
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const SERIES: ConsumptionPoint[] = [
  { label: 'Jan', value: 320 },
  { label: 'Feb', value: 280 },
  { label: 'Mar', value: 410 },
];

describe('utilities (web)', () => {
  it('renders every base + V2 + V3 component with no hex literal in inline styles', () => {
    const { container } = render(
      <div>
        <BillCard kind="electric" provider="City Power" accountNumber="ACCT-1" amountCents={12099} dueDate="Aug 15" status="due" />
        <BillCardV2 kind="water" provider="Aqua Co" accountNumber="ACCT-2" amountCents={4200} dueDate="Sep 1" status="overdue" />
        <BillCardV3 kind="gas" provider="Gas Co" accountNumber="ACCT-3" amountCents={3100} status="paid" />
        <UsageMeter kind="electric" used={640} allowance={800} period="This month" />
        <UsageMeterV2 kind="electric" used={640} allowance={800} period="This month" />
        <UsageMeterV3 kind="electric" used={640} allowance={800} period="This month" />
        <PaymentRow amountCents={5000} date="Aug 1" status="paid" method="Visa ···4242" reference="R-1" />
        <PaymentRowV2 amountCents={5000} date="Aug 1" status="refunded" method="Visa ···4242" reference="R-2" />
        <PaymentRowV3 amountCents={5000} date="Aug 1" status="failed" method="Visa ···4242" reference="R-3" />
        <ServiceStatus kind="electric" state="active" location="123 Main St" updated="2m ago" detail="All good" />
        <ServiceStatusV2 kind="water" state="outage" location="Downtown" updated="5m ago" detail="Crews on site" />
        <ServiceStatusV3 kind="gas" state="maintenance" location="North grid" updated="1h ago" />
        <MeterReading kind="electric" previous={100} current={142} date="Read Aug 1" source="actual" />
        <OutageAlert state="active" kind="electric" area="Downtown" eta="4:00 PM" message="Crews dispatched" />
        <RatePlanCard name="SimpleSave 12" variant="fixed" rateCents={1299} unit="kWh" term="12-month" features={['No fees']} selected />
        <AutoPayRow enabled method="Visa ···4242" nextChargeDate="Aug 15" amountCents={12000} />
        <ConsumptionChart kind="electric" data={SERIES} variant="bar" />
        <ConsumptionChart kind="water" data={SERIES} variant="line" />
        <BudgetBillRow monthlyCents={11000} balanceCents={-2500} actualToDateCents={9000} plannedToDateCents={8000} reviewDate="Reviews in Nov" />
        <ServiceRequestRow requestNumber="SR-1" title="Water heater leak" status="in-progress" kind="repair" date="Aug 3" priority="high" />
        <EnergyTip title="Lower thermostat 2°" body="Save on heating" category="heating" savingsCents={900} effort="easy" />
      </div>
    );

    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    // A representative token tint class is present (opacity modifier, not a hex).
    expect(container.innerHTML).toContain('bg-primary/10');
  });

  it('BillCard becomes a role="button" and fires onClick via click + Enter + Space', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <BillCard kind="electric" provider="City Power" accountNumber="ACCT-1" amountCents={12099} onClick={onClick} />
    );
    const card = getByRole('button', { name: /City Power/ });
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('BillCard without onClick is not a button, and shows the pay CTA only with onPay', () => {
    const onPay = jest.fn();
    const { getByText, queryByRole } = render(
      <BillCard kind="electric" provider="City Power" accountNumber="ACCT-1" amountCents={5000} status="overdue" onPay={onPay} />
    );
    expect(queryByRole('button', { name: /City Power/ })).toBeNull();
    // Pay CTA carries the formatted amount; overdue tones it danger (text, not color alone).
    getByText(/Pay now · \$50\.00/).click();
    expect(onPay).toHaveBeenCalledTimes(1);
  });

  it('BillCard hides the pay CTA once the bill is paid', () => {
    const onPay = jest.fn();
    const { queryByText } = render(
      <BillCard kind="electric" provider="City Power" accountNumber="ACCT-1" amountCents={5000} status="paid" onPay={onPay} />
    );
    expect(queryByText(/Pay now/)).toBeNull();
  });

  it('PaymentRow fires onClick and conveys state by glyph + label text', () => {
    const onClick = jest.fn();
    const { getByText, getAllByText } = render(
      <PaymentRow amountCents={5000} date="Aug 1" status="paid" method="Visa ···4242" onClick={onClick} />
    );
    expect(getByText('$50.00')).toBeTruthy();
    // Status label is text (a Paid pill), never color alone.
    expect(getAllByText(/Paid/).length).toBeGreaterThan(0);
    getByText('Visa ···4242').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('PaymentRow strikes a refunded amount so it reads non-current', () => {
    const { getByText } = render(<PaymentRow amountCents={5000} date="Aug 1" status="refunded" />);
    expect(getByText('$50.00').className).toContain('line-through');
  });

  it('AutoPayRow toggles through the controlled switch', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(<AutoPayRow enabled={false} onToggle={onToggle} />);
    const sw = getByRole('switch');
    expect(sw.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(sw);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('UsageMeter escalates the caption to danger text when over allowance', () => {
    const { getByText } = render(<UsageMeter kind="electric" used={900} allowance={800} />);
    const caption = getByText(/Over allowance/);
    expect(caption.className).toContain('text-danger');
  });

  it('UsageMeter renders an aria-busy skeleton while loading', () => {
    const { getByLabelText } = render(<UsageMeter kind="electric" used={0} loading />);
    expect(getByLabelText('Loading usage').getAttribute('aria-busy')).toBe('true');
  });

  it('ConsumptionChart shows an empty message when there are no points', () => {
    const { getByText } = render(<ConsumptionChart kind="electric" data={[]} />);
    expect(getByText('No usage recorded yet.')).toBeTruthy();
  });

  it('OutageAlert is a status banner with a severity heading', () => {
    const { getByRole } = render(<OutageAlert state="active" kind="electric" area="Downtown" />);
    const banner = getByRole('status');
    expect(banner.getAttribute('aria-label')).toContain('Electric service outage');
  });

  it('ServiceStatus conveys the state by a labelled pill (never color alone)', () => {
    const { getByText } = render(<ServiceStatus kind="electric" state="outage" location="123 Main St" />);
    expect(getByText(/Outage/)).toBeTruthy();
  });

  it('RatePlanCard marks the current plan and inerts its select button', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <RatePlanCard name="SimpleSave" rateCents={1299} unit="kWh" selected onSelect={onSelect} />
    );
    const btn = getByText('Current plan') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    btn.click();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('forwards a ref to the BillCard root', () => {
    const ref = createRef<HTMLDivElement>();
    render(<BillCard kind="electric" provider="City Power" accountNumber="ACCT-1" amountCents={100} ref={ref} />);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
