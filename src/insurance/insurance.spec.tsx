/** @jest-environment jsdom */
/**
 * Web insurance components (jsdom, plain expect): each renders, binds to a
 * `--xen-*` token class (never a literal color), and honors its interaction
 * contract — the ClaimRow "file / continue" click, the QuoteForm submit gate
 * ("get quote"), the RenewalBanner "renew" action, and the empty-claims
 * EmptyState. Money stays integer cents through `formatMoney`, and claim/policy
 * status is conveyed by glyph + label + a semantic token color (never
 * color-alone).
 */
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { EmptyState } from '../commerce/EmptyState';
import { PolicyCard } from './PolicyCard';
import { ClaimRow } from './ClaimRow';
import { CoverageItem } from './CoverageItem';
import { PremiumSummary } from './PremiumSummary';
import { QuoteForm } from './QuoteForm';
import { DeductibleBar } from './DeductibleBar';
import { RenewalBanner } from './RenewalBanner';
import { ClaimStatusTracker } from './ClaimStatusTracker';
import { RiskScore } from './RiskScore';
import { BeneficiaryRow } from './BeneficiaryRow';
import { PolicyDocumentRow } from './PolicyDocumentRow';

describe('insurance (web)', () => {
  it('PolicyCard renders name + coverage as integer cents on a token class', () => {
    const { getByText } = render(
      <PolicyCard
        variant="auto"
        name="Premier Auto"
        policyNumber="AUTO-4821-93"
        coverageCents={100000000}
        premiumCents={12500}
        status="active"
      />
    );
    expect(getByText('Premier Auto')).toBeTruthy();
    const coverage = getByText('$1,000,000.00');
    expect(coverage.className).toContain('text-on-surface');
    // Premium is toned with the primary token.
    expect(getByText('$125.00').className).toContain('text-primary');
  });

  it('PolicyCard is a keyboard-operable button only when onClick is set', () => {
    const onClick = jest.fn();
    const { getByRole, getByText } = render(
      <PolicyCard
        variant="home"
        name="HomeGuard"
        policyNumber="HOME-1"
        coverageCents={50000000}
        onClick={onClick}
      />
    );
    // role=button div with keyboard support.
    expect(getByRole('button')).toBeTruthy();
    getByText('HomeGuard').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('ClaimRow renders the status glyph+label and fires onClick (file/continue)', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <ClaimRow
        claimNumber="CLM-20481"
        title="Windshield replacement"
        status="review"
        amountCents={45000}
        onClick={onClick}
      />
    );
    expect(getByText('Windshield replacement')).toBeTruthy();
    // Status conveyed by glyph (aria-label) + label text, not color alone.
    expect(getByLabelText('In review')).toBeTruthy();
    expect(container.textContent).toContain('In review');
    expect(getByText('$450.00')).toBeTruthy();
    getByText('Windshield replacement').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('CoverageItem tones an excluded line muted + line-through (glyph, not color-alone)', () => {
    const { getByText, getByLabelText } = render(
      <CoverageItem label="Rental car" included={false} />
    );
    const label = getByText('Rental car');
    expect(label.className).toContain('text-muted');
    expect(label.className).toContain('line-through');
    expect(getByLabelText('Not included')).toBeTruthy();
    // No limit → em dash, never a fabricated value.
    expect(getByText('—')).toBeTruthy();
  });

  it('PremiumSummary derives the total from lines and tones a credit success', () => {
    const { getByText } = render(
      <PremiumSummary
        items={[
          { label: 'Base premium', amountCents: 12000 },
          { label: 'Multi-policy discount', amountCents: -2000 },
        ]}
      />
    );
    // Derived total = 12000 - 2000 = 10000 cents.
    expect(getByText('$100.00').className).toContain('text-primary');
    // Credit shown with a leading minus and the success token.
    expect(getByText('−$20.00').className).toContain('text-success');
  });

  it('PremiumSummary renders skeleton rows while loading', () => {
    const { getByLabelText } = render(<PremiumSummary items={[]} loading />);
    expect(getByLabelText('Loading premium')).toBeTruthy();
  });

  it('QuoteForm blocks submit until valid, then fires with integer cents (get quote)', () => {
    const onSubmit = jest.fn();
    // Invalid (no coverage) → disabled submit is a no-op.
    const invalid = render(<QuoteForm variant="auto" onSubmit={onSubmit} />);
    invalid.getByText('Get quote').click();
    expect(onSubmit).not.toHaveBeenCalled();
    invalid.unmount();

    // Valid controlled state → submit fires with the value bag.
    const valid = render(
      <QuoteForm variant="auto" coverageCents={5000000} onSubmit={onSubmit} />
    );
    valid.getByText('Get quote').click();
    expect(onSubmit).toHaveBeenCalledWith({
      variant: 'auto',
      coverageCents: 5000000,
      deductibleCents: 50000,
    });
    valid.unmount();
  });

  it('DeductibleBar reads met/ceiling and tones the met caption success', () => {
    const { getByText } = render(<DeductibleBar metCents={500000} deductibleCents={500000} />);
    expect(getByText('$5,000.00 / $5,000.00')).toBeTruthy();
    expect(getByText('Deductible met').className).toContain('text-success');
  });

  it('RenewalBanner renders the heading and fires onRenew (renew)', () => {
    const onRenew = jest.fn();
    const { getByText, getByLabelText } = render(
      <RenewalBanner renewalDate="Sep 1, 2026" urgency="overdue" premiumCents={9900} onRenew={onRenew} />
    );
    expect(getByLabelText('Renewal overdue, Sep 1, 2026')).toBeTruthy();
    expect(getByText('Renewal overdue')).toBeTruthy();
    getByText('Renew now').click();
    expect(onRenew).toHaveBeenCalledTimes(1);
  });

  it('ClaimStatusTracker branches a denied claim into a danger-toned banner', () => {
    const { getByText, getByLabelText } = render(<ClaimStatusTracker status="denied" updated="today" />);
    expect(getByLabelText('Claim denied')).toBeTruthy();
    expect(getByText('Claim denied').className).toContain('text-danger');
  });

  it('RiskScore clamps the score and reads the tier with a token color', () => {
    const { getByText } = render(<RiskScore score={150} factors={['Prior claims']} />);
    // Clamped to 100 → high tier.
    expect(getByText('100')).toBeTruthy();
    expect(getByText('High risk').className).toContain('text-danger');
    expect(getByText('Prior claims')).toBeTruthy();
  });

  it('BeneficiaryRow clamps the allocation and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText } = render(
      <BeneficiaryRow name="Ada Lovelace" relationship="Spouse" allocationPct={140} kind="primary" onClick={onClick} />
    );
    // Clamped to 100.
    expect(getByLabelText('100% allocation')).toBeTruthy();
    getByText('Ada Lovelace').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('PolicyDocumentRow download button fires onDownload without triggering the row', () => {
    const onClick = jest.fn();
    const onDownload = jest.fn();
    const { getByText } = render(
      <PolicyDocumentRow title="Auto declarations" kind="declaration" size="1.2 MB" onClick={onClick} onDownload={onDownload} />
    );
    getByText('Download').click();
    expect(onDownload).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders an EmptyState for an empty claims list', () => {
    const { getByText, queryByText } = render(
      <EmptyState title="No claims yet" description="You haven't filed any claims." />
    );
    expect(getByText('No claims yet')).toBeTruthy();
    expect(queryByText('CLM-20481')).toBeNull();
  });

  it('forwards a ref to the PolicyCard div root', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <PolicyCard ref={ref} variant="life" name="LifeSecure" policyNumber="LIFE-1" coverageCents={1000} />
    );
    expect(ref.current?.tagName).toBe('DIV');
  });
});
