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
import { EmptyState } from '../primitives';
import { BillCard } from './BillCard';
import { UsageMeter } from './UsageMeter';
import { PaymentRow } from './PaymentRow';
import { ServiceStatus } from './ServiceStatus';
import { MeterReading } from './MeterReading';
import { OutageAlert } from './OutageAlert';
import { RatePlanCard } from './RatePlanCard';
import { AutoPayRow } from './AutoPayRow';
import { ConsumptionChart, type ConsumptionPoint } from './ConsumptionChart';
import { BudgetBillRow } from './BudgetBillRow';
import { ServiceRequestRow } from './ServiceRequestRow';
import { EnergyTip } from './EnergyTip';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('BillCard (native)', () => {
  it('renders provider/line/amount, status by text+glyph, and fires pay + press', () => {
    const onPay = jest.fn();
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <BillCard
        kind="electric"
        provider="City Power & Light"
        accountNumber="ACCT-4821"
        amountCents={12900}
        dueDate="Aug 15"
        status="overdue"
        onPay={onPay}
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('City Power & Light')).toBeTruthy();
    expect(getByText('Electric · ACCT-4821')).toBeTruthy();
    expect(getByText('$129.00')).toBeTruthy();
    // Status is text + glyph, not color alone.
    expect(getByText('⚠️ Overdue')).toBeTruthy();

    fireEvent.press(getByText('Pay now · $129.00'));
    expect(onPay).toHaveBeenCalledTimes(1);

    fireEvent.press(getByLabelText(/City Power & Light/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('hides the pay button once the bill is paid', () => {
    const { queryByText, getByText } = renderThemed(
      <BillCard
        kind="water"
        provider="Metro Water"
        accountNumber="W-1"
        amountCents={4500}
        status="paid"
        onPay={() => {}}
      />,
      SEED_DARK
    );
    expect(getByText('✓ Paid')).toBeTruthy();
    expect(queryByText(/Pay now/)).toBeNull();
  });
});

describe('UsageMeter (native)', () => {
  it('escalates over-allowance usage to the danger token (not color alone)', () => {
    const { getByText } = renderThemed(
      <UsageMeter kind="electric" used={1200} allowance={1000} period="This month" />,
      SEED_LIGHT
    );
    expect(getByText('1200 kWh')).toBeTruthy();
    expect(getByText('of 1000 kWh')).toBeTruthy();
    const status = getByText('Over allowance · 120%');
    expect(flatten(status.props.style).color).toBe(lightColors.danger);
  });

  it('renders a loading state instead of data', () => {
    const { queryByText, getByLabelText } = renderThemed(
      <UsageMeter kind="gas" used={40} allowance={100} loading />,
      SEED_LIGHT
    );
    expect(getByLabelText('Loading usage')).toBeTruthy();
    expect(queryByText(/therm/)).toBeNull();
  });
});

describe('PaymentRow (native)', () => {
  it('tones a paid badge with the success token and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PaymentRow
        amountCents={12900}
        date="Aug 1"
        status="paid"
        method="Visa ···4242"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('$129.00')).toBeTruthy();
    // `successText`, not `success`: a soft/outline pill puts its label on the
    // page, not on a fill, and the compiler only guarantees on-pairs. See the
    // *Text slots added alongside this change.
    expect(flatten(getByText('✓ Paid').props.style).color).toBe(lightColors.successText);

    fireEvent.press(getByLabelText(/Payment \$129\.00/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('ServiceStatus (native)', () => {
  it('conveys an outage by glyph + label + danger badge', () => {
    const { getByText } = renderThemed(
      <ServiceStatus kind="electric" state="outage" location="123 Main St" detail="Crews en route" />,
      SEED_DARK
    );
    expect(getByText('Electric')).toBeTruthy();
    expect(getByText('⚠️ Outage')).toBeTruthy();
    expect(getByText('Crews en route')).toBeTruthy();
  });
});

describe('OutageAlert (native)', () => {
  it('renders the heading + ETA and fires onDetails', () => {
    const onDetails = jest.fn();
    const { getByText } = renderThemed(
      <OutageAlert kind="electric" state="active" area="Downtown" eta="4:00 PM" onDetails={onDetails} />,
      SEED_LIGHT
    );
    expect(getByText('Electric service outage')).toBeTruthy();
    expect(getByText('Estimated restoration: 4:00 PM')).toBeTruthy();
    fireEvent.press(getByText('View details'));
    expect(onDetails).toHaveBeenCalledTimes(1);
  });

  it('suppresses the ETA once resolved', () => {
    const { queryByText, getByText } = renderThemed(
      <OutageAlert state="resolved" eta="4:00 PM" />,
      SEED_LIGHT
    );
    expect(getByText('Outage resolved')).toBeTruthy();
    expect(queryByText(/Estimated restoration/)).toBeNull();
  });
});

describe('RatePlanCard (native)', () => {
  it('prints the per-unit rate and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByText } = renderThemed(
      <RatePlanCard
        name="SimpleSave 12"
        variant="fixed"
        rateCents={1299}
        unit="kWh"
        term="12-month term"
        features={['No early-exit fee']}
        onSelect={onSelect}
      />,
      SEED_LIGHT
    );
    expect(getByText('$12.99')).toBeTruthy();
    expect(getByText('/kWh')).toBeTruthy();
    fireEvent.press(getByText('Choose plan'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('marks the selected plan and disables its button', () => {
    const onSelect = jest.fn();
    const { getByText } = renderThemed(
      <RatePlanCard name="Green 100" variant="green" rateCents={1499} unit="kWh" selected onSelect={onSelect} />,
      SEED_DARK
    );
    expect(getByText('✓ Current')).toBeTruthy();
    // Disabled current-plan button is an inert no-op.
    fireEvent.press(getByText('Current plan'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe('AutoPayRow (native)', () => {
  it('reports the next enabled state on toggle (controlled)', () => {
    const onToggle = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <AutoPayRow enabled={false} onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText('○ Off')).toBeTruthy();
    fireEvent.press(getByLabelText(/AutoPay, off/));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('ConsumptionChart (native)', () => {
  const data: ConsumptionPoint[] = [
    { label: 'May', value: 620 },
    { label: 'Jun', value: 810 },
    { label: 'Jul', value: 940 },
  ];

  it('reuses a chart and derives the printed total', () => {
    const { getByText } = renderThemed(
      <ConsumptionChart kind="electric" data={data} variant="bar" />,
      SEED_LIGHT
    );
    expect(getByText('Electric usage')).toBeTruthy();
    expect(getByText('Total 2370 kWh')).toBeTruthy();
  });

  it('degrades to an empty message when there is no data', () => {
    const { getByText } = renderThemed(
      <ConsumptionChart kind="water" data={[]} />,
      SEED_DARK
    );
    expect(getByText('No usage recorded yet.')).toBeTruthy();
  });
});

describe('BudgetBillRow (native)', () => {
  it('shows a positive balance as an account credit toned success', () => {
    const { getByText } = renderThemed(
      <BudgetBillRow monthlyCents={11000} balanceCents={5000} reviewDate="Reviews in Nov" />,
      SEED_LIGHT
    );
    expect(getByText('$110.00')).toBeTruthy();
    expect(getByText('Account credit')).toBeTruthy();
    expect(flatten(getByText('$50.00').props.style).color).toBe(lightColors.success);
  });
});

describe('ServiceRequestRow (native)', () => {
  it('surfaces a high priority as an explicit tag (not color alone)', () => {
    const { getByText } = renderThemed(
      <ServiceRequestRow
        requestNumber="SR-10482"
        title="Water heater leak"
        status="scheduled"
        kind="repair"
        priority="high"
      />,
      SEED_LIGHT
    );
    expect(getByText('Water heater leak')).toBeTruthy();
    expect(getByText('! Urgent')).toBeTruthy();
    expect(getByText('🗓️ Scheduled')).toBeTruthy();
  });
});

describe('EnergyTip (native)', () => {
  it('renders the tip and an estimated monthly saving badge', () => {
    const { getByText } = renderThemed(
      <EnergyTip
        title="Lower your thermostat 2°"
        body="Small setbacks add up overnight."
        category="heating"
        savingsCents={800}
        effort="easy"
      />,
      SEED_LIGHT
    );
    expect(getByText('Lower your thermostat 2°')).toBeTruthy();
    expect(getByText('Save ~$8.00/mo')).toBeTruthy();
    expect(getByText('Easy')).toBeTruthy();
  });
});

describe('empty bills (native)', () => {
  it('renders an EmptyState when there are no bills to show', () => {
    const bills: Array<{ id: string }> = [];
    const { getByText, queryByText } = renderThemed(
      <>
        {bills.length === 0 ? (
          <EmptyState title="No bills due" description="Your upcoming bills will appear here." />
        ) : null}
        {bills.map((b) => (
          <BillCard key={b.id} kind="electric" provider={b.id} accountNumber={b.id} amountCents={0} />
        ))}
      </>,
      SEED_DARK
    );
    expect(getByText('No bills due')).toBeTruthy();
    expect(queryByText(/Amount due/)).toBeNull();
  });
});

describe('token purity (native utilities, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    const data: ConsumptionPoint[] = [
      { label: 'Jun', value: 810 },
      { label: 'Jul', value: 940 },
    ];
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <BillCard kind="gas" provider="Gas Co" accountNumber="G-1" amountCents={8900} status="due" onPay={() => {}} />
          <UsageMeter kind="electric" used={900} allowance={1000} period="This month" />
          <PaymentRow amountCents={5000} date="Jul 1" status="failed" method="Bank ···1881" />
          <ServiceStatus kind="water" state="active" location="1 Elm St" />
          <MeterReading kind="electric" previous={4100} current={4942} date="Read Aug 1" source="actual" />
          <OutageAlert kind="electric" state="scheduled" area="North grid" eta="Sun 2 AM" onDetails={() => {}} />
          <RatePlanCard name="Fixed 24" variant="fixed" rateCents={1150} unit="kWh" selected onSelect={() => {}} />
          <AutoPayRow enabled method="Visa ···4242" nextChargeDate="Aug 15" amountCents={12900} />
          <ConsumptionChart kind="electric" data={data} variant="line" />
          <BudgetBillRow monthlyCents={11000} balanceCents={-3000} actualToDateCents={9000} plannedToDateCents={8000} />
          <ServiceRequestRow requestNumber="SR-1" title="Meter swap" status="completed" kind="meter" />
          <EnergyTip title="Seal drafts" category="heating" savingsCents={1200} effort="moderate" />
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
