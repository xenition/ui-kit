/** @jest-environment jsdom */
/**
 * Web v2/v3 alternate designs for the insurance module: each drop-in variant
 * renders (smoke), stays token-pure (no literal hex in any inline style — every
 * color traces to a `--xen-*` token class), and honours one key interaction /
 * state contract. Base props are unchanged — these are additive.
 */
import { fireEvent, render } from '@testing-library/react';
import { ClaimRowV2 } from './ClaimRowV2';
import { ClaimRowV3 } from './ClaimRowV3';
import { CoverageItemV2 } from './CoverageItemV2';
import { CoverageItemV3 } from './CoverageItemV3';
import { PolicyCardV2 } from './PolicyCardV2';
import { PolicyCardV3 } from './PolicyCardV3';
import { PremiumSummaryV2 } from './PremiumSummaryV2';
import { PremiumSummaryV3 } from './PremiumSummaryV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('ClaimRow alternates (web)', () => {
  it('V2 renders the timeline chip + amount, is token-pure, and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <ClaimRowV2
        claimNumber="CLM-20481"
        title="Windshield replacement"
        status="review"
        amountCents={45000}
        onClick={onClick}
      />
    );
    expect(getByText('Windshield replacement')).toBeTruthy();
    expect(getByText('$450.00')).toBeTruthy();
    expect(container.textContent).toContain('In review');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    getByText('Windshield replacement').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line with glyph+label and is token-pure', () => {
    const { getByText, container } = render(
      <ClaimRowV3 claimNumber="CLM-9" title="Roof leak" status="denied" amountCents={12000} />
    );
    expect(getByText('Roof leak')).toBeTruthy();
    expect(container.textContent).toContain('Denied');
    expect(getByText('$120.00')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('CoverageItem alternates (web)', () => {
  it('V2 renders an included pill + limit block and is token-pure', () => {
    const { getByText, getByLabelText, container } = render(
      <CoverageItemV2 label="Collision" included limitCents={5000000} detail="Up to actual cash value" />
    );
    expect(getByText('Collision')).toBeTruthy();
    expect(getByText('Coverage limit')).toBeTruthy();
    expect(getByText('$50,000.00')).toBeTruthy();
    expect(container.textContent).toContain('Included');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('V3 strikes an excluded label (glyph, not color-alone) and is token-pure', () => {
    const { getByText, getByLabelText, container } = render(
      <CoverageItemV3 label="Rental car" included={false} />
    );
    const label = getByText('Rental car');
    expect(label.className).toContain('line-through');
    expect(getByLabelText('Not included')).toBeTruthy();
    expect(getByText('—')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PolicyCard alternates (web)', () => {
  it('V2 renders the hero coverage band, is token-pure, and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <PolicyCardV2
        variant="auto"
        name="Premier Auto"
        policyNumber="AUTO-4821-93"
        coverageCents={100000000}
        premiumCents={12500}
        status="active"
        onClick={onClick}
      />
    );
    expect(getByText('Total coverage')).toBeTruthy();
    expect(getByLabelText('Coverage $1,000,000.00')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Premier Auto'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a minimal line with status glyph+label and is token-pure', () => {
    const { getByText, container } = render(
      <PolicyCardV3
        variant="home"
        name="HomeGuard"
        policyNumber="HOME-1"
        coverageCents={50000000}
        status="lapsed"
      />
    );
    expect(getByText('HomeGuard')).toBeTruthy();
    expect(container.textContent).toContain('Lapsed');
    expect(getByText('$500,000.00')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PremiumSummary alternates (web)', () => {
  it('V2 derives the total, tones a credit success, and is token-pure', () => {
    const { getByText, container } = render(
      <PremiumSummaryV2
        items={[
          { label: 'Base premium', amountCents: 12000 },
          { label: 'Multi-policy discount', amountCents: -2000 },
        ]}
      />
    );
    // Derived total = 12000 - 2000 = 10000 cents.
    expect(getByText('$100.00').className).toContain('text-primary');
    expect(getByText('−$20.00').className).toContain('text-success');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('V3 leads total-first and renders a loading skeleton', () => {
    const { getByLabelText, container } = render(
      <PremiumSummaryV3 items={[{ label: 'Base premium', amountCents: 9900 }]} />
    );
    expect(getByLabelText('Total premium $99.00 per month')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);

    const loading = render(<PremiumSummaryV3 items={[]} loading />);
    expect(loading.getByLabelText('Loading premium')).toBeTruthy();
  });
});
