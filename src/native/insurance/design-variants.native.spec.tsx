/**
 * Alternate insurance designs (V2 / V3) — the drop-in variants of PolicyCard,
 * ClaimRow, CoverageItem, and PremiumSummary. Each variant is asserted to
 * mount, to stay token-pure under BOTH seeds (every rendered style hex traces
 * to a compiled theme token — the native mirror of the "no literal color"
 * invariant), and to honor one interaction (press → callback). The variants
 * share the base components' `Props`, so the same fixtures drive them.
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
import { PolicyCardV2 } from './PolicyCardV2';
import { PolicyCardV3 } from './PolicyCardV3';
import { ClaimRowV2 } from './ClaimRowV2';
import { ClaimRowV3 } from './ClaimRowV3';
import { CoverageItemV2 } from './CoverageItemV2';
import { CoverageItemV3 } from './CoverageItemV3';
import { PremiumSummaryV2 } from './PremiumSummaryV2';
import { PremiumSummaryV3, type PremiumSummaryV3Props } from './PremiumSummaryV3';
import type { PremiumLineItem } from './PremiumSummary';

const ITEMS: PremiumLineItem[] = [
  { label: 'Base premium', amountCents: 14000 },
  { label: 'Multi-policy discount', amountCents: -2000 },
  { label: 'Taxes & fees', amountCents: 900 },
];

describe('PolicyCard V2 / V3 (native)', () => {
  it('V2 mounts with the elevated hero layout', () => {
    const { getByText } = renderThemed(
      <PolicyCardV2 variant="auto" name="Premier Auto" policyNumber="AUTO-1" coverageCents={5000000} premiumCents={12900} />,
      SEED_LIGHT
    );
    expect(getByText('Premier Auto')).toBeTruthy();
    expect(getByText('$50,000.00')).toBeTruthy();
    expect(getByText('✓ Active')).toBeTruthy();
  });

  it('V3 mounts the minimal line and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PolicyCardV3 variant="home" name="Home Shield" policyNumber="H-2" coverageCents={30000000} onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('Home Shield')).toBeTruthy();
    fireEvent.press(getByLabelText(/Home Shield/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('ClaimRow V2 / V3 (native)', () => {
  it('V2 mounts a timeline card and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ClaimRowV2 claimNumber="CLM-1" title="Windshield" status="review" amountCents={45000} date="Aug 4" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Windshield')).toBeTruthy();
    expect(getByText('$450.00')).toBeTruthy();
    fireEvent.press(getByLabelText(/Windshield/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V2 collapses a denied claim to a danger badge', () => {
    const { getByText } = renderThemed(
      <ClaimRowV2 claimNumber="CLM-2" title="Denied claim" status="denied" />,
      SEED_DARK
    );
    expect(getByText('✕ Denied')).toBeTruthy();
  });

  it('V3 mounts a dense line with glyph + status text', () => {
    const { getByText } = renderThemed(
      <ClaimRowV3 claimNumber="CLM-3" title="Approved claim" status="approved" amountCents={1000} />,
      SEED_LIGHT
    );
    expect(getByText('Approved claim')).toBeTruthy();
    expect(getByText('✓ Approved')).toBeTruthy();
  });
});

describe('CoverageItem V2 / V3 (native)', () => {
  it('V2 mounts a card with the included pill and limit', () => {
    const { getByText } = renderThemed(
      <CoverageItemV2 label="Collision" included limitCents={2500000} detail="Actual cash value" />,
      SEED_LIGHT
    );
    expect(getByText('Collision')).toBeTruthy();
    expect(getByText('✓ Included')).toBeTruthy();
    expect(getByText('$25,000.00')).toBeTruthy();
  });

  it('V3 marks excluded coverage with a struck label and em-dash (not color-alone)', () => {
    const { getByText } = renderThemed(<CoverageItemV3 label="Flood" included={false} />, SEED_DARK);
    expect(getByText('Flood')).toBeTruthy();
    expect(getByText('—')).toBeTruthy();
  });
});

describe('PremiumSummary V2 / V3 (native)', () => {
  it('V2 mounts a receipt and reconciles the total from the lines', () => {
    const { getByText } = renderThemed(<PremiumSummaryV2 items={ITEMS} cadence="monthly" />, SEED_LIGHT);
    // 14000 - 2000 + 900 = 12900
    expect(getByText('$129.00')).toBeTruthy();
    expect(getByText('−$20.00')).toBeTruthy();
    expect(getByText('Total due')).toBeTruthy();
  });

  it('V3 leads total-first and supports the loading state', () => {
    const loaded = renderThemed(<PremiumSummaryV3 items={ITEMS} />, SEED_DARK);
    expect(loaded.getByText('$129.00')).toBeTruthy();

    const loading: PremiumSummaryV3Props = { items: ITEMS, loading: true };
    const skel = renderThemed(<PremiumSummaryV3 {...loading} />, SEED_LIGHT);
    expect(skel.queryByText('Base premium')).toBeNull();
    expect(skel.getByLabelText('Loading premium')).toBeTruthy();
  });
});

describe('token purity — insurance design variants (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <PolicyCardV2 variant="life" name="Whole Life" policyNumber="L-1" coverageCents={100000000} premiumCents={8000} status="pending" holder="Ada" renewalDate="Sep 1" onPress={() => {}} />
          <PolicyCardV3 variant="health" name="Health Plus" policyNumber="HL-1" coverageCents={2500000} status="lapsed" />
          <ClaimRowV2 claimNumber="CLM-9" title="Roof repair" status="paid" amountCents={120000} date="Aug 1" onPress={() => {}} />
          <ClaimRowV2 claimNumber="CLM-10" title="Denied" status="denied" amountCents={5000} />
          <ClaimRowV3 claimNumber="CLM-11" title="Filed claim" status="filed" amountCents={1000} date="Aug 2" onPress={() => {}} />
          <CoverageItemV2 label="Fire" included limitCents={100000} detail="Replacement cost" />
          <CoverageItemV2 label="Earthquake" included={false} />
          <CoverageItemV3 label="Water damage" included limitCents={50000} />
          <CoverageItemV3 label="Flood" included={false} detail="Rider required" />
          <PremiumSummaryV2 items={ITEMS} />
          <PremiumSummaryV2 items={ITEMS} loading />
          <PremiumSummaryV3 items={ITEMS} />
          <PremiumSummaryV3 items={ITEMS} loading />
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
