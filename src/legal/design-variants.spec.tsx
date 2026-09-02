/** @jest-environment jsdom */
/**
 * Alternate legal designs (v2 / v3) for the web (React DOM) — drop-in redesigns of
 * CaseCard, DocumentRow, LegalAppointment, RetainerBalance. Each variant keeps the
 * base props; these specs prove they (a) mount, (b) stay token-pure (no literal hex
 * in inline styles beyond geometric widths), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { CaseCardV2 } from './CaseCardV2';
import { CaseCardV3 } from './CaseCardV3';
import { DocumentRowV2 } from './DocumentRowV2';
import { DocumentRowV3 } from './DocumentRowV3';
import { LegalAppointmentV2 } from './LegalAppointmentV2';
import { LegalAppointmentV3 } from './LegalAppointmentV3';
import { RetainerBalanceV2 } from './RetainerBalanceV2';
import { RetainerBalanceV3 } from './RetainerBalanceV3';
import {
  StatusPillV4,
  CaseCardV4,
  MatterStatusV4,
  DocumentRowV4,
  EvidenceRowV4,
  BillableTimeRowV4,
  ContractClauseV4,
  ClientIntakeRowV4,
  LegalAppointmentV4,
  CourtDateCardV4,
  RetainerBalanceV4,
  SignatureRequestV4,
  DisclaimerBannerV4,
  CASE_STATUS_META,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('CaseCard alternates (web)', () => {
  it('V2 fires onOpen', () => {
    const onOpen = jest.fn();
    const { getByText, container } = render(<CaseCardV2 caseNumber="2026-CV-01184" title="Doe v. Acme" client="Jane Doe" status="open" priority="high" practiceArea="litigation" onOpen={onOpen} />);
    expect(getByText('Doe v. Acme')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Open case'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<CaseCardV3 caseNumber="2026-CV-02" title="Roe Matter" status="pending" priority="normal" onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Roe Matter'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('DocumentRow alternates (web)', () => {
  it('V2 fires onDownload', () => {
    const onDownload = jest.fn();
    const { getByLabelText, container } = render(<DocumentRowV2 title="Complaint.pdf" kind="motion" status="final" version="v3" size="1.2 MB" onDownload={onDownload} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Download'));
    expect(onDownload).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<DocumentRowV3 title="Brief.docx" kind="brief" status="draft" version="v1" onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Brief.docx'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('LegalAppointment alternates (web)', () => {
  it('V2 fires onConfirm', () => {
    const onConfirm = jest.fn();
    const { getByText, container } = render(<LegalAppointmentV2 type="consultation" date="Mon, Aug 24" time="10:00 AM" client="Jane Doe" status="scheduled" actionable onConfirm={onConfirm} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onConfirm', () => {
    const onConfirm = jest.fn();
    const { getByText, container } = render(<LegalAppointmentV3 type="deposition" date="Tue" time="9 AM" client="Acme" status="scheduled" actionable onConfirm={onConfirm} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});

describe('RetainerBalance alternates (web)', () => {
  it('V2 fires onReplenish when low', () => {
    const onReplenish = jest.fn();
    const { getByText, container } = render(<RetainerBalanceV2 balanceCents={5000} initialCents={100000} lowThresholdCents={10000} label="Doe matter" onReplenish={onReplenish} />);
    expect(getByText('Doe matter')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Replenish'));
    expect(onReplenish).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a healthy row', () => {
    const { getByText, container } = render(<RetainerBalanceV3 balanceCents={80000} initialCents={100000} lowThresholdCents={10000} label="Acme matter" />);
    expect(getByText('Acme matter')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('legal V4 "chambers" line (web)', () => {
  it('mounts all 13 V4 blocks (variants + gradient hero) with no inline hex', () => {
    const { getByText, getAllByText, container } = render(
      <div>
        <StatusPillV4 meta={CASE_STATUS_META.appealed} />
        <CaseCardV4 caseNumber="2026-CV-01184" title="Acme v. Globex" client="Acme Corp." practiceArea="litigation" status="open" priority="high" />
        <CaseCardV4 caseNumber="2026-CV-2" title="Doe v. Roe" status="closed" variant="compact" onClick={() => {}} />
        <MatterStatusV4 title="Estate of Smith" stage="discovery" opened="Opened Jan 3" attorney="R. Vance" />
        <DocumentRowV4 title="Complaint.pdf" kind="pleading" status="filed" version="v3" size="1.2 MB" onDownload={() => {}} />
        <EvidenceRowV4 exhibit="Exhibit A-12" title="Security footage" kind="video" status="admitted" custodyVerified />
        <BillableTimeRowV4 date="Aug 24" description="Draft motion to dismiss" hours={1.5} rateCents={40000} status="unbilled" actionable onLog={() => {}} />
        <ContractClauseV4 number="§ 7.2" title="Limitation of liability" body="Neither party shall…" status="flagged" risk="high" expanded onToggle={() => {}} />
        <ClientIntakeRowV4 name="Pat Prospect" practiceArea="family" status="new" conflict="clear" actionable onAccept={() => {}} onDecline={() => {}} />
        <LegalAppointmentV4 type="deposition" date="Mon, Aug 24" time="10:00 AM" status="scheduled" actionable onConfirm={() => {}} onCancel={() => {}} />
        <CourtDateCardV4 type="hearing" date="Sep 14, 2026" urgency="today" court="Dept 21" countdown="Today" />
        <RetainerBalanceV4 balanceCents={125000} initialCents={500000} currency="USD" onReplenish={() => {}} />
        <SignatureRequestV4 document="Engagement letter" signer="Jane Client" signerRole="Client" status="draft" onRequest={() => {}} />
        <DisclaimerBannerV4 tone="warning" message="This is not legal advice." />
      </div>
    );
    expect(getByText('Acme v. Globex')).toBeTruthy();
    expect(getByText('Estate of Smith')).toBeTruthy();
    // Gradient hero chip + body caption both surface "Stage N of 6".
    expect(getAllByText(/Stage 3 of 6/).length).toBeGreaterThan(0);
    expect(getAllByText('$1,250.00').length).toBeGreaterThan(0);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('CaseCardV4 fires onOpen and is a keyboard-activable role="button"', () => {
    const onOpen = jest.fn();
    const onClick = jest.fn();
    const { getByRole } = render(
      <CaseCardV4 caseNumber="2026-CV-3" title="Keyboard case" status="open" onOpen={onOpen} onClick={onClick} />
    );
    const card = getByRole('button', { name: /Keyboard case/ });
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.click(getByRole('button', { name: /open case/i }));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('MatterStatusV4 exposes a progressbar with a token-class fill meter', () => {
    const { getByRole, container } = render(<MatterStatusV4 title="Estate of Smith" stage="discovery" />);
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBeTruthy();
    expect(container.querySelector('.bg-accent')).toBeTruthy();
    expect(container.querySelector('.bg-border')).toBeTruthy();
  });

  it('BillableTimeRowV4 logs time and formats money from integer cents', () => {
    const onLog = jest.fn();
    const { getByRole, getByText } = render(
      <BillableTimeRowV4 date="Aug 24" description="Draft motion" hours={1.5} rateCents={40000} status="unbilled" actionable onLog={onLog} />
    );
    expect(getByText('$600.00')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Log time' }));
    expect(onLog).toHaveBeenCalledTimes(1);
  });

  it('DisclaimerBannerV4 is a role="alert" with a token-class tint', () => {
    const { getByRole } = render(<DisclaimerBannerV4 tone="warning" message="This is not legal advice." />);
    const alert = getByRole('alert');
    expect(alert.getAttribute('aria-label')).toContain('not legal advice');
    expect(alert.className).not.toMatch(HEX_LITERAL);
  });

  it('RetainerBalanceV4 fires onReplenish when low', () => {
    const onReplenish = jest.fn();
    const { getByText } = render(
      <RetainerBalanceV4 balanceCents={5000} initialCents={100000} lowThresholdCents={10000} label="Doe matter" onReplenish={onReplenish} />
    );
    fireEvent.click(getByText('Replenish'));
    expect(onReplenish).toHaveBeenCalledTimes(1);
  });
});
