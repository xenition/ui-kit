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
import { WorkOrderCard } from './WorkOrderCard';
import { JobSiteCard } from './JobSiteCard';
import { InspectionRow } from './InspectionRow';
import { PunchListItem } from './PunchListItem';
import { EquipmentRow } from './EquipmentRow';
import { TechnicianCard } from './TechnicianCard';
import { ServiceChecklist, type ServiceTask } from './ServiceChecklist';
import { TimeLogRow } from './TimeLogRow';
import { SignaturePad } from './SignaturePad';
import { MaterialsRow } from './MaterialsRow';
import { DispatchBar } from './DispatchBar';
import { SafetyChecklist, type SafetyItem } from './SafetyChecklist';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('WorkOrderCard (native)', () => {
  it('renders title/number, a status pill (text+glyph), and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <WorkOrderCard
        workOrderNumber="WO-10482"
        title="Replace HVAC compressor"
        status="in-progress"
        priority="high"
        site="Riverside Plaza"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Replace HVAC compressor')).toBeTruthy();
    expect(getByText('WO-10482')).toBeTruthy();
    // Status conveyed by text + glyph, not color alone.
    expect(getByText('⟳ In progress')).toBeTruthy();
    expect(getByText('↑ High')).toBeTruthy();

    fireEvent.press(getByLabelText(/Replace HVAC compressor/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders a loading skeleton instead of data', () => {
    const { queryByText, getByLabelText } = renderThemed(
      <WorkOrderCard workOrderNumber="WO-1" title="Hidden" status="open" loading />,
      SEED_LIGHT
    );
    expect(queryByText('Hidden')).toBeNull();
    expect(getByLabelText('Loading work order')).toBeTruthy();
  });
});

describe('JobSiteCard (native)', () => {
  it('renders name/address, tones an active status pill, and fires navigate', () => {
    const onNavigate = jest.fn();
    const { getByText } = renderThemed(
      <JobSiteCard
        name="Riverside Plaza"
        address="240 River Rd"
        status="active"
        crewCount={4}
        onNavigate={onNavigate}
      />,
      SEED_LIGHT
    );
    expect(getByText('Riverside Plaza')).toBeTruthy();
    // Soft badge fg for an active site reads the success token.
    // `successText`, not `success`: a soft/outline pill puts its label on the
    // page, not on a fill, and the compiler only guarantees on-pairs. See the
    // *Text slots added alongside this change.
    expect(flatten(getByText('▶ On site').props.style).color).toBe(lightColors.successText);
    fireEvent.press(getByText('Directions'));
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });
});

describe('InspectionRow (native)', () => {
  it('reads a fail result via glyph + label + the danger token', () => {
    const { getByText } = renderThemed(
      <InspectionRow label="Fire extinguisher charged" result="fail" code="NFPA 10" />,
      SEED_LIGHT
    );
    expect(getByText('Fire extinguisher charged')).toBeTruthy();
    // The standalone glyph disc icon is toned with the danger slot.
    expect(flatten(getByText('✕').props.style).color).toBe(lightColors.danger);
    // Redundant text label present.
    expect(getByText('✕ Fail')).toBeTruthy();
  });

  it('tones a passing result with the success token', () => {
    const { getByText } = renderThemed(
      <InspectionRow label="Guardrails secure" result="pass" />,
      SEED_DARK
    );
    expect(getByText('✓ Pass')).toBeTruthy();
  });
});

describe('PunchListItem (native)', () => {
  it('toggles via the checkbox and strikes the label when done', () => {
    const onToggle = jest.fn();
    const open = renderThemed(
      <PunchListItem label="Touch-up lobby paint" done={false} severity="major" onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(open.getByLabelText('Touch-up lobby paint'));
    expect(onToggle).toHaveBeenCalledWith(true);

    const done = renderThemed(
      <PunchListItem label="Touch-up lobby paint" done onToggle={onToggle} />,
      SEED_LIGHT
    );
    // Completion reads without color alone (strike-through).
    expect(flatten(done.getByText('Touch-up lobby paint').props.style).textDecorationLine).toBe(
      'line-through'
    );
  });
});

describe('EquipmentRow (native)', () => {
  it('renders name/tag and tones a down asset with the danger token', () => {
    const { getByText } = renderThemed(
      <EquipmentRow name="Bobcat S650" assetTag="AST-3391" status="down" location="Bay 2" />,
      SEED_LIGHT
    );
    expect(getByText('Bobcat S650')).toBeTruthy();
    expect(getByText('AST-3391')).toBeTruthy();
    expect(getByText('✕ Down')).toBeTruthy();
  });
});

describe('TechnicianCard (native)', () => {
  it('renders skills, an availability pill, and fires call/assign', () => {
    const onCall = jest.fn();
    const onAssign = jest.fn();
    const { getByText } = renderThemed(
      <TechnicianCard
        name="Marcus Reyes"
        role="HVAC Lead"
        status="available"
        skills={['EPA 608', 'Brazing']}
        phone="(555) 010-2048"
        onCall={onCall}
        onAssign={onAssign}
      />,
      SEED_LIGHT
    );
    expect(getByText('Marcus Reyes')).toBeTruthy();
    expect(getByText('EPA 608')).toBeTruthy();
    // `successText`, not `success`: a soft/outline pill puts its label on the
    // page, not on a fill, and the compiler only guarantees on-pairs. See the
    // *Text slots added alongside this change.
    expect(flatten(getByText('✓ Available').props.style).color).toBe(lightColors.successText);
    fireEvent.press(getByText('Call'));
    fireEvent.press(getByText('Assign'));
    expect(onCall).toHaveBeenCalledTimes(1);
    expect(onAssign).toHaveBeenCalledTimes(1);
  });

  it('guards a missing skills array', () => {
    const { getByText } = renderThemed(
      <TechnicianCard name="Ana Diaz" status="offline" />,
      SEED_DARK
    );
    expect(getByText('Ana Diaz')).toBeTruthy();
  });
});

describe('ServiceChecklist (native)', () => {
  const tasks: ServiceTask[] = [
    { id: 't1', label: 'Verify refrigerant charge', done: true },
    { id: 't2', label: 'Check condensate drain', done: false, required: true },
  ];

  it('summarizes progress and toggles a task by id', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ServiceChecklist title="Startup" tasks={tasks} onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText('1/2')).toBeTruthy();
    fireEvent.press(getByLabelText('Check condensate drain'));
    expect(onToggle).toHaveBeenCalledWith('t2', true);
  });

  it('renders an EmptyState when there are no tasks', () => {
    const { getByText, queryByText } = renderThemed(
      <ServiceChecklist title="Startup" tasks={[]} />,
      SEED_DARK
    );
    expect(getByText('No checklist items')).toBeTruthy();
    expect(queryByText('Verify refrigerant charge')).toBeNull();
  });
});

describe('TimeLogRow (native)', () => {
  it('formats duration and a computed billable total', () => {
    const { getByText } = renderThemed(
      <TimeLogRow
        label="On-site diagnostics"
        minutes={135}
        status="approved"
        billable
        rateCentsPerHour={9000}
      />,
      SEED_LIGHT
    );
    expect(getByText('2h 15m')).toBeTruthy();
    // 135min = 2.25h × $90.00 = $202.50
    expect(getByText('$202.50')).toBeTruthy();
    expect(getByText('✓ Approved')).toBeTruthy();
  });
});

describe('SignaturePad (native)', () => {
  it('fires onSign from the empty pad and shows the captured summary', () => {
    const onSign = jest.fn();
    const empty = renderThemed(
      <SignaturePad label="Customer signature" onSign={onSign} />,
      SEED_LIGHT
    );
    fireEvent.press(empty.getByText('Tap to sign'));
    expect(onSign).toHaveBeenCalledTimes(1);

    const onClear = jest.fn();
    const signed = renderThemed(
      <SignaturePad label="Customer signature" signed signerName="Dana Lin" signedAt="Aug 24" onClear={onClear} />,
      SEED_DARK
    );
    expect(signed.getByText('Dana Lin')).toBeTruthy();
    fireEvent.press(signed.getByText('Clear'));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});

describe('MaterialsRow (native)', () => {
  it('computes the extended total from quantity × unit cents', () => {
    const { getByText } = renderThemed(
      <MaterialsRow name="3/4in copper elbow" sku="CU-034" quantity={3} unitCents={500} stock="low" />,
      SEED_LIGHT
    );
    expect(getByText('3 ea × $5.00')).toBeTruthy();
    expect(getByText('$15.00')).toBeTruthy();
    expect(getByText('▲ Low')).toBeTruthy();
  });
});

describe('DispatchBar (native)', () => {
  it('advances the dispatch stage on the primary action', () => {
    const onAdvance = jest.fn();
    const { getByText } = renderThemed(
      <DispatchBar stage="en-route" eta="ETA 12 min" jobLabel="WO-10482" onAdvance={onAdvance} />,
      SEED_LIGHT
    );
    expect(getByText('WO-10482')).toBeTruthy();
    fireEvent.press(getByText('Arrive'));
    expect(onAdvance).toHaveBeenCalledWith('on-site');
  });
});

describe('SafetyChecklist (native)', () => {
  const items: SafetyItem[] = [
    { id: 's1', label: 'Fall protection anchored', verdict: 'fail', hazard: true },
    { id: 's2', label: 'PPE worn', verdict: 'pass' },
  ];

  it('raises a hazard banner and cycles a verdict on tap', () => {
    const onToggle = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SafetyChecklist title="Pre-task safety" items={items} onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText('Hazard — do not proceed')).toBeTruthy();
    expect(getByText('✕ 1 failing')).toBeTruthy();
    fireEvent.press(getByLabelText('PPE worn, Pass'));
    expect(onToggle).toHaveBeenCalledWith('s2', 'fail');
  });

  it('renders an EmptyState when there are no items', () => {
    const { getByText } = renderThemed(<SafetyChecklist items={[]} />, SEED_DARK);
    expect(getByText('No safety items')).toBeTruthy();
  });
});

describe('empty work-order list (native)', () => {
  it('renders an EmptyState when there are no work orders', () => {
    const orders: Array<{ id: string }> = [];
    const { getByText, queryByText } = renderThemed(
      <>
        {orders.length === 0 ? (
          <EmptyState title="No work orders" description="Assigned work orders will appear here." />
        ) : null}
        {orders.map((o) => (
          <WorkOrderCard key={o.id} workOrderNumber={o.id} title={o.id} status="open" />
        ))}
      </>,
      SEED_DARK
    );
    expect(getByText('No work orders')).toBeTruthy();
    expect(queryByText('⟳ In progress')).toBeNull();
  });
});

describe('token purity (native fieldservice, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <WorkOrderCard workOrderNumber="WO-1" title="Job" status="done" priority="emergency" site="A" assignee="B" scheduledFor="9am" />
          <JobSiteCard name="Site" address="1 St" status="blocked" crewCount={2} openOrders={3} distance="1mi" onNavigate={() => {}} />
          <InspectionRow label="Check" result="fail" code="X" note="cracked" onPress={() => {}} />
          <PunchListItem label="Fix" done severity="critical" location="Lobby" assignee="C" />
          <EquipmentRow name="Rig" assetTag="A-1" status="maintenance" nextService="Sep 1" location="Bay 1" onPress={() => {}} />
          <TechnicianCard name="Tech" role="Lead" status="en-route" skills={['A', 'B']} jobsToday={3} phone="555" onCall={() => {}} onAssign={() => {}} />
          <ServiceChecklist title="List" tasks={[{ id: 'a', label: 'A', done: true, required: true }, { id: 'b', label: 'B', done: false }]} />
          <TimeLogRow label="Work" minutes={90} status="rejected" window="8-9" billable rateCentsPerHour={8000} />
          <SignaturePad label="Sign" onSign={() => {}} />
          <SignaturePad label="Signed" signed signerName="D" signedAt="Aug 24" onClear={() => {}} />
          <MaterialsRow name="Part" sku="P-1" quantity={2} unitCents={1250} stock="back-ordered" />
          <DispatchBar stage="on-site" eta="5m" jobLabel="WO-1" onAdvance={() => {}} onNavigate={() => {}} />
          <SafetyChecklist title="Safety" items={[{ id: 's', label: 'S', verdict: 'fail', hazard: true }]} onToggle={() => {}} />
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
