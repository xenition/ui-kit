import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, SEED_DARK, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { WorkOrderCardV2 } from './WorkOrderCardV2';
import { WorkOrderCardV3 } from './WorkOrderCardV3';
import { JobSiteCardV2 } from './JobSiteCardV2';
import { JobSiteCardV3 } from './JobSiteCardV3';
import { InspectionRowV2 } from './InspectionRowV2';
import { InspectionRowV3 } from './InspectionRowV3';
import { TechnicianCardV2 } from './TechnicianCardV2';
import { TechnicianCardV3 } from './TechnicianCardV3';

describe('WorkOrderCard alternates (native)', () => {
  it('V2 renders title/number, a status pill, and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <WorkOrderCardV2 workOrderNumber="WO-10482" title="Replace HVAC compressor" status="in-progress" priority="high" site="Riverside Plaza" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Replace HVAC compressor')).toBeTruthy();
    expect(getByText('WO-10482')).toBeTruthy();
    expect(getByText('⟳ In progress')).toBeTruthy();
    expect(getByText('↑ High')).toBeTruthy();
    fireEvent.press(getByLabelText(/Work order WO-10482/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <WorkOrderCardV3 workOrderNumber="WO-9001" title="Swap breaker panel" status="done" priority="low" onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('Swap breaker panel')).toBeTruthy();
    expect(getByText('✓ Done')).toBeTruthy();
    fireEvent.press(getByLabelText(/Work order WO-9001/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('JobSiteCard alternates (native)', () => {
  it('V2 renders the banner + stat tiles and fires navigate', () => {
    const onNavigate = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <JobSiteCardV2 name="Riverside Plaza" address="240 River Rd" status="active" crewCount={4} openOrders={3} distance="3.2 mi" onNavigate={onNavigate} />,
      SEED_LIGHT
    );
    expect(getByText('Riverside Plaza')).toBeTruthy();
    expect(getByText('▶ On site')).toBeTruthy();
    fireEvent.press(getByLabelText('Directions to Riverside Plaza'));
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row and fires navigate', () => {
    const onNavigate = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <JobSiteCardV3 name="Depot 7" address="1 Yard St" status="blocked" distance="0.5 mi" onNavigate={onNavigate} />,
      SEED_DARK
    );
    expect(getByText('Depot 7')).toBeTruthy();
    expect(getByText('⚠ Blocked')).toBeTruthy();
    fireEvent.press(getByLabelText('Directions to Depot 7'));
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });
});

describe('InspectionRow alternates (native)', () => {
  it('V2 renders a fail marker card and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <InspectionRowV2 label="Fire extinguisher charged" result="fail" code="NFPA 10" note="gauge low" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Fire extinguisher charged')).toBeTruthy();
    expect(getByText('✕ Fail')).toBeTruthy();
    fireEvent.press(getByLabelText('Fire extinguisher charged, Fail'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line with a pass result', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <InspectionRowV3 label="Guardrails secure" result="pass" onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('Guardrails secure')).toBeTruthy();
    expect(getByText('✓ Pass')).toBeTruthy();
    fireEvent.press(getByLabelText('Guardrails secure, Pass'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('TechnicianCard alternates (native)', () => {
  it('V2 renders a profile card and fires call/assign', () => {
    const onCall = jest.fn();
    const onAssign = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TechnicianCardV2 name="Marcus Reyes" role="HVAC Lead" status="available" skills={['EPA 608', 'Brazing']} jobsToday={3} phone="(555) 010-2048" onCall={onCall} onAssign={onAssign} />,
      SEED_LIGHT
    );
    expect(getByText('Marcus Reyes')).toBeTruthy();
    expect(getByText('EPA 608')).toBeTruthy();
    expect(getByText('✓ Available')).toBeTruthy();
    fireEvent.press(getByLabelText('Call Marcus Reyes'));
    fireEvent.press(getByLabelText('Assign Marcus Reyes'));
    expect(onCall).toHaveBeenCalledTimes(1);
    expect(onAssign).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row, guards missing skills, and fires assign', () => {
    const onAssign = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TechnicianCardV3 name="Ana Diaz" role="Apprentice" status="en-route" onAssign={onAssign} />,
      SEED_DARK
    );
    expect(getByText('Ana Diaz')).toBeTruthy();
    expect(getByText('→ En route')).toBeTruthy();
    fireEvent.press(getByLabelText('Assign Ana Diaz'));
    expect(onAssign).toHaveBeenCalledTimes(1);
  });
});

describe('token purity (native fieldservice alternates, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <WorkOrderCardV2 workOrderNumber="WO-1" title="Job" status="done" priority="emergency" site="A" assignee="B" scheduledFor="9am" onPress={() => {}} />
          <WorkOrderCardV2 workOrderNumber="WO-2" title="Loading" status="open" loading />
          <WorkOrderCardV3 workOrderNumber="WO-3" title="Line" status="on-hold" priority="medium" site="S" assignee="C" onPress={() => {}} />
          <WorkOrderCardV3 workOrderNumber="WO-4" title="Loading" status="open" loading />
          <JobSiteCardV2 name="Site" address="1 St" status="blocked" crewCount={2} openOrders={3} distance="1mi" onNavigate={() => {}} onPress={() => {}} />
          <JobSiteCardV2 name="Bare" address="2 St" status="scheduled" />
          <JobSiteCardV3 name="Site" address="1 St" status="active" crewCount={2} openOrders={3} distance="1mi" onNavigate={() => {}} onPress={() => {}} />
          <InspectionRowV2 label="Check" result="fail" code="X" note="cracked" onPress={() => {}} />
          <InspectionRowV2 label="Ok" result="pass" />
          <InspectionRowV3 label="Check" result="na" code="Y" note="skip" onPress={() => {}} />
          <InspectionRowV3 label="Pending" result="pending" />
          <TechnicianCardV2 name="Tech" role="Lead" status="en-route" skills={['A', 'B']} jobsToday={3} phone="555" onCall={() => {}} onAssign={() => {}} />
          <TechnicianCardV2 name="Bare" status="offline" />
          <TechnicianCardV3 name="Tech" role="Lead" status="on-job" jobsToday={2} phone="555" onCall={() => {}} onAssign={() => {}} />
          <TechnicianCardV3 name="Bare" status="available" />
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
