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
