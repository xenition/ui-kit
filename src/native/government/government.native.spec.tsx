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
import { ServiceCard } from './ServiceCard';
import { PermitStatus } from './PermitStatus';
import { CivicAppointment } from './CivicAppointment';
import { FormStatusRow } from './FormStatusRow';
import { DocumentRequest } from './DocumentRequest';
import { PublicNoticeCard } from './PublicNoticeCard';
import { RepresentativeCard } from './RepresentativeCard';
import { VotingInfoCard } from './VotingInfoCard';
import { TaxSummaryCard } from './TaxSummaryCard';
import { BenefitCard } from './BenefitCard';
import { ComplaintRow } from './ComplaintRow';
import { CivicAlert } from './CivicAlert';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('ServiceCard (native)', () => {
  it('renders title/category and fires onStart from the action button', () => {
    const onStart = jest.fn();
    const { getByText } = renderThemed(
      <ServiceCard
        category="license"
        title="Renew driver license"
        description="Renew online in minutes."
        channel="online"
        estimatedTime="5 min"
        actionLabel="Start"
        onStart={onStart}
      />,
      SEED_LIGHT
    );
    expect(getByText('Renew driver license')).toBeTruthy();
    expect(getByText('Licensing')).toBeTruthy();
    // Availability conveyed by text + glyph, not color alone.
    expect(getByText('🌐 Online')).toBeTruthy();
    fireEvent.press(getByText('Start'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});

describe('PermitStatus (native)', () => {
  it('renders the happy-path stages via Steps', () => {
    const { getByText } = renderThemed(<PermitStatus status="issued" title="Building permit" />, SEED_LIGHT);
    expect(getByText('Submitted')).toBeTruthy();
    expect(getByText('Approved')).toBeTruthy();
    expect(getByText('Issued')).toBeTruthy();
  });

  it('branches a denied permit into a danger banner (glyph + text + color)', () => {
    const { getByText } = renderThemed(<PermitStatus status="denied" />, SEED_LIGHT);
    const heading = getByText('Permit denied');
    expect(heading).toBeTruthy();
    expect(flatten(heading.props.style).color).toBe(lightColors.danger);
  });

  it('renders a loading placeholder instead of the tracker', () => {
    const { queryByText, getByLabelText } = renderThemed(<PermitStatus status="review" loading />, SEED_LIGHT);
    expect(queryByText('Submitted')).toBeNull();
    expect(getByLabelText('Loading permit status')).toBeTruthy();
  });
});

describe('CivicAppointment (native)', () => {
  it('renders details and fires check-in / reschedule for upcoming visits', () => {
    const onCheckIn = jest.fn();
    const onReschedule = jest.fn();
    const { getByText } = renderThemed(
      <CivicAppointment
        service="License renewal"
        office="DMV — Downtown"
        date="Mon, Aug 24"
        time="10:30 AM"
        status="confirmed"
        onCheckIn={onCheckIn}
        onReschedule={onReschedule}
      />,
      SEED_LIGHT
    );
    expect(getByText('License renewal')).toBeTruthy();
    expect(getByText('✓ Confirmed')).toBeTruthy();
    fireEvent.press(getByText('Check in'));
    fireEvent.press(getByText('Reschedule'));
    expect(onCheckIn).toHaveBeenCalledTimes(1);
    expect(onReschedule).toHaveBeenCalledTimes(1);
  });

  it('hides actions for a terminal (completed) appointment', () => {
    const { queryByText } = renderThemed(
      <CivicAppointment
        service="Passport pickup"
        office="City Hall"
        date="Aug 1"
        time="9:00 AM"
        status="completed"
        onCheckIn={() => {}}
      />,
      SEED_DARK
    );
    expect(queryByText('Check in')).toBeNull();
  });
});

describe('FormStatusRow (native)', () => {
  it('tones a complete form with the success token and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <FormStatusRow
        formNumber="APP-77412"
        title="Homestead exemption"
        status="complete"
        agency="Assessor"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Homestead exemption')).toBeTruthy();
    // Badge soft fg reads the success accent slot.
    expect(flatten(getByText('✓ Complete').props.style).color).toBe(lightColors.success);
    fireEvent.press(getByLabelText(/Homestead exemption/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('DocumentRequest (native)', () => {
  it('shows a formatted fee and a download action only when ready', () => {
    const onDownload = jest.fn();
    const { getByText } = renderThemed(
      <DocumentRequest
        docType="birth-certificate"
        requestNumber="DOC-9931"
        status="ready"
        feeCents={2500}
        onDownload={onDownload}
      />,
      SEED_LIGHT
    );
    expect(getByText('Birth certificate')).toBeTruthy();
    expect(getByText('✓ Ready')).toBeTruthy();
    expect(getByText('Fee: $25.00')).toBeTruthy();
    fireEvent.press(getByText('Download'));
    expect(onDownload).toHaveBeenCalledTimes(1);
  });
});

describe('RepresentativeCard (native)', () => {
  it('renders contact details and fires call/email actions', () => {
    const onCall = jest.fn();
    const onEmail = jest.fn();
    const { getByText } = renderThemed(
      <RepresentativeCard
        name="Grace Hopper"
        office="City Council · District 4"
        party="independent"
        district="District 4"
        phone="(555) 010-2048"
        email="grace@city.gov"
        inOffice
        onCall={onCall}
        onEmail={onEmail}
      />,
      SEED_LIGHT
    );
    expect(getByText('Grace Hopper')).toBeTruthy();
    expect(getByText('Independent')).toBeTruthy();
    expect(getByText('✓ In office')).toBeTruthy();
    fireEvent.press(getByText('Call'));
    fireEvent.press(getByText('Email'));
    expect(onCall).toHaveBeenCalledTimes(1);
    expect(onEmail).toHaveBeenCalledTimes(1);
  });
});

describe('VotingInfoCard (native)', () => {
  it('conveys registration by text+glyph and adapts the register action', () => {
    const onRegister = jest.fn();
    const { getByText } = renderThemed(
      <VotingInfoCard
        registration="not-registered"
        electionName="General Election"
        electionDate="Nov 3"
        onRegister={onRegister}
      />,
      SEED_LIGHT
    );
    expect(getByText('! Not registered')).toBeTruthy();
    fireEvent.press(getByText('Register to vote'));
    expect(onRegister).toHaveBeenCalledTimes(1);
  });
});

describe('TaxSummaryCard (native)', () => {
  it('tones a refund with the success token and formats cents', () => {
    const { getByText } = renderThemed(
      <TaxSummaryCard taxYear="2025" taxType="Income tax" status="refund" amountCents={120000} />,
      SEED_LIGHT
    );
    const amount = getByText('$1,200.00');
    expect(flatten(amount.props.style).color).toBe(lightColors.success);
    expect(getByText('💵 Refund')).toBeTruthy();
  });

  it('offers "Pay now" only for owed / overdue balances', () => {
    const onPay = jest.fn();
    const { getByText } = renderThemed(
      <TaxSummaryCard taxYear="2025" status="overdue" amountCents={45000} onPay={onPay} />,
      SEED_DARK
    );
    fireEvent.press(getByText('Pay now'));
    expect(onPay).toHaveBeenCalledTimes(1);
  });
});

describe('BenefitCard (native)', () => {
  it('renders program, status, and a monthly amount', () => {
    const { getByText } = renderThemed(
      <BenefitCard name="SNAP" benefitType="food" status="active" amountCents={28500} caseNumber="C-1002" />,
      SEED_LIGHT
    );
    expect(getByText('SNAP')).toBeTruthy();
    expect(getByText('✓ Active')).toBeTruthy();
    expect(getByText('$285.00')).toBeTruthy();
  });
});

describe('ComplaintRow (native)', () => {
  it('reads status + urgent priority by glyph/label and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ComplaintRow
        ticketNumber="311-88214"
        title="Pothole on 5th Ave"
        status="in-progress"
        category="Roads"
        priority="urgent"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Pothole on 5th Ave')).toBeTruthy();
    expect(getByText('🔧 In progress')).toBeTruthy();
    expect(getByText('! Urgent')).toBeTruthy();
    fireEvent.press(getByLabelText(/Pothole on 5th Ave/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('CivicAlert (native)', () => {
  it('tones an emergency with the danger slot and fires action + dismiss', () => {
    const onAction = jest.fn();
    const onDismiss = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <CivicAlert
        severity="emergency"
        title="Flash flood warning"
        message="Seek higher ground immediately."
        source="County EMA"
        actionLabel="View details"
        onAction={onAction}
        onDismiss={onDismiss}
      />,
      SEED_LIGHT
    );
    // Severity label is text (never color alone) and toned by the danger slot.
    const label = getByText('Emergency');
    expect(flatten(label.props.style).color).toBe(lightColors.danger);
    expect(getByText('Flash flood warning')).toBeTruthy();
    fireEvent.press(getByText('View details'));
    fireEvent.press(getByLabelText('Dismiss alert'));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

describe('empty services (native)', () => {
  it('renders an EmptyState when there are no requests to show', () => {
    const complaints: Array<{ id: string }> = [];
    const { getByText, queryByText } = renderThemed(
      <>
        {complaints.length === 0 ? (
          <EmptyState title="No requests" description="Your service requests will appear here." />
        ) : null}
        {complaints.map((c) => (
          <ComplaintRow key={c.id} ticketNumber={c.id} title={c.id} status="open" />
        ))}
      </>,
      SEED_DARK
    );
    expect(getByText('No requests')).toBeTruthy();
    expect(queryByText('🆕 Open')).toBeNull();
  });
});

describe('token purity (native government, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ServiceCard category="permit" title="Apply for permit" channel="in-person" onStart={() => {}} />
          <PermitStatus status="denied" title="Permit" />
          <CivicAppointment service="Visit" office="DMV" date="Aug 1" time="9:00" status="scheduled" onCheckIn={() => {}} />
          <FormStatusRow formNumber="F-1" title="Form" status="action-needed" onPress={() => {}} />
          <DocumentRequest docType="court-record" status="denied" feeCents={0} />
          <PublicNoticeCard category="election" title="Notice" body="Body" isNew onPress={() => {}} />
          <RepresentativeCard name="Ada" office="Mayor" party="green" phone="555" email="a@b.gov" inOffice={false} onCall={() => {}} onEmail={() => {}} />
          <VotingInfoCard registration="registered" pollingPlace="Library" mailBallot onRegister={() => {}} onFindPolling={() => {}} />
          <TaxSummaryCard taxYear="2025" status="overdue" amountCents={45000} paidCents={1000} onPay={() => {}} />
          <BenefitCard name="SNAP" benefitType="food" status="expiring" amountCents={28500} onPress={() => {}} />
          <ComplaintRow ticketNumber="311-1" title="Issue" status="resolved" priority="high" onPress={() => {}} />
          <CivicAlert severity="warning" title="Alert" message="Msg" onAction={() => {}} onDismiss={() => {}} />
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
