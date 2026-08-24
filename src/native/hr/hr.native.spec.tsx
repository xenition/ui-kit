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
import { EmployeeCard } from './EmployeeCard';
import { DirectoryRow } from './DirectoryRow';
import { LeaveRequest } from './LeaveRequest';
import { PayslipRow } from './PayslipRow';
import { TimesheetRow } from './TimesheetRow';
import { PerformanceReview } from './PerformanceReview';
import { OnboardingTask } from './OnboardingTask';
import { BenefitsEnrollment } from './BenefitsEnrollment';
import { ShiftSchedule, type Shift } from './ShiftSchedule';
import { ExpenseClaim } from './ExpenseClaim';
import { PolicyAcknowledge } from './PolicyAcknowledge';
import { OrgChartNode } from './OrgChartNode';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('EmployeeCard (native)', () => {
  it('mounts with name + status word and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <EmployeeCard
        name="Ada Rae"
        title="Staff Engineer"
        department="Platform"
        employmentType="fullTime"
        status="active"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Ada Rae')).toBeTruthy();
    // Status carried by word, not color alone.
    expect(getByText('Active')).toBeTruthy();
    fireEvent.press(getByLabelText('Employee Ada Rae'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders a loading skeleton without crashing', () => {
    const { getByLabelText } = renderThemed(<EmployeeCard name="X" loading />, SEED_LIGHT);
    expect(getByLabelText('Loading employee')).toBeTruthy();
  });

  it('fires a quick contact action', () => {
    const onCall = jest.fn();
    const { getByLabelText } = renderThemed(
      <EmployeeCard name="Ada" actions={[{ key: 'call', glyph: '📞', label: 'Call', onPress: onCall }]} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Call'));
    expect(onCall).toHaveBeenCalledTimes(1);
  });
});

describe('LeaveRequest (native)', () => {
  it('tones the approve/deny queue and fires approve when pending + actionable', () => {
    const onApprove = jest.fn();
    const { getByText } = renderThemed(
      <LeaveRequest
        type="vacation"
        startDate="Sep 1"
        endDate="Sep 5"
        days={5}
        status="pending"
        employeeName="Sam Lee"
        actionable
        onApprove={onApprove}
      />,
      SEED_LIGHT
    );
    // Status word present (pending), not color alone.
    expect(getByText('Pending')).toBeTruthy();
    fireEvent.press(getByText('Approve'));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it('shows the approver once decided and hides actions', () => {
    const { getByText, queryByText } = renderThemed(
      <LeaveRequest type="sick" startDate="Aug 3" days={1} status="approved" approver="Dana" actionable />,
      SEED_LIGHT
    );
    expect(getByText('Approved by Dana')).toBeTruthy();
    expect(queryByText('Approve')).toBeNull();
  });
});

describe('PayslipRow (native)', () => {
  it('formats integer cents to a stable 2-decimal string as an onSurface token', () => {
    const { getByText } = renderThemed(
      <PayslipRow period="Aug 1–15" netCents={412350} grossCents={520000} status="paid" />,
      SEED_LIGHT
    );
    const net = getByText('$4,123.50');
    expect(net).toBeTruthy();
    expect(flatten(net.props.style).color).toBe(lightColors.onSurface);
    expect(getByText('$5,200.00')).toBeTruthy();
  });
});

describe('TimesheetRow (native)', () => {
  it('renders formatted hours + overtime and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TimesheetRow date="Mon Aug 24" hours={7.5} overtimeHours={1.25} status="submitted" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('7h 30m')).toBeTruthy();
    expect(getByText('+1h 15m OT')).toBeTruthy();
    fireEvent.press(getByLabelText('Timesheet Mon Aug 24, 7h 30m'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('OnboardingTask (native)', () => {
  it('toggles completion via the checkbox (interaction)', () => {
    const onToggle = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <OnboardingTask title="Sign contract" category="Paperwork" status="todo" overdue onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Mark complete: Sign contract'));
    expect(onToggle).toHaveBeenCalledWith(true);
    // Overdue conveyed by word.
    expect(getByText('⚠ Overdue')).toBeTruthy();
  });
});

describe('ExpenseClaim (native)', () => {
  it('formats cents, flags a missing receipt by word, and fires reject', () => {
    const onReject = jest.fn();
    const { getByText } = renderThemed(
      <ExpenseClaim
        merchant="Delta Air"
        category="travel"
        amountCents={29900}
        status="submitted"
        hasReceipt={false}
        actionable
        onReject={onReject}
      />,
      SEED_LIGHT
    );
    expect(getByText('$299.00')).toBeTruthy();
    expect(getByText('⚠ No receipt')).toBeTruthy();
    fireEvent.press(getByText('Reject'));
    expect(onReject).toHaveBeenCalledTimes(1);
  });
});

describe('PolicyAcknowledge (native)', () => {
  it('keeps acknowledge disabled until consent, then fires', () => {
    const onAcknowledge = jest.fn();
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PolicyAcknowledge
        title="Code of Conduct"
        version="v3.1"
        consentLabel="I agree"
        onToggle={onToggle}
        onAcknowledge={onAcknowledge}
      />,
      SEED_LIGHT
    );
    // Disabled before consent — press is a no-op.
    fireEvent.press(getByText('Acknowledge'));
    expect(onAcknowledge).not.toHaveBeenCalled();
    // Consent, then acknowledge.
    fireEvent.press(getByLabelText('I agree'));
    expect(onToggle).toHaveBeenCalledWith(true);
    fireEvent.press(getByText('Acknowledge'));
    expect(onAcknowledge).toHaveBeenCalledTimes(1);
  });
});

describe('ShiftSchedule (native)', () => {
  const shifts: Shift[] = [
    { id: 's1', start: '09:00', end: '17:00', role: 'Barista', assignee: 'Lee', status: 'confirmed' },
    { id: 's2', start: '17:00', end: '22:00', role: 'Barista', status: 'open' },
  ];

  it('renders an empty placeholder when there are no shifts', () => {
    const { getByLabelText } = renderThemed(
      <ShiftSchedule shifts={[]} dateLabel="Mon Aug 24" emptyLabel="No shifts scheduled" />,
      SEED_LIGHT
    );
    expect(getByLabelText('No shifts scheduled')).toBeTruthy();
  });

  it('selects an open shift (interaction)', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <ShiftSchedule shifts={shifts} onSelectShift={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Shift 17:00 to 22:00, Open'));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 's2' }));
  });
});

describe('smoke: remaining blocks mount', () => {
  it('DirectoryRow, PerformanceReview, BenefitsEnrollment, OrgChartNode', () => {
    const dir = renderThemed(
      <DirectoryRow name="Kim Park" title="Recruiter" department="People" presence="online" onPress={jest.fn()} />,
      SEED_LIGHT
    );
    expect(dir.getByText('Kim Park')).toBeTruthy();

    const review = renderThemed(
      <PerformanceReview cycle="H1 2026" reviewer="Dana" rating={4} status="completed" goalCompletion={80} goalCount={5} />,
      SEED_LIGHT
    );
    expect(review.getByLabelText('Rating 4 of 5')).toBeTruthy();

    const benefit = renderThemed(
      <BenefitsEnrollment planName="PPO Gold" type="health" status="eligible" costCents={12000} actionable onEnroll={jest.fn()} />,
      SEED_LIGHT
    );
    expect(benefit.getByText('$120.00')).toBeTruthy();
    expect(benefit.getByText('Enroll')).toBeTruthy();

    const node = renderThemed(
      <OrgChartNode name="Jo Vance" title="VP Eng" directReports={6} depth={1} expandable onToggle={jest.fn()} />,
      SEED_LIGHT
    );
    expect(node.getByText('6 reports')).toBeTruthy();
  });

  it('OrgChartNode expand toggle fires', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <OrgChartNode name="Jo Vance" title="VP" directReports={2} expandable expanded={false} onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Expand Jo Vance'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('token purity (native hr, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <EmployeeCard
            name="Ada Rae"
            title="Staff Engineer"
            department="Platform"
            employmentType="fullTime"
            status="active"
            actions={[{ key: 'call', glyph: '📞', label: 'Call', onPress: jest.fn() }]}
          />
          <OrgChartNode name="Jo" title="VP" directReports={4} depth={2} variant="highlighted" expandable onToggle={jest.fn()} />
          <DirectoryRow name="Kim" title="Recruiter" presence="busy" onMessage={jest.fn()} />
          <LeaveRequest type="vacation" startDate="Sep 1" endDate="Sep 5" days={5} status="pending" employeeName="Sam" actionable onApprove={jest.fn()} onDeny={jest.fn()} />
          <PayslipRow period="Aug 1–15" netCents={412350} grossCents={520000} deductionsCents={107650} status="paid" payDate="Aug 16" />
          <TimesheetRow date="Mon" hours={9.5} overtimeHours={1.5} status="rejected" clockIn="09:00" clockOut="18:30" project="Apollo" />
          <PerformanceReview cycle="H1 2026" reviewer="Dana" rating={4} status="inProgress" goalCompletion={65} goalCount={4} dueDate="Sep 30" />
          <OnboardingTask title="Sign contract" category="Paperwork" dueDate="Aug 30" status="blocked" overdue assignee="Lee" />
          <BenefitsEnrollment planName="PPO Gold" type="health" status="enrolled" coverage="Employee + Family" costCents={12000} enrollBy="Nov 1" />
          <ShiftSchedule
            dateLabel="Mon Aug 24"
            shifts={[
              { id: 's1', start: '09:00', end: '17:00', role: 'Barista', location: 'Front', assignee: 'Lee', status: 'confirmed' },
              { id: 's2', start: '17:00', end: '22:00', role: 'Barista', status: 'open' },
            ]}
            onSelectShift={jest.fn()}
          />
          <ExpenseClaim merchant="Delta" category="travel" amountCents={29900} date="Aug 2" status="submitted" description="Flight" hasReceipt={false} actionable onApprove={jest.fn()} onReject={jest.fn()} />
          <PolicyAcknowledge title="Code of Conduct" version="v3.1" effectiveDate="Jan 1" summary="Be excellent." status="overdue" />
          <PolicyAcknowledge title="Handbook" acknowledged acknowledgedDate="Aug 1" />
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
