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
import { EmptyState } from '../commerce/EmptyState';
import { CaseCard } from './CaseCard';
import { DocumentRow } from './DocumentRow';
import { ContractClause } from './ContractClause';
import { LegalAppointment } from './LegalAppointment';
import { BillableTimeRow } from './BillableTimeRow';
import { MatterStatus } from './MatterStatus';
import { ClientIntakeRow } from './ClientIntakeRow';
import { CourtDateCard } from './CourtDateCard';
import { RetainerBalance } from './RetainerBalance';
import { DisclaimerBanner } from './DisclaimerBanner';
import { EvidenceRow } from './EvidenceRow';
import { SignatureRequest } from './SignatureRequest';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('CaseCard (native)', () => {
  it('mounts with number + status word and fires the open-case action', () => {
    const onOpen = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <CaseCard
        caseNumber="2026-CV-01184"
        title="Doe v. Acme Corp"
        client="Jane Doe"
        practiceArea="litigation"
        status="open"
        priority="high"
        onOpen={onOpen}
      />,
      SEED_LIGHT
    );
    expect(getByText('Doe v. Acme Corp')).toBeTruthy();
    // Status carried by word, not color alone.
    expect(getByText('Open')).toBeTruthy();
    // Interaction: open case.
    fireEvent.press(getByLabelText('Open case 2026-CV-01184'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('renders a loading skeleton without crashing', () => {
    const { getByLabelText } = renderThemed(
      <CaseCard caseNumber="X" title="Y" loading />,
      SEED_LIGHT
    );
    expect(getByLabelText('Loading case')).toBeTruthy();
  });
});

describe('BillableTimeRow (native)', () => {
  it('computes cents from hours × rate as an onSurface token and fires log time', () => {
    const onLog = jest.fn();
    const { getByText } = renderThemed(
      <BillableTimeRow
        date="Aug 24"
        description="Draft motion to dismiss"
        hours={1.5}
        rateCents={40000}
        status="unbilled"
        actionable
        onLog={onLog}
      />,
      SEED_LIGHT
    );
    // 1.5h × $400.00 = $600.00, stable 2-decimal, token-colored.
    const amount = getByText('$600.00');
    expect(amount).toBeTruthy();
    expect(flatten(amount.props.style).color).toBe(lightColors.onSurface);
    expect(getByText('1h 30m')).toBeTruthy();
    // Interaction: log time.
    fireEvent.press(getByText('Log time'));
    expect(onLog).toHaveBeenCalledTimes(1);
  });

  it('honors an explicit amountCents override', () => {
    const { getByText } = renderThemed(
      <BillableTimeRow date="Aug 25" description="Call with client" hours={0.5} amountCents={12500} status="billed" />,
      SEED_LIGHT
    );
    expect(getByText('$125.00')).toBeTruthy();
  });
});

describe('SignatureRequest (native)', () => {
  it('shows "Request signature" for a draft and fires onRequest', () => {
    const onRequest = jest.fn();
    const { getByText } = renderThemed(
      <SignatureRequest
        document="Engagement Letter"
        signer="Jane Doe"
        signerRole="Client"
        status="draft"
        onRequest={onRequest}
      />,
      SEED_LIGHT
    );
    expect(getByText('Draft')).toBeTruthy();
    // Interaction: request signature.
    fireEvent.press(getByText('Request signature'));
    expect(onRequest).toHaveBeenCalledTimes(1);
  });

  it('offers Sign while awaiting and hides it once signed', () => {
    const onSign = jest.fn();
    const awaiting = renderThemed(
      <SignatureRequest document="NDA" signer="Sam Lee" status="sent" onSign={onSign} onRemind={jest.fn()} />,
      SEED_LIGHT
    );
    fireEvent.press(awaiting.getByText('Sign'));
    expect(onSign).toHaveBeenCalledTimes(1);

    const signed = renderThemed(
      <SignatureRequest document="NDA" signer="Sam Lee" status="signed" onSign={jest.fn()} />,
      SEED_LIGHT
    );
    expect(signed.queryByText('Sign')).toBeNull();
    expect(signed.getByText('Signed')).toBeTruthy();
  });
});

describe('ContractClause (native)', () => {
  it('toggles the body via onToggle (interaction)', () => {
    const onToggle = jest.fn();
    const { getByLabelText, queryByText } = renderThemed(
      <ContractClause
        number="§ 7.2"
        title="Limitation of Liability"
        body="Neither party shall be liable for indirect damages."
        status="flagged"
        risk="high"
        expanded={false}
        onToggle={onToggle}
      />,
      SEED_LIGHT
    );
    // Collapsed: body hidden.
    expect(queryByText('Neither party shall be liable for indirect damages.')).toBeNull();
    fireEvent.press(getByLabelText('Expand clause Limitation of Liability'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('RetainerBalance (native)', () => {
  it('derives a low status by word and fires replenish', () => {
    const onReplenish = jest.fn();
    const { getByText } = renderThemed(
      <RetainerBalance balanceCents={15000} initialCents={500000} lowThresholdCents={50000} onReplenish={onReplenish} />,
      SEED_LIGHT
    );
    expect(getByText('$150.00')).toBeTruthy();
    // Status conveyed by word.
    expect(getByText('Running low')).toBeTruthy();
    fireEvent.press(getByText('Replenish'));
    expect(onReplenish).toHaveBeenCalledTimes(1);
  });
});

describe('legal list empty state (native)', () => {
  it('renders an EmptyState placeholder for a matter with no documents', () => {
    const { getByText } = renderThemed(
      <EmptyState title="No documents" description="Upload a filing to get started." />,
      SEED_LIGHT
    );
    expect(getByText('No documents')).toBeTruthy();
    expect(getByText('Upload a filing to get started.')).toBeTruthy();
  });
});

describe('smoke: remaining blocks mount', () => {
  it('DocumentRow, LegalAppointment, MatterStatus, ClientIntakeRow, CourtDateCard, EvidenceRow, DisclaimerBanner', () => {
    const doc = renderThemed(
      <DocumentRow title="Complaint.pdf" kind="pleading" status="filed" version="v2" onPress={jest.fn()} onDownload={jest.fn()} />,
      SEED_LIGHT
    );
    expect(doc.getByText('Complaint.pdf')).toBeTruthy();
    expect(doc.getByText('Filed')).toBeTruthy();

    const appt = renderThemed(
      <LegalAppointment type="deposition" date="Mon, Aug 24" time="10:00 AM" client="Jane Doe" status="scheduled" actionable onConfirm={jest.fn()} onCancel={jest.fn()} />,
      SEED_LIGHT
    );
    expect(appt.getByText('Confirm')).toBeTruthy();

    const matter = renderThemed(
      <MatterStatus title="Doe v. Acme" stage="discovery" opened="Jan 3" attorney="R. Vance" />,
      SEED_LIGHT
    );
    expect(matter.getByLabelText(/Discovery, .* complete/)).toBeTruthy();

    const intake = renderThemed(
      <ClientIntakeRow name="Kim Park" practiceArea="family" status="qualified" conflict="clear" actionable onAccept={jest.fn()} onDecline={jest.fn()} />,
      SEED_LIGHT
    );
    expect(intake.getByText('Accept')).toBeTruthy();

    const court = renderThemed(
      <CourtDateCard type="hearing" date="Sep 14, 2026" time="9:00 AM" court="Superior Court" urgency="soon" countdown="in 3 days" />,
      SEED_LIGHT
    );
    expect(court.getByText('Sep 14, 2026')).toBeTruthy();
    expect(court.getByText('Soon')).toBeTruthy();

    const ev = renderThemed(
      <EvidenceRow exhibit="Exhibit A-12" title="Signed contract" kind="document" status="admitted" custodyVerified />,
      SEED_LIGHT
    );
    expect(ev.getByText('Admitted')).toBeTruthy();

    const banner = renderThemed(
      <DisclaimerBanner tone="warning" message="This is not legal advice." onDismiss={jest.fn()} />,
      SEED_LIGHT
    );
    expect(banner.getByText('This is not legal advice.')).toBeTruthy();
  });
});

describe('token purity (native legal, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <CaseCard caseNumber="2026-CV-01" title="Doe v. Acme" client="Jane Doe" practiceArea="litigation" status="open" priority="urgent" variant="detailed" leadAttorney="R. Vance" nextEvent="Hearing Sep 14" onOpen={jest.fn()} onPress={jest.fn()} />
          <CaseCard caseNumber="2025-CR-77" title="State v. Roe" status="closed" variant="compact" />
          <DocumentRow title="Motion.pdf" kind="motion" status="review" version="v3" size="1.2 MB" author="Dana" onDownload={jest.fn()} />
          <ContractClause number="§ 4.1" title="Indemnification" body="Full indemnity." status="negotiate" risk="medium" expanded onToggle={jest.fn()} />
          <ContractClause title="Term" status="agreed" risk="low" />
          <LegalAppointment type="mediation" date="Aug 24" time="2 PM" location="Room 3" client="Acme" status="confirmed" />
          <LegalAppointment type="hearing" date="Sep 1" status="cancelled" />
          <BillableTimeRow date="Aug 24" description="Research" hours={2.25} rateCents={35000} status="unbilled" timekeeper="RV" actionable onLog={jest.fn()} />
          <MatterStatus title="Doe v. Acme" stage="trial" progressPct={80} opened="Jan 3" attorney="R. Vance" onPress={jest.fn()} />
          <MatterStatus stage="intake" variant="compact" />
          <ClientIntakeRow name="Kim Park" practiceArea="ip" status="new" conflict="conflict" source="Web form" summary="Patent dispute." actionable onAccept={jest.fn()} onDecline={jest.fn()} />
          <CourtDateCard type="deadline" date="Sep 14" time="5 PM" court="Superior Court" judge="Hon. Alvarez" caseNumber="2026-CV-01" urgency="today" countdown="Today" />
          <CourtDateCard type="trial" date="Oct 2" urgency="past" variant="compact" />
          <RetainerBalance balanceCents={15000} initialCents={500000} lowThresholdCents={50000} label="Doe retainer" onReplenish={jest.fn()} />
          <RetainerBalance balanceCents={480000} initialCents={500000} status="healthy" />
          <RetainerBalance balanceCents={0} loading />
          <DisclaimerBanner tone="info" message="Informational only." />
          <DisclaimerBanner tone="notice" variant="outline" message="Privileged & confidential." />
          <DisclaimerBanner tone="warning" variant="solid" message="Statute of limitations approaching." onDismiss={jest.fn()} />
          <DisclaimerBanner tone="critical" message="Do not distribute." />
          <EvidenceRow exhibit="Exhibit B-3" title="Surveillance footage" kind="video" status="objected" source="Chain: Det. Ruiz" date="Jul 2" custodyVerified />
          <SignatureRequest document="Engagement Letter" signer="Jane Doe" signerRole="Client" status="draft" sentDate="Aug 1" dueDate="Aug 8" onRequest={jest.fn()} />
          <SignatureRequest document="NDA" signer="Sam Lee" status="sent" onSign={jest.fn()} onRemind={jest.fn()} onPress={jest.fn()} />
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
