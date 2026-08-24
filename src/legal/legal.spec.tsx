/** @jest-environment jsdom */
/**
 * Legal module (web): render smoke for the law-practice blocks, token-purity
 * (no hex literals leak into inline styles), the glyph+word status contract, and
 * the behavioral contracts (open case / log time / request signature, plus the
 * empty state). Pure Tailwind-class components — no theme provider needed.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import {
  CaseCard,
  DocumentRow,
  ContractClause,
  LegalAppointment,
  BillableTimeRow,
  MatterStatus,
  ClientIntakeRow,
  CourtDateCard,
  RetainerBalance,
  DisclaimerBanner,
  EvidenceRow,
  SignatureRequest,
  StatusPill,
  EmptyState,
  CASE_STATUS_META,
  billableCents,
  formatHours,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** Assert no element in the tree carries a hex color in an inline `style`. */
function expectNoHexInInlineStyles(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
    expect(el.getAttribute('style') ?? '').not.toMatch(HEX_LITERAL);
  });
}

describe('legal (web)', () => {
  it('CaseCard renders docket + caption and a token-class status pill', () => {
    const { getByText, container } = render(
      <CaseCard
        caseNumber="2026-CV-01184"
        title="Acme v. Globex"
        client="Acme Corp."
        practiceArea="litigation"
        status="open"
        priority="high"
      />
    );
    expect(getByText('2026-CV-01184')).toBeTruthy();
    expect(getByText('Acme v. Globex')).toBeTruthy();
    // `open` → success tone soft pill: glyph + word, token class, never color-only.
    const pill = container.querySelector('[data-xen-status-pill="success"]');
    expect(pill).toBeTruthy();
    expect(pill?.className).toContain('bg-success');
    expect(pill?.textContent).toContain(CASE_STATUS_META.open.label);
    expectNoHexInInlineStyles(container);
  });

  it('CaseCard fires onOpen when the "Open case" button is clicked', () => {
    const onOpen = jest.fn();
    const { getByRole } = render(
      <CaseCard caseNumber="2026-CV-2" title="Doe v. Roe" status="pending" onOpen={onOpen} />
    );
    const btn = getByRole('button', { name: /open case/i });
    expect(btn.tagName).toBe('BUTTON');
    fireEvent.click(btn);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('CaseCard is an accessible role="button" activable by keyboard when onClick is set', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <CaseCard caseNumber="2026-CV-3" title="Keyboard case" onClick={onClick} />
    );
    const card = getByRole('button', { name: /Keyboard case/ });
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('CaseCard shows a loading skeleton instead of content', () => {
    const { getByLabelText, queryByText } = render(
      <CaseCard caseNumber="X" title="Hidden while loading" loading />
    );
    expect(getByLabelText('Loading case')).toBeTruthy();
    expect(queryByText('Hidden while loading')).toBeNull();
  });

  it('BillableTimeRow logs time and formats money from integer cents', () => {
    const onLog = jest.fn();
    // 1.5h × $400/h = $600.00
    expect(billableCents(1.5, 40000)).toBe(60000);
    expect(formatHours(1.5)).toBe('1h 30m');
    const { getByRole, getByText, container } = render(
      <BillableTimeRow
        date="Aug 24"
        description="Draft motion to dismiss"
        hours={1.5}
        rateCents={40000}
        status="unbilled"
        actionable
        onLog={onLog}
      />
    );
    expect(getByText('$600.00')).toBeTruthy();
    const btn = getByRole('button', { name: 'Log time' });
    fireEvent.click(btn);
    expect(onLog).toHaveBeenCalledTimes(1);
    expectNoHexInInlineStyles(container);
  });

  it('SignatureRequest requests a signature when in draft', () => {
    const onRequest = jest.fn();
    const { getByRole, getByText } = render(
      <SignatureRequest
        document="Engagement letter"
        signer="Jane Client"
        signerRole="Client"
        status="draft"
        onRequest={onRequest}
      />
    );
    expect(getByText('Engagement letter')).toBeTruthy();
    const btn = getByRole('button', { name: 'Request signature' });
    fireEvent.click(btn);
    expect(onRequest).toHaveBeenCalledTimes(1);
  });

  it('MatterStatus exposes a progressbar with a token-class fill meter', () => {
    const { getByRole, container } = render(
      <MatterStatus title="Estate of Smith" stage="discovery" opened="Opened Jan 3" />
    );
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBeTruthy();
    // discovery → accent tone fill; segments use bg-accent / bg-border tokens.
    expect(container.querySelector('.bg-accent')).toBeTruthy();
    expect(container.querySelector('.bg-border')).toBeTruthy();
    expectNoHexInInlineStyles(container);
  });

  it('DisclaimerBanner is a role="alert" with a token-class tint', () => {
    const { getByRole } = render(
      <DisclaimerBanner tone="warning" message="This is not legal advice." />
    );
    const alert = getByRole('alert');
    expect(alert).toBeTruthy();
    expect(alert.getAttribute('aria-label')).toContain('not legal advice');
    // token class, not a literal color
    expect(alert.className).not.toMatch(HEX_LITERAL);
  });

  it('DocumentRow renders a status pill and a real download <button>', () => {
    const onDownload = jest.fn();
    const { getByRole, getByText } = render(
      <DocumentRow title="Complaint.pdf" kind="pleading" status="filed" version="v3" onDownload={onDownload} />
    );
    expect(getByText('Complaint.pdf')).toBeTruthy();
    const btn = getByRole('button', { name: /download complaint/i });
    expect(btn.tagName).toBe('BUTTON');
    fireEvent.click(btn);
    expect(onDownload).toHaveBeenCalledTimes(1);
  });

  it('EvidenceRow, CourtDateCard, ClientIntakeRow, ContractClause, LegalAppointment, RetainerBalance all render', () => {
    const { getByText, container } = render(
      <div>
        <EvidenceRow exhibit="Exhibit A-12" title="Security footage" kind="video" status="admitted" custodyVerified />
        <CourtDateCard type="hearing" date="Sep 14, 2026" urgency="today" court="Dept 21" countdown="Today" />
        <ClientIntakeRow name="Pat Prospect" practiceArea="family" status="new" conflict="clear" actionable onAccept={() => {}} onDecline={() => {}} />
        <ContractClause number="§ 7.2" title="Limitation of liability" body="Neither party shall…" status="flagged" risk="high" expanded onToggle={() => {}} />
        <LegalAppointment type="deposition" date="Mon, Aug 24" time="10:00 AM" status="scheduled" actionable onConfirm={() => {}} onCancel={() => {}} />
        <RetainerBalance balanceCents={125000} initialCents={500000} currency="USD" onReplenish={() => {}} />
      </div>
    );
    expect(getByText('Security footage')).toBeTruthy();
    expect(getByText('Chain verified', { exact: false })).toBeTruthy();
    expect(getByText('Limitation of liability')).toBeTruthy();
    expect(getByText('$1,250.00')).toBeTruthy();
    expectNoHexInInlineStyles(container);
  });

  it('StatusPill renders glyph + word and forwards its ref', () => {
    const ref = createRef<HTMLSpanElement>();
    const { getByText } = render(<StatusPill ref={ref} meta={CASE_STATUS_META.appealed} />);
    expect(ref.current?.tagName).toBe('SPAN');
    expect(getByText(CASE_STATUS_META.appealed.glyph)).toBeTruthy();
    expect(getByText(CASE_STATUS_META.appealed.label)).toBeTruthy();
  });

  it('EmptyState (no cases) renders a title + action', () => {
    const { getByText } = render(
      <EmptyState title="No open cases" description="Open a matter to get started." action={<button>New case</button>} />
    );
    expect(getByText('No open cases')).toBeTruthy();
    expect(getByText('New case')).toBeTruthy();
  });
});
