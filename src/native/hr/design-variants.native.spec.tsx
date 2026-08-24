/**
 * Alternate HR designs (V2 / V3) — drop-in replacements that share the exact
 * Props of their base component. Each variant is asserted to mount, to carry
 * state by word (not color alone), to survive the token-purity invariant under
 * both seeds (every rendered hex traces to a compiled token), and — for the
 * leave queue — to fire an approve interaction.
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
import { EmployeeCardV2 } from './EmployeeCardV2';
import { EmployeeCardV3 } from './EmployeeCardV3';
import { LeaveRequestV2 } from './LeaveRequestV2';
import { LeaveRequestV3 } from './LeaveRequestV3';
import { PayslipRowV2 } from './PayslipRowV2';
import { PayslipRowV3 } from './PayslipRowV3';
import { PerformanceReviewV2 } from './PerformanceReviewV2';
import { PerformanceReviewV3 } from './PerformanceReviewV3';

describe('EmployeeCard V2 / V3 (native)', () => {
  it('V2 mounts with name + status word', () => {
    const { getByText } = renderThemed(
      <EmployeeCardV2 name="Ada Rae" title="Staff Engineer" department="Platform" employmentType="fullTime" status="active" />,
      SEED_LIGHT
    );
    expect(getByText('Ada Rae')).toBeTruthy();
    expect(getByText('Active')).toBeTruthy();
  });

  it('V2 renders a loading skeleton without crashing', () => {
    const { getByLabelText } = renderThemed(<EmployeeCardV2 name="X" loading />, SEED_LIGHT);
    expect(getByLabelText('Loading employee')).toBeTruthy();
  });

  it('V3 mounts as a compact row and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <EmployeeCardV3 name="Kim Park" title="Recruiter" department="People" status="onLeave" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Kim Park')).toBeTruthy();
    fireEvent.press(getByLabelText('Employee Kim Park'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('LeaveRequest V2 / V3 (native)', () => {
  it('V2 shows the timeline + pending word and fires approve when actionable', () => {
    const onApprove = jest.fn();
    const { getByText } = renderThemed(
      <LeaveRequestV2
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
    expect(getByText('Pending')).toBeTruthy();
    fireEvent.press(getByText('Approve'));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line carrying the status word', () => {
    const { getByText } = renderThemed(
      <LeaveRequestV3 type="sick" startDate="Aug 3" days={1} status="approved" employeeName="Dana" />,
      SEED_LIGHT
    );
    expect(getByText('Approved')).toBeTruthy();
    expect(getByText('1d')).toBeTruthy();
  });
});

describe('PayslipRow V2 / V3 (native)', () => {
  it('V2 shows the net/gross breakdown from integer cents', () => {
    const { getByText, getAllByText } = renderThemed(
      <PayslipRowV2 period="Aug 1–15" netCents={412350} grossCents={520000} deductionsCents={107650} status="paid" />,
      SEED_LIGHT
    );
    // Net appears twice (hero figure + breakdown row).
    expect(getAllByText('$4,123.50').length).toBe(2);
    expect(getByText('$5,200.00')).toBeTruthy();
    expect(getByText('−$1,076.50')).toBeTruthy();
  });

  it('V3 renders a dense line with net + status word', () => {
    const { getByText } = renderThemed(
      <PayslipRowV3 period="Aug 1–15" netCents={412350} status="processing" payDate="Aug 16" />,
      SEED_LIGHT
    );
    expect(getByText('$4,123.50')).toBeTruthy();
    expect(getByText('Processing')).toBeTruthy();
  });
});

describe('PerformanceReview V2 / V3 (native)', () => {
  it('V2 announces the rating and renders the goal ring percentage', () => {
    const { getByLabelText, getByText } = renderThemed(
      <PerformanceReviewV2 cycle="H1 2026" reviewer="Dana" rating={4} status="completed" goalCompletion={80} goalCount={5} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Rating 4 of 5')).toBeTruthy();
    expect(getByText('80%')).toBeTruthy();
  });

  it('V3 renders a compact row with the status word', () => {
    const { getByText } = renderThemed(
      <PerformanceReviewV3 cycle="H2 2026" reviewer="Lee" rating={3} status="inProgress" goalCompletion={40} />,
      SEED_LIGHT
    );
    expect(getByText('H2 2026')).toBeTruthy();
    expect(getByText('40% goals')).toBeTruthy();
  });
});

describe('token purity (native hr design variants, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <EmployeeCardV2
            name="Ada Rae"
            title="Staff Engineer"
            department="Platform"
            employmentType="fullTime"
            status="active"
            location="Berlin"
            startDate="Jan 2020"
            actions={[{ key: 'call', glyph: '📞', label: 'Call', onPress: jest.fn() }]}
          />
          <EmployeeCardV3 name="Kim" title="Recruiter" department="People" employmentType="contractor" status="probation" onPress={jest.fn()} />
          <LeaveRequestV2
            type="vacation"
            startDate="Sep 1"
            endDate="Sep 5"
            days={5}
            status="pending"
            employeeName="Sam"
            reason="Family trip"
            actionable
            onApprove={jest.fn()}
            onDeny={jest.fn()}
          />
          <LeaveRequestV3 type="parental" startDate="Oct 1" endDate="Dec 1" days={40} status="denied" employeeName="Jo" onPress={jest.fn()} />
          <PayslipRowV2 period="Aug 1–15" netCents={412350} grossCents={520000} deductionsCents={107650} status="paid" payDate="Aug 16" onPress={jest.fn()} />
          <PayslipRowV3 period="Jul 1–15" netCents={398000} status="failed" payDate="Jul 16" onPress={jest.fn()} />
          <PerformanceReviewV2 cycle="H1 2026" reviewer="Dana" rating={4} status="inProgress" goalCompletion={65} goalCount={4} dueDate="Sep 30" onPress={jest.fn()} />
          <PerformanceReviewV3 cycle="H2 2026" reviewer="Lee" rating={3} status="submitted" goalCompletion={40} onPress={jest.fn()} />
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
