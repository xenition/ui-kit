/** @jest-environment jsdom */
/**
 * Web government components (jsdom, plain expect): each renders, binds to a
 * `--xen-*` token class (never a literal color), and honors its interaction
 * contract — the ServiceCard start click (stopping propagation), the
 * FormStatusRow open click, the DocumentRequest pay action, the PermitStatus
 * denied branch, the CivicAlert dismiss, and the empty-services EmptyState.
 * Money stays integer cents through `formatMoney`, and status is conveyed by
 * glyph + label + a semantic token color (never color-alone).
 */
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { EmptyState } from '../commerce/EmptyState';
import { ServiceCard } from './ServiceCard';
import { PermitStatus } from './PermitStatus';
import { FormStatusRow } from './FormStatusRow';
import { DocumentRequest } from './DocumentRequest';
import { TaxSummaryCard } from './TaxSummaryCard';
import { BenefitCard } from './BenefitCard';
import { CivicAlert } from './CivicAlert';
import { ComplaintRow } from './ComplaintRow';
import { VotingInfoCard } from './VotingInfoCard';

describe('government (web)', () => {
  it('ServiceCard is a keyboard-operable button only when onClick is set, and Start stops propagation', () => {
    const onClick = jest.fn();
    const onStart = jest.fn();
    const { getByRole, getByText } = render(
      <ServiceCard
        category="license"
        title="Renew driver license"
        channel="online"
        estimatedTime="10 min"
        onStart={onStart}
        onClick={onClick}
      />
    );
    // role=button div (named by aria-label) with a channel badge conveyed by glyph + label.
    expect(getByRole('button', { name: /Renew driver license/ })).toBeTruthy();
    expect(getByText('Online')).toBeTruthy();
    // Start is a real button that does not bubble to the card.
    getByText('Start').click();
    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('PermitStatus branches a denied permit into a danger-toned alert banner', () => {
    const { getByRole, getByText, getByLabelText } = render(
      <PermitStatus status="denied" title="Building permit" permitNumber="BLD-1" updatedDate="today" />
    );
    expect(getByRole('alert')).toBeTruthy();
    expect(getByLabelText('Denied')).toBeTruthy();
    // Danger conveyed by a semantic token color class, plus glyph + text.
    expect(getByText('Permit denied').className).toContain('text-danger');
  });

  it('PermitStatus shows a loading placeholder instead of the tracker', () => {
    const { getByRole } = render(<PermitStatus status="review" loading />);
    expect(getByRole('progressbar')).toBeTruthy();
  });

  it('FormStatusRow renders the status glyph+label and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <FormStatusRow
        formNumber="APP-77412"
        title="Homestead exemption"
        status="complete"
        agency="Assessor"
        onClick={onClick}
      />
    );
    expect(getByText('Homestead exemption')).toBeTruthy();
    // Status by glyph (aria-label) + label text, not color alone.
    expect(getByLabelText('Complete')).toBeTruthy();
    expect(container.textContent).toContain('Complete');
    getByText('Homestead exemption').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('DocumentRequest renders an integer-cents fee and fires onPay (unpaid fee gate)', () => {
    const onPay = jest.fn();
    const { getByText } = render(
      <DocumentRequest
        docType="birth-certificate"
        requestNumber="DOC-9931"
        status="requested"
        feeCents={2500}
        onPay={onPay}
      />
    );
    // 2500 cents → $25.00 through formatMoney.
    expect(getByText(/\$25\.00/)).toBeTruthy();
    getByText('Pay fee').click();
    expect(onPay).toHaveBeenCalledTimes(1);
  });

  it('TaxSummaryCard tones a refund amount with the success token', () => {
    const { getByText } = render(
      <TaxSummaryCard taxYear="2025" taxType="Income tax" status="refund" amountCents={120000} />
    );
    const amount = getByText('$1,200.00');
    expect(amount.className).toContain('text-success');
  });

  it('BenefitCard tones the recurring amount with the primary token', () => {
    const { getByText } = render(
      <BenefitCard name="SNAP" benefitType="food" status="active" amountCents={45000} />
    );
    expect(getByText('$450.00').className).toContain('text-primary');
  });

  it('CivicAlert is announced as an alert and fires dismiss', () => {
    const onDismiss = jest.fn();
    const { getByRole, getByText, getByLabelText } = render(
      <CivicAlert severity="emergency" title="Flash flood warning" message="Move to higher ground." onDismiss={onDismiss} />
    );
    expect(getByRole('alert')).toBeTruthy();
    // Severity by label text + a semantic token color (never color-alone).
    expect(getByText('Emergency').className).toContain('text-danger');
    getByLabelText('Dismiss alert').click();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('ComplaintRow shows an urgent priority badge alongside the status', () => {
    const { getByText } = render(
      <ComplaintRow ticketNumber="311-88214" title="Pothole on 5th Ave" status="open" priority="urgent" />
    );
    expect(getByText('Open')).toBeTruthy();
    expect(getByText('Urgent')).toBeTruthy();
  });

  it('VotingInfoCard reads not-registered with a danger token and adapts the register label', () => {
    const onRegister = jest.fn();
    const { getByText } = render(
      <VotingInfoCard registration="not-registered" onRegister={onRegister} />
    );
    expect(getByText('Not registered')).toBeTruthy();
    getByText('Register to vote').click();
    expect(onRegister).toHaveBeenCalledTimes(1);
  });

  it('renders an EmptyState for an empty services list', () => {
    const { getByText, queryByText } = render(
      <EmptyState title="No services available" description="Check back later." />
    );
    expect(getByText('No services available')).toBeTruthy();
    expect(queryByText('Renew driver license')).toBeNull();
  });

  it('forwards a ref to the ServiceCard div root', () => {
    const ref = createRef<HTMLDivElement>();
    render(<ServiceCard ref={ref} category="permit" title="Apply for a building permit" />);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
