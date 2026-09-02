/**
 * Alternate-design (v2 / v3) specs for the frequently-used legal blocks. Each
 * variant is a drop-in with the SAME Props as its base component, so these
 * render them, assert they mount with status carried by a word (never color
 * alone), assert token purity across both seeds (every rendered style hex traces
 * to a compiled token), and exercise one interaction per family.
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
import { CaseCardV2, CaseCardV3 } from './CaseCardVariants';
import { DocumentRowV2, DocumentRowV3 } from './DocumentRowVariants';
import { LegalAppointmentV2, LegalAppointmentV3 } from './LegalAppointmentVariants';
import { RetainerBalanceV2, RetainerBalanceV3 } from './RetainerBalanceVariants';
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

describe('CaseCard alternate designs (native)', () => {
  it('V2 mounts with status word and fires open-case', () => {
    const onOpen = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <CaseCardV2 caseNumber="2026-CV-01184" title="Doe v. Acme Corp" client="Jane Doe" practiceArea="litigation" status="open" priority="high" onOpen={onOpen} onPress={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByText('Doe v. Acme Corp')).toBeTruthy();
    expect(getByText('Open')).toBeTruthy();
    fireEvent.press(getByLabelText('Open case 2026-CV-01184'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('V2 renders a loading skeleton', () => {
    const { getByLabelText } = renderThemed(<CaseCardV2 caseNumber="X" title="Y" loading />, SEED_LIGHT);
    expect(getByLabelText('Loading case')).toBeTruthy();
  });

  it('V3 mounts as a line and opens on row press', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <CaseCardV3 caseNumber="2025-CR-77" title="State v. Roe" status="pending" priority="urgent" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('State v. Roe')).toBeTruthy();
    expect(getByText('Pending')).toBeTruthy();
    fireEvent.press(getByLabelText('Case 2025-CR-77: State v. Roe'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('DocumentRow alternate designs (native)', () => {
  it('V2 mounts with status word and fires download', () => {
    const onDownload = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DocumentRowV2 title="Complaint.pdf" kind="pleading" status="filed" version="v2" size="1.2 MB" author="Dana" onPress={jest.fn()} onDownload={onDownload} />,
      SEED_LIGHT
    );
    expect(getByText('Complaint.pdf')).toBeTruthy();
    expect(getByText('Filed')).toBeTruthy();
    fireEvent.press(getByLabelText('Download Complaint.pdf'));
    expect(onDownload).toHaveBeenCalledTimes(1);
  });

  it('V3 mounts as a dense line', () => {
    const { getByText } = renderThemed(
      <DocumentRowV3 title="Motion.pdf" kind="motion" status="review" version="v3" modified="Aug 24" />,
      SEED_LIGHT
    );
    expect(getByText('Motion.pdf')).toBeTruthy();
    expect(getByText('In review')).toBeTruthy();
  });
});

describe('LegalAppointment alternate designs (native)', () => {
  it('V2 mounts a date block and fires confirm', () => {
    const onConfirm = jest.fn();
    const { getByText } = renderThemed(
      <LegalAppointmentV2 type="deposition" date="Mon, Aug 24" time="10:00 AM" location="Room 3" client="Jane Doe" status="scheduled" actionable onConfirm={onConfirm} onCancel={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByText('Mon, Aug 24')).toBeTruthy();
    expect(getByText('Scheduled')).toBeTruthy();
    fireEvent.press(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('V3 mounts as a compact line', () => {
    const { getByText } = renderThemed(
      <LegalAppointmentV3 type="hearing" date="Sep 1" time="9:00 AM" status="confirmed" />,
      SEED_LIGHT
    );
    expect(getByText('Sep 1')).toBeTruthy();
    expect(getByText('Confirmed')).toBeTruthy();
  });
});

describe('RetainerBalance alternate designs (native)', () => {
  it('V2 shows the balance + status word and fires replenish', () => {
    const onReplenish = jest.fn();
    const { getByText } = renderThemed(
      <RetainerBalanceV2 balanceCents={15000} initialCents={500000} lowThresholdCents={50000} label="Doe retainer" onReplenish={onReplenish} />,
      SEED_LIGHT
    );
    expect(getByText('$150.00')).toBeTruthy();
    expect(getByText('Running low')).toBeTruthy();
    fireEvent.press(getByText('Replenish'));
    expect(onReplenish).toHaveBeenCalledTimes(1);
  });

  it('V2 renders a loading skeleton', () => {
    const { getByLabelText } = renderThemed(<RetainerBalanceV2 balanceCents={0} loading />, SEED_LIGHT);
    expect(getByLabelText('Loading retainer')).toBeTruthy();
  });

  it('V3 shows a minimal balance row and fires replenish', () => {
    const onReplenish = jest.fn();
    const { getByText } = renderThemed(
      <RetainerBalanceV3 balanceCents={0} initialCents={500000} label="Roe retainer" onReplenish={onReplenish} />,
      SEED_LIGHT
    );
    expect(getByText('$0.00')).toBeTruthy();
    expect(getByText('Depleted')).toBeTruthy();
    fireEvent.press(getByText('Replenish'));
    expect(onReplenish).toHaveBeenCalledTimes(1);
  });
});

describe('token purity (native legal alternate designs, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <CaseCardV2 caseNumber="2026-CV-01" title="Doe v. Acme" client="Jane Doe" practiceArea="corporate" status="open" priority="urgent" variant="detailed" leadAttorney="R. Vance" nextEvent="Hearing Sep 14" onOpen={jest.fn()} onPress={jest.fn()} />
          <CaseCardV2 caseNumber="2025-CR-77" title="State v. Roe" status="closed" variant="compact" />
          <CaseCardV2 caseNumber="L" title="L" loading />
          <CaseCardV3 caseNumber="2026-CV-02" title="Kim v. Corp" client="Kim Park" status="onHold" priority="high" onPress={jest.fn()} />
          <CaseCardV3 caseNumber="L" title="L" loading />
          <DocumentRowV2 title="Motion.pdf" kind="motion" status="review" version="v3" size="1.2 MB" author="Dana" onPress={jest.fn()} onDownload={jest.fn()} />
          <DocumentRowV2 title="Note.txt" kind="other" variant="compact" />
          <DocumentRowV3 title="Brief.pdf" kind="brief" status="signed" version="v1" modified="Aug 24" onDownload={jest.fn()} onPress={jest.fn()} />
          <LegalAppointmentV2 type="mediation" date="Aug 24" time="2 PM" location="Room 3" client="Acme" status="confirmed" />
          <LegalAppointmentV2 type="hearing" date="Sep 1" status="cancelled" actionable onConfirm={jest.fn()} onCancel={jest.fn()} onPress={jest.fn()} />
          <LegalAppointmentV3 type="call" date="Sep 2" time="4 PM" client="Sam Lee" status="scheduled" onPress={jest.fn()} />
          <LegalAppointmentV3 type="consultation" date="Sep 3" status="cancelled" />
          <RetainerBalanceV2 balanceCents={15000} initialCents={500000} lowThresholdCents={50000} label="Doe retainer" onReplenish={jest.fn()} />
          <RetainerBalanceV2 balanceCents={480000} initialCents={500000} status="healthy" variant="compact" />
          <RetainerBalanceV2 balanceCents={0} loading />
          <RetainerBalanceV3 balanceCents={2500} initialCents={500000} lowThresholdCents={50000} label="Roe retainer" onReplenish={jest.fn()} />
          <RetainerBalanceV3 balanceCents={480000} status="replenished" />
          <RetainerBalanceV3 balanceCents={0} loading />
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

/** All 13 V4 "chambers" components in ONE tree — the gradient MatterStatusV4 hero
 * is always present, plus compact/detailed variants and critical-status tones.
 * Shared by the mount test and the both-seeds token-purity block. */
const AllLegalV4 = (
  <>
    <StatusPillV4 meta={CASE_STATUS_META.appealed} />
    <CaseCardV4 caseNumber="2026-CV-01184" title="Acme v. Globex" client="Acme Corp." practiceArea="litigation" status="open" priority="high" variant="detailed" leadAttorney="R. Vance" nextEvent="Hearing Sep 14" onPress={() => {}} />
    <CaseCardV4 caseNumber="2026-CV-2" title="Doe v. Roe" status="closed" variant="compact" onOpen={() => {}} />
    <MatterStatusV4 title="Estate of Smith" stage="discovery" opened="Opened Jan 3" attorney="R. Vance" />
    <DocumentRowV4 title="Complaint.pdf" kind="pleading" status="filed" version="v3" size="1.2 MB" onDownload={() => {}} onPress={() => {}} />
    <EvidenceRowV4 exhibit="Exhibit A-12" title="Security footage" kind="video" status="admitted" custodyVerified />
    <BillableTimeRowV4 date="Aug 24" description="Draft motion to dismiss" hours={1.5} rateCents={40000} status="unbilled" actionable onLog={() => {}} />
    <ContractClauseV4 number="§ 7.2" title="Limitation of liability" body="Neither party shall…" status="flagged" risk="high" expanded onToggle={() => {}} />
    <ClientIntakeRowV4 name="Pat Prospect" practiceArea="family" status="new" conflict="conflict" actionable onAccept={() => {}} onDecline={() => {}} />
    <LegalAppointmentV4 type="deposition" date="Mon, Aug 24" time="10:00 AM" status="scheduled" actionable onConfirm={() => {}} onCancel={() => {}} />
    <CourtDateCardV4 type="hearing" date="Sep 14, 2026" urgency="today" court="Dept 21" countdown="Today" />
    <RetainerBalanceV4 balanceCents={5000} initialCents={100000} lowThresholdCents={10000} label="Doe matter" onReplenish={() => {}} />
    <SignatureRequestV4 document="Engagement letter" signer="Jane Client" signerRole="Client" status="draft" onRequest={() => {}} />
    <DisclaimerBannerV4 tone="critical" variant="solid" message="This is not legal advice." onDismiss={() => {}} />
  </>
);

describe('legal V4 "chambers" line (native)', () => {
  it('mounts all 13 V4 together (SEED_LIGHT) with the gradient hero + statuses', () => {
    const { getByText, getAllByText } = renderThemed(AllLegalV4, SEED_LIGHT);
    expect(getByText('Acme v. Globex')).toBeTruthy();
    expect(getByText('Estate of Smith')).toBeTruthy();
    // Gradient hero chip + body caption both surface "Stage N of 6".
    expect(getAllByText(/Stage 3 of 6/).length).toBeGreaterThan(0);
    expect(getByText('$50.00')).toBeTruthy();
  });

  it('CaseCardV4 fires onOpen', () => {
    const onOpen = jest.fn();
    const { getByLabelText } = renderThemed(
      <CaseCardV4 caseNumber="2026-CV-9" title="Doe v. Roe" status="open" onOpen={onOpen} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Open case 2026-CV-9'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('BillableTimeRowV4 formats money from integer cents and logs time', () => {
    const onLog = jest.fn();
    const { getByText } = renderThemed(
      <BillableTimeRowV4 date="Aug 24" description="Draft motion" hours={1.5} rateCents={40000} status="unbilled" actionable onLog={onLog} />,
      SEED_LIGHT
    );
    expect(getByText('$600.00')).toBeTruthy();
    fireEvent.press(getByText('Log time'));
    expect(onLog).toHaveBeenCalledTimes(1);
  });

  it('RetainerBalanceV4 fires onReplenish when low', () => {
    const onReplenish = jest.fn();
    const { getByText } = renderThemed(
      <RetainerBalanceV4 balanceCents={5000} initialCents={100000} lowThresholdCents={10000} label="Doe matter" onReplenish={onReplenish} />,
      SEED_LIGHT
    );
    expect(getByText('Running low')).toBeTruthy();
    fireEvent.press(getByText('Replenish'));
    expect(onReplenish).toHaveBeenCalledTimes(1);
  });

  it('DisclaimerBannerV4 exposes an alert role', () => {
    const { getByLabelText } = renderThemed(<DisclaimerBannerV4 tone="warning" message="Not legal advice." />, SEED_DARK);
    expect(getByLabelText(/Not legal advice/)).toBeTruthy();
  });
});

describe('token purity — legal V4 "chambers" line (both seeds)', () => {
  it.each([SEED_LIGHT, SEED_DARK])('every rendered V4 style hex traces to a compiled token (%s)', (seed) => {
    const { root } = renderThemed(AllLegalV4, seed);
    const allowed = tokenHexSet(seed);
    const found = renderedStyleHexes(root);
    expect(found.length).toBeGreaterThan(0);
    found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
