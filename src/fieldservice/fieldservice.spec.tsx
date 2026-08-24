/** @jest-environment jsdom */
/**
 * Web field-service blocks: render smoke, token-purity (no hex literal in any
 * inline style), and the behavioral contracts — interactive-card click +
 * keyboard, checklist toggle, dispatch advance, signature capture, and the
 * empty state. Plain jsdom render (no provider needed — colors are token
 * classes), mirroring the primitives' spec style.
 */
import { fireEvent, render } from '@testing-library/react';
import { WorkOrderCard } from './WorkOrderCard';
import { InspectionRow } from './InspectionRow';
import { TechnicianCard } from './TechnicianCard';
import { ServiceChecklist } from './ServiceChecklist';
import { MaterialsRow } from './MaterialsRow';
import { TimeLogRow } from './TimeLogRow';
import { DispatchBar } from './DispatchBar';
import { SignaturePad } from './SignaturePad';
import { SafetyChecklist } from './SafetyChecklist';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

/** All inline `style` attributes joined — used for the token-purity assertion. */
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('fieldservice (web)', () => {
  it('WorkOrderCard renders content, a token-tinted disc, and fires onClick via click + keyboard', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <WorkOrderCard
        workOrderNumber="WO-10482"
        title="Replace HVAC compressor"
        status="in-progress"
        priority="high"
        site="Riverside Plaza"
        onClick={onClick}
      />
    );

    // Renders data + status pill (text, not color alone).
    expect(getByText('Replace HVAC compressor')).toBeTruthy();
    expect(getByText('WO-10482')).toBeTruthy();
    expect(getByText(/In progress/)).toBeTruthy();

    // Token class present; no hex literal leaked into inline styles.
    expect(container.innerHTML).toContain('bg-primary/10');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);

    // Interactive card = role="button" + keyboard.
    const card = getByRole('button', { name: /Work order WO-10482/ });
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('WorkOrderCard without onClick is a plain (non-button) card', () => {
    const { queryByRole } = render(
      <WorkOrderCard workOrderNumber="WO-1" title="Inspect" status="open" />
    );
    expect(queryByRole('button')).toBeNull();
  });

  it('InspectionRow conveys the result by glyph + label + token color', () => {
    const { getByText, container } = render(
      <InspectionRow label="Fire extinguisher charged" result="fail" code="NFPA 10" />
    );
    expect(getByText('Fire extinguisher charged')).toBeTruthy();
    // Result label rendered (badge text) → not color-alone.
    expect(getByText(/Fail/)).toBeTruthy();
    expect(container.innerHTML).toContain('bg-danger/10');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('TechnicianCard renders the roster with a labeled presence dot', () => {
    const { getByText, getByLabelText } = render(
      <TechnicianCard name="Marcus Reyes" role="HVAC Lead" status="available" skills={['EPA 608']} />
    );
    expect(getByText('Marcus Reyes')).toBeTruthy();
    expect(getByText('EPA 608')).toBeTruthy();
    // Presence is exposed as an image label, not color alone.
    expect(getByLabelText('Available')).toBeTruthy();
  });

  it('ServiceChecklist toggles a task and reports (id, nextDone)', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = render(
      <ServiceChecklist
        title="Startup procedure"
        tasks={[
          { id: 't1', label: 'Verify refrigerant charge', done: false },
          { id: 't2', label: 'Check condensate drain', done: true },
        ]}
        onToggle={onToggle}
      />
    );
    fireEvent.click(getByLabelText('Verify refrigerant charge'));
    expect(onToggle).toHaveBeenCalledWith('t1', true);
  });

  it('ServiceChecklist renders the EmptyState when there are no tasks', () => {
    const { getByText, container } = render(
      <ServiceChecklist tasks={[]} emptyLabel="No checklist items" />
    );
    expect(getByText('No checklist items')).toBeTruthy();
    expect(container.querySelector('[data-xen-empty-state]')).toBeTruthy();
  });

  it('MaterialsRow computes the extended total in integer cents', () => {
    const { getByText, container } = render(
      <MaterialsRow name="3/4in copper elbow" quantity={3} unitCents={250} stock="low" />
    );
    // 3 × $2.50 = $7.50
    expect(getByText('$7.50')).toBeTruthy();
    expect(getByText(/Low/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('TimeLogRow shows the duration and the computed billable total', () => {
    const { getByText } = render(
      <TimeLogRow label="On-site diagnostics" minutes={135} status="approved" billable rateCentsPerHour={12000} />
    );
    expect(getByText('2h 15m')).toBeTruthy();
    // 135min / 60 * $120.00 = $270.00
    expect(getByText('$270.00')).toBeTruthy();
  });

  it('DispatchBar advances the workflow to the next stage', () => {
    const onAdvance = jest.fn();
    const { getByRole } = render(<DispatchBar stage="unassigned" onAdvance={onAdvance} />);
    fireEvent.click(getByRole('button', { name: 'Accept' }));
    expect(onAdvance).toHaveBeenCalledWith('accepted');
  });

  it('DispatchBar disables the advance action while loading and shows none when complete', () => {
    const { getByRole, queryByRole, rerender } = render(
      <DispatchBar stage="on-site" onAdvance={jest.fn()} loading />
    );
    expect((getByRole('button', { name: 'Complete' }) as HTMLButtonElement).disabled).toBe(true);
    rerender(<DispatchBar stage="complete" onAdvance={jest.fn()} />);
    expect(queryByRole('button')).toBeNull();
  });

  it('SignaturePad captures a signature and clears it', () => {
    const onSign = jest.fn();
    const { getByRole, rerender } = render(<SignaturePad label="Customer signature" onSign={onSign} />);
    fireEvent.click(getByRole('button', { name: /click to sign/i }));
    expect(onSign).toHaveBeenCalledTimes(1);

    const onClear = jest.fn();
    rerender(
      <SignaturePad label="Customer signature" signed signerName="Dana Lee" signedAt="2:14 PM" onClear={onClear} />
    );
    expect(getByRole('button', { name: 'Clear' })).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Clear' }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('SafetyChecklist cycles a verdict, flags hazards, and handles the empty state', () => {
    const onToggle = jest.fn();
    const { getByRole, getByText, container } = render(
      <SafetyChecklist
        title="Pre-task safety"
        items={[
          { id: 's1', label: 'Fall protection anchored', verdict: 'pass' },
          { id: 's2', label: 'Guardrails secured', verdict: 'fail', hazard: true },
        ]}
        onToggle={onToggle}
      />
    );
    // Hazard banner raised.
    expect(getByText('Hazard — do not proceed')).toBeTruthy();
    // Clicking a pass row cycles pass → fail.
    fireEvent.click(getByRole('button', { name: /Fall protection anchored, Pass/ }));
    expect(onToggle).toHaveBeenCalledWith('s1', 'fail');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);

    const empty = render(<SafetyChecklist items={[]} emptyLabel="No safety items" />);
    expect(empty.getByText('No safety items')).toBeTruthy();
    expect(empty.container.querySelector('[data-xen-empty-state]')).toBeTruthy();
  });
});
