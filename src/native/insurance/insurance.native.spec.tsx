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
import { PolicyCard } from './PolicyCard';
import { ClaimRow } from './ClaimRow';
import { CoverageItem } from './CoverageItem';
import { PremiumSummary, type PremiumLineItem } from './PremiumSummary';
import { QuoteForm, type QuoteValues } from './QuoteForm';
import { DeductibleBar } from './DeductibleBar';
import { BeneficiaryRow } from './BeneficiaryRow';
import { ClaimStatusTracker } from './ClaimStatusTracker';
import { PolicyDocumentRow } from './PolicyDocumentRow';
import { RiskScore } from './RiskScore';
import { RenewalBanner } from './RenewalBanner';
import { AgentContactCard } from './AgentContactCard';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('PolicyCard (native)', () => {
  it('renders name, line label, coverage, and formatted premium per variant', () => {
    const { getByText } = renderThemed(
      <PolicyCard
        variant="auto"
        name="Premier Auto"
        policyNumber="AUTO-4821-93"
        coverageCents={5000000}
        premiumCents={12900}
        cadence="monthly"
        status="active"
      />,
      SEED_LIGHT
    );
    expect(getByText('Premier Auto')).toBeTruthy();
    expect(getByText('Auto · AUTO-4821-93')).toBeTruthy();
    expect(getByText('$50,000.00')).toBeTruthy();
    expect(getByText('$129.00')).toBeTruthy();
    expect(getByText('✓ Active')).toBeTruthy();
  });
});

describe('ClaimRow (native)', () => {
  it('conveys status by text+glyph and fires onPress to file/open the claim', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ClaimRow
        claimNumber="CLM-20481"
        title="Windshield replacement"
        status="filed"
        amountCents={45000}
        date="Aug 4"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Windshield replacement')).toBeTruthy();
    // Status is text + glyph, not color alone.
    expect(getByText('📝 Filed')).toBeTruthy();
    expect(getByText('$450.00')).toBeTruthy();

    fireEvent.press(getByLabelText(/Windshield replacement/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('tones an approved claim badge with the success token', () => {
    const { getByText } = renderThemed(
      <ClaimRow claimNumber="CLM-1" title="Approved claim" status="approved" />,
      SEED_LIGHT
    );
    // Badge soft fg reads the success accent slot.
    // `successText`, not `success`: a soft/outline pill puts its label on the
    // page, not on a fill, and the compiler only guarantees on-pairs. See the
    // *Text slots added alongside this change.
    expect(flatten(getByText('✓ Approved').props.style).color).toBe(lightColors.successText);
  });
});

describe('CoverageItem (native)', () => {
  it('marks excluded coverage without relying on color alone (glyph + strike)', () => {
    const included = renderThemed(
      <CoverageItem label="Collision" included limitCents={2500000} />,
      SEED_LIGHT
    );
    expect(included.getByText('Collision')).toBeTruthy();
    expect(included.getByText('$25,000.00')).toBeTruthy();

    const excluded = renderThemed(<CoverageItem label="Flood" included={false} />, SEED_DARK);
    expect(flatten(excluded.getByText('Flood').props.style).textDecorationLine).toBe('line-through');
    expect(excluded.getByText('—')).toBeTruthy();
  });
});

describe('PremiumSummary (native)', () => {
  const items: PremiumLineItem[] = [
    { label: 'Base premium', amountCents: 14000 },
    { label: 'Multi-policy discount', amountCents: -2000 },
    { label: 'Taxes & fees', amountCents: 900 },
  ];

  it('derives the total from the lines and tones it with the primary token', () => {
    const { getByText } = renderThemed(<PremiumSummary items={items} cadence="monthly" />, SEED_LIGHT);
    // 14000 - 2000 + 900 = 12900 → $129.00
    const total = getByText('$129.00');
    expect(flatten(total.props.style).color).toBe(lightColors.primary);
    // Discount shown as a signed credit.
    expect(getByText('−$20.00')).toBeTruthy();
  });

  it('renders a loading state instead of data', () => {
    const { queryByText, getByLabelText } = renderThemed(
      <PremiumSummary items={items} loading />,
      SEED_LIGHT
    );
    expect(queryByText('Base premium')).toBeNull();
    expect(getByLabelText('Loading premium')).toBeTruthy();
  });
});

describe('QuoteForm (native)', () => {
  it('emits cents on submit and blocks submit until valid ("get quote")', () => {
    const onSubmit = jest.fn();

    // Invalid: no coverage entered → submit is a disabled no-op.
    const invalid = renderThemed(<QuoteForm variant="auto" onSubmit={onSubmit} />, SEED_LIGHT);
    fireEvent.press(invalid.getByText('Get quote'));
    expect(onSubmit).not.toHaveBeenCalled();

    // Controlled + valid → submit reports the integer-cents value bag.
    const valid = renderThemed(
      <QuoteForm
        variant="auto"
        coverageCents={5000000}
        deductibleCents={100000}
        onSubmit={onSubmit}
      />,
      SEED_LIGHT
    );
    fireEvent.press(valid.getByText('Get quote'));
    expect(onSubmit).toHaveBeenCalledWith({
      variant: 'auto',
      coverageCents: 5000000,
      deductibleCents: 100000,
    } satisfies QuoteValues);
  });
});

describe('DeductibleBar (native)', () => {
  it('tones a fully-met deductible as success and guards a zero ceiling', () => {
    const met = renderThemed(
      <DeductibleBar metCents={100000} deductibleCents={100000} />,
      SEED_LIGHT
    );
    expect(flatten(met.getByText('Deductible met').props.style).color).toBe(lightColors.success);
    expect(met.getByText('$1,000.00 / $1,000.00')).toBeTruthy();

    // Zero ceiling → treated as met, no divide-by-zero / crash.
    const zero = renderThemed(<DeductibleBar metCents={0} deductibleCents={0} />, SEED_LIGHT);
    expect(zero.getByText('Deductible met')).toBeTruthy();
  });
});

describe('BeneficiaryRow (native)', () => {
  it('clamps and renders the allocation percentage', () => {
    const { getByText } = renderThemed(
      <BeneficiaryRow name="Ada Lovelace" relationship="Spouse" allocationPct={150} kind="primary" />,
      SEED_LIGHT
    );
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(getByText('Primary · Spouse')).toBeTruthy();
    expect(getByText('100%')).toBeTruthy(); // clamped from 150
  });
});

describe('ClaimStatusTracker (native)', () => {
  it('renders the happy-path stages via Steps', () => {
    const { getByText } = renderThemed(<ClaimStatusTracker status="approved" />, SEED_LIGHT);
    expect(getByText('Filed')).toBeTruthy();
    expect(getByText('Approved')).toBeTruthy();
  });

  it('branches a denied claim into a danger banner (glyph + text + color)', () => {
    const { getByText } = renderThemed(<ClaimStatusTracker status="denied" />, SEED_DARK);
    expect(getByText('Claim denied')).toBeTruthy();
  });
});

describe('PolicyDocumentRow (native)', () => {
  it('renders title/meta and a download action only when handled', () => {
    const onDownload = jest.fn();
    const { getByText } = renderThemed(
      <PolicyDocumentRow
        title="Auto policy declarations"
        kind="declaration"
        size="1.2 MB"
        date="Jul 1"
        onDownload={onDownload}
      />,
      SEED_LIGHT
    );
    expect(getByText('Auto policy declarations')).toBeTruthy();
    fireEvent.press(getByText('Download'));
    expect(onDownload).toHaveBeenCalledTimes(1);
  });
});

describe('RiskScore (native)', () => {
  it('reads the tier by glyph + label + a danger token for high risk', () => {
    const { getByText } = renderThemed(
      <RiskScore score={82} factors={['Prior claims', 'High-risk area']} />,
      SEED_LIGHT
    );
    expect(getByText('82')).toBeTruthy();
    expect(flatten(getByText('High risk').props.style).color).toBe(lightColors.danger);
    expect(getByText('Prior claims')).toBeTruthy();
  });
});

describe('RenewalBanner (native)', () => {
  it('fires onRenew ("renew") and shows the renewal premium', () => {
    const onRenew = jest.fn();
    const { getByText } = renderThemed(
      <RenewalBanner renewalDate="Sep 1" urgency="due" premiumCents={12900} onRenew={onRenew} />,
      SEED_LIGHT
    );
    expect(getByText('Renewal due')).toBeTruthy();
    fireEvent.press(getByText('Renew now'));
    expect(onRenew).toHaveBeenCalledTimes(1);
  });
});

describe('AgentContactCard (native)', () => {
  it('renders contact details and fires call/email actions', () => {
    const onCall = jest.fn();
    const onEmail = jest.fn();
    const { getByText } = renderThemed(
      <AgentContactCard
        name="Grace Hopper"
        title="Licensed agent"
        agency="Xenition Insurance"
        phone="(555) 010-2048"
        email="grace@xenition.com"
        available
        onCall={onCall}
        onEmail={onEmail}
      />,
      SEED_LIGHT
    );
    expect(getByText('Grace Hopper')).toBeTruthy();
    fireEvent.press(getByText('Call'));
    fireEvent.press(getByText('Email'));
    expect(onCall).toHaveBeenCalledTimes(1);
    expect(onEmail).toHaveBeenCalledTimes(1);
  });
});

describe('empty claims (native)', () => {
  it('renders an EmptyState when there are no claims to show', () => {
    const claims: Array<{ id: string }> = [];
    const { getByText, queryByText } = renderThemed(
      <>
        {claims.length === 0 ? (
          <EmptyState title="No claims filed" description="Your filed claims will appear here." />
        ) : null}
        {claims.map((c) => (
          <ClaimRow key={c.id} claimNumber={c.id} title={c.id} status="filed" />
        ))}
      </>,
      SEED_DARK
    );
    expect(getByText('No claims filed')).toBeTruthy();
    expect(queryByText('📝 Filed')).toBeNull();
  });
});

describe('token purity (native insurance, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <PolicyCard variant="home" name="Home" policyNumber="H-1" coverageCents={30000000} premiumCents={8000} />
          <ClaimRow claimNumber="CLM-9" title="Denied claim" status="denied" amountCents={1000} />
          <CoverageItem label="Fire" included limitCents={100000} />
          <PremiumSummary items={[{ label: 'Base', amountCents: 10000 }, { label: 'Discount', amountCents: -1500 }]} />
          <DeductibleBar metCents={30000} deductibleCents={100000} />
          <BeneficiaryRow name="Ada" allocationPct={60} kind="contingent" />
          <ClaimStatusTracker status="denied" />
          <PolicyDocumentRow title="ID card" kind="id-card" onDownload={() => {}} />
          <RiskScore score={40} factors={['One factor']} />
          <RenewalBanner renewalDate="Sep 1" urgency="overdue" premiumCents={9900} onRenew={() => {}} />
          <AgentContactCard name="Grace" phone="555" email="g@x.co" available onCall={() => {}} onEmail={() => {}} />
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
